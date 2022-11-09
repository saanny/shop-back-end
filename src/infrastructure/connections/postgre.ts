import { Sequelize } from 'sequelize';

const sequlize = new Sequelize({
    database: "shop",
    host: "localhost",
    password: "admin",
    username: "postgres",
    dialect: "postgres"
});
sequlize.authenticate().then(() => {
    console.log("*** postgress info : Hi");
}).catch((e) => {
    console.log("*** postgress info :", e);
})