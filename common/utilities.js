import DB from "~/common/database";

export const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn(DB);
  } catch (e) {
    response = errorFn(e);
  }

  console.log("[ database-query ]", { query: label });
  return response;
};
