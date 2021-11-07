const { mysqlOptions, sqliteOptions } = require("../models/databases");

const knexMySQL = require("knex")(mysqlOptions);
const knexSQLite = require("knex")(sqliteOptions);

knexMySQL.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("title");
    table.string("thumbnail");
    table.float("price");
  })
  .then(() => console.log("Table created"))
  .catch((err) => {
    console.log(err);
    throw error;
  })
  .finally(() => knexMySQL.destroy());

knexSQLite.schema
  .createTable("messages", (table) => {
    table.increments("id");
    table.string("email");
    table.string("text");
    table.string("date");
  })
  .then(() => console.log("Table created"))
  .catch((error) => {
    console.error(error);
    throw error;
  })
  .finally(() => knexSQLite.destroy());
