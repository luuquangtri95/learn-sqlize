import { Sequelize } from "sequelize";

const PostgresSequelize = new Sequelize(
  "learn-sequelize",
  "postgres",
  "123456tri",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default PostgresSequelize;
