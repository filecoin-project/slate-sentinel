import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import Cors from "cors";
import initMiddleware from "~/common/init-middleware";
import MinerData from "~/common/miner-data";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const dataMapping = (data, mapping) => {
  data = JSON.parse(JSON.stringify(data));
  mapping = JSON.parse(JSON.stringify(mapping));

  return [
    ...data.buckets.map((location) => {
      location.minerAddresses = location.minerAddresses.map((each) => {
        const moreData = mapping[each]
          ? {
              miner: mapping[each].Miner,
              priceAttoFIL: mapping[each].Price,
              priceFIL: Strings.formatAsFilecoinConversion(mapping[each].Price),
              minPieceSizeBytes: mapping[each].MinPieceSize,
              minPieceSizeFormatted: Strings.bytesToSize(
                mapping[each].MinPieceSize
              ),
              minDealDuration: Strings.getDaysFromEpoch(mapping[each].Expiry),
              expiry: mapping[each].Expiry,
              timestamp: mapping[each].Timestamp,
            }
          : {};

        return {
          ...moreData,
          miner: each,
        };
      });

      location.amount = location.minerAddresses.length;

      return location;
    }),
  ];
};

export default async function handler(req, res) {
  await cors(req, res);

  let mapping = {};
  try {
    const response = await fetch(
      "https://indexes.pow.buidllabs.textile.io/index/ask"
    );
    const json = await response.json();
    mapping = json.Storage;
  } catch (e) {}

  const mappedData = dataMapping(MinerData, mapping);

  res.status(200).send(
    JSON.stringify(
      {
        decorator: "MAPPED_STATIC_GLOBAL_MINERS",
        data: mappedData,
      },
      null,
      4
    )
  );
}
