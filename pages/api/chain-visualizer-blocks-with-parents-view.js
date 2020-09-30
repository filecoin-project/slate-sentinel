import * as Environment from "~/common/environment";

import Cors from "cors";
import initMiddleware from "~/common/init-middleware";

import { runQuery, processWhereClause, processSortBy } from "~/common/utilities";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const TABLE_NAME = "chain_visualizer_blocks_with_parents_view";
const DECORATOR = `GET_${TABLE_NAME.toUpperCase()}`;

export default async function handler(req, res) {
  await cors(req, res);

  const offset = req.query.offset || null;
  const limit = req.query.limit || null;
  let whereClauses = [];
  let sortClauses = [];

  try {
    if (req.query.where){
      whereClauses = JSON.parse(req.query.where);
    }
    if (req.query.sort){
      sortClauses = JSON.parse(req.query.sort);
    }
  } catch (e){
    console.log('malformed json clause')
  }

  const response = await runQuery({
    label: DECORATOR,
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from(TABLE_NAME)
        .where( function () {return processWhereClause(this, whereClauses)})
        .offset(offset)
        .limit(limit)
        .modify((qb) => {
          processSortBy( qb, sortClauses )
        })

      if (!query || query.error) {
        return null;
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        decorator: DECORATOR,
        error: e,
      };
    },
  });

  if (!response) {
    return res
      .status(500)
      .send({ decorator: `${DECORATOR}_FAILED`, error: true });
  }

  if (response.error) {
    return res
      .status(500)
      .send({ decorator: `${DECORATOR}_ERROR`, error: true });
  }

  res
    .status(200)
    .send(JSON.stringify({ decorator: DECORATOR, data: response }, null, 4));
}
