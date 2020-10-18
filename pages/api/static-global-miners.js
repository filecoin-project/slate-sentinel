// just copy & pasted from here
// sometimes not
// https://github.com/filecoin-project/slingshot/blob/master/miners.json

import * as Constants from "~/common/constants";

import MinerData from "~/common/miner-data";
import Cors from "cors";
import initMiddleware from "~/common/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  res.status(200).send(
    JSON.stringify(
      {
        decorator: "STATIC_GLOBAL_MINERS",
        data: STATIC_MINER_DATA,
      },
      null,
      4
    )
  );
}
