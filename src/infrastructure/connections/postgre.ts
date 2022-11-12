import { Sequelize } from 'sequelize';

const sequlize = new Sequelize({
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    password: "admin",
    username: "postgres",
    dialect: "postgres"
});
sequlize.authenticate().then(() => {
    console.log("*** postgress info : Hi");
}).catch((e) => {
    console.log("*** postgress info :", e);
})