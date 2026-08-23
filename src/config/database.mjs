import { Sequelize } from "sequelize";

const sequelize = new Sequelize("expressjs_api", "root", process.env.DATABASE_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

export { sequelize };