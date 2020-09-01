import * as Environment from "~/common/environment";

import configs from "~/knexfile";
import knex from "knex";

const envConfig = configs[Environment.NODE];
const Database = knex(envConfig);

export default Database;
