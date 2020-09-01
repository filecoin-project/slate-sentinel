import * as Environment from "~/common/environment";

import Cors from "cors";
import initMiddleware from "~/common/init-middleware";

import { runQuery } from "~/common/utilities";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  const offset = req.body.offset || 0;
  const limit = req.body.limit || 100;

  const response = await runQuery({
    label: "GET_ACTOR_STATES",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("actor_states")
        .offset(offset)
        .limit(limit);

      if (!query || query.error) {
        return null;
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        decorator: "GET_ACTOR_STATES",
        error: e,
      };
    },
  });

  if (!response) {
    return res
      .status(500)
      .send({ decorator: "GET_ACTOR_STATES_FAILED", error: true });
  }

  if (response.error) {
    return res
      .status(500)
      .send({ decorator: "GET_ACTOR_STATES_ERROR", error: true });
  }

  res
    .status(200)
    .send(
      JSON.stringify({ decorator: "GET_ACTOR_STATES", data: response }, null, 4)
    );
}
