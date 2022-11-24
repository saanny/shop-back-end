import mongoose from "mongoose";
import { MONGO_DB, MONGO_HOST } from "../../conf";

mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`);
mongoose.connection.on("open", () => {
  console.log(`mongo connection is open ...`);
});
mongoose.connection.on("error", (err) => {
  console.error(`field to connect`, err.message);
});
