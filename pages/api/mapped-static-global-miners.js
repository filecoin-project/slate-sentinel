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
              id: mapping[each].Miner,
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
              __wip_ask: {
                priceAttoFIL: mapping[each].Price,
                verifiedPriceAttoFIL: 0,
                minPieceSizeBytes: mapping[each].MinPieceSize,
                expiry: mapping[each].Expiry,
                timestamp: mapping[each].Timestamp,
              },
              __wip_hardware: {
                processorName: "",
                processorSpeedGigahertz: "",
                processorCount: "",
                coreCount: "",
                memoryBytes: "",
                hardDriveName: "",
                hardDriveCapacityBytes: "",
              },
              __wip_alias: "",
              __wip_notes: "",
              __wip_peerId: "",
              __wip_ipAddress: "",
              __wip_powerBytes: "",
              __wip_totalDeals: 0,
              __wip_totalFaults: 0,
              __wip_createdAt: "",
              __wip_lastSealedAt: "",
              __wip_sectorInfo: {
                deadline: 0,
                faultCutoff: 0,
                challenged: 0,
                open: 0,
                closed: 0,
              },
              __wip_initialPledgeAttoFIL: 0,
              __wip_balanceAttoFIL: 0,
              __wip_availableBalanceAttoFIL: 0,
              __wip_balanceVestingAttoFIL: 0,
              __wip_sectors: 0,
              __wip_sectorsActive: 0,
              __wip_sectorsTotal: 0,
              __wip_sectorsFaulty: 0,
              __wip_precommits: 0,
            }
          : { id: each };

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
