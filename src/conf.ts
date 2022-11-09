const PRODUCTION = ["prod", "production"].includes(
    process.env.NODE_ENV as string
);
const DEVELOPMENT = !PRODUCTION;
if (DEVELOPMENT) {
    require("dotenv").config();
}
const {
    PORT,
    NODE_ENV,
} = process.env;

export {
    PORT,
    NODE_ENV,
};

