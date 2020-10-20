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
        return mapping[each]
          ? {
              id: mapping[each].Miner,
              location: location.name,
              storageAsk: {
                priceAttoFIL: mapping[each].Price,
                priceFIL: Strings.formatAsFilecoinConversion(
                  mapping[each].Price
                ),
                minPieceSizeBytes: mapping[each].MinPieceSize,
                minPieceSizeFormatted: Strings.bytesToSize(
                  mapping[each].MinPieceSize
                ),
                minDealDuration: Strings.getDaysFromEpoch(mapping[each].Expiry),
                expiry: mapping[each].Expiry,
                timestamp: mapping[each].Timestamp,
                __wip_verifiedPriceAttoFIL: 0,
              },
              __wip_score: "",
              __wip_createdAt: "",
              __wip_data: {},
              __wip_alias: "",
              __wip_notes: "",
              __wip_peerId: "",
              __wip_ipAddress: "",
              __wip_powerBytes: "",
              __wip_totalDeals: 0,
              __wip_lastSealedAt: "",
              __wip_initialPledgeAttoFIL: 0,
              __wip_balanceAttoFIL: 0,
              __wip_availableBalanceAttoFIL: 0,
              __wip_balanceVestingAttoFIL: 0,
              __wip_sectorState: {
                deadline: 0,
                faultCutoff: 0,
                challenged: 0,
                open: 0,
                closed: 0,
                total: 0,
                faults: 0,
                precommits: 0,
              },
            }
          : { id: each };
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
