import * as Environment from "~/common/environment";

import Cors from "cors";
import initMiddleware from "~/common/init-middleware";

import { runQuery } from "~/common/utilities";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const TABLE_NAME = "chain_visualizer_blocks_view";
const DECORATOR = `GET_${TABLE_NAME.toUpperCase()}`;

export default async function handler(req, res) {
  await cors(req, res);

  const response = await runQuery({
    label: DECORATOR,
    queryFn: async (DB) => {
      const query = await DB
        .min({ minHeight: 'height' })
        .max({ maxHeight: 'height' })
        .from(TABLE_NAME)

      if (!query || query.error) {
        return null;
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      console.log(e);
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
