import * as Environment from "~/common/environment";

import Cors from "cors";
import initMiddleware from "~/common/init-middleware";

import { runQuery } from "~/common/utilities";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const DECORATOR = "STORAGE_LEADERBOARD";
const QUERY = `
SELECT
  client_id,
  address,
  data_size,
  num_cids,
  num_deals,
  num_miners
FROM (
  SELECT
    client_id,
    SUM(unpadded_piece_size) AS data_size,
    COUNT(DISTINCT piece_cid) AS num_cids,
    COUNT(DISTINCT deal_id) AS num_deals,
    COUNT(DISTINCT provider_id) AS num_miners
  FROM
    "public".market_deal_proposals
  WHERE
    is_verified IS FALSE
    AND client_id NOT IN( SELECT DISTINCT
        client_id FROM "public".market_deal_proposals
      WHERE
        client_id IN('t0112', 't0113', 't0114', 't010089')
      UNION
      SELECT DISTINCT
        owner_addr FROM "public".miner_info)
  GROUP BY
    client_id) AS t1
  JOIN "public".id_address_map AS t2 ON t1.client_id = t2.id
`.trim();

export default async function handler(req, res) {
  await cors(req, res);

  const response = await fetch(
    "https://space-race-slingshot-phase2.s3.amazonaws.com/prod/unfiltered_basic_stats.json"
  );
  const json = await response.json();
  const query = { epoch: json.epoch, ...json.payload };

  /*

  const response = await runQuery({
    label: DECORATOR,
    queryFn: async (DB) => {
      const query = await DB.raw(QUERY);

      if (!query || query.error) {
        return null;
      }

      if (!query.rows) {
        return null;
      }

      return JSON.parse(JSON.stringify(query.rows));
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
  */

  res
    .status(200)
    .send(JSON.stringify({ decorator: DECORATOR, data: query }, null, 4));
}
