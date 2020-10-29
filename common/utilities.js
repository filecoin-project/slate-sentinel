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

const checkWhereType = (whereType) => {
  const whereTypes = ["where", "orWhere", "andWhere"];
  return whereTypes.indexOf(whereType) > -1 ? true : false;
};

const checkOperator = (operator) => {
  const operatorTypes = ["=", "!=", ">", "<", ">=", "<="];
  return operatorTypes.indexOf(operator) > -1 ? true : false;
};

export const processWhereClause = (queryObj, whereObject) => {
  let res = queryObj;

  console.log(whereObject);
  try {
    whereObject.forEach((clause) => {
      if (checkWhereType(clause[0]) && checkOperator(clause[2])) {
        if (clause[0] === "where") {
          res = res.where(clause[1], clause[2], clause[3]);
        }
        if (clause[0] === "orWhere") {
          res = res.orWhere(clause[1], clause[2], clause[3]);
        }
        if (clause[0] === "andWhere") {
          res = res.andWhere(clause[1], clause[2], clause[3]);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
  return res;
};

export const processSortBy = (qb, sortObject) => {
  try {
    sortObject.forEach((clause) => {
      console.log(clause);
      qb.orderBy(clause[0], clause[1]);
    });
  } catch (e) {
    console.log(e);
  }
};
