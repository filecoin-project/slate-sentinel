import * as Environment from "~/common/environment";

import Cors from "cors";
import initMiddleware from "~/common/init-middleware";

import { runQuery } from "~/common/utilities";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const DECORATOR = "STORAGE_UNIQUE_CIDS";
const QUERY = `
SELECT
  COUNT(DISTINCT piece_cid)
FROM
  "public".market_deal_proposals
WHERE
  client_id NOT IN( SELECT DISTINCT
      client_id FROM "public".market_deal_proposals
    WHERE
      client_id IN('t0112', 't0113', 't0114', 't010089')
    UNION
    SELECT DISTINCT
      owner_addr FROM "public".miner_info)
`.trim();

export default async function handler(req, res) {
  await cors(req, res);

  const response = await runQuery({
    label: DECORATOR,
    queryFn: async (DB) => {
      const query = await DB.raw(QUERY);

      if (!query || query.error) {
        return null;
      }

      if (!query.rows || !query.rows.length) {
        return null;
      }

      return JSON.parse(JSON.stringify(query.rows[0]));
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
