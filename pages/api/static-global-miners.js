// just copy & pasted from here
// sometimes not
// https://github.com/filecoin-project/slingshot/blob/master/miners.json

import * as Constants from "~/common/constants";

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
        data: {
          buckets: [
            {
              name: "North America",
              amount: 1,
              minerAddresses: ["t09833"],
            },
            {
              name: "Europe",
              amount: 1,
              minerAddresses: ["t02620"],
            },
            {
              name: "Asia",
              amount: 1,
              minerAddresses: [
                "t03328",
                "t03339",
                "t08937",
                "t09573",
                "t014394",
                "t014432",
                "t016563",
                "t019196",
                "t019437",
                "t020385",
                "t020489",
                "t020523",
                "t020631",
                "t020961",
                "t020975",
              ],
            },
          ],
        },
      },
      null,
      4
    )
  );
}
