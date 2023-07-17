import {
  addDailyPriceHandler,
  deleteDailyPriceHandler,
  getDailyPriceHandler,
  updateDailyPriceHandler,
} from "../controller/dailyPrice.controller";

const dailyPriceRoute = require("express").Router();

dailyPriceRoute.get("/:page", getDailyPriceHandler);

dailyPriceRoute.post("/", addDailyPriceHandler);

dailyPriceRoute.patch("/", updateDailyPriceHandler);

dailyPriceRoute.delete("/", deleteDailyPriceHandler);

export default dailyPriceRoute;
