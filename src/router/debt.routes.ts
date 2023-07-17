import {
  addDebtHandler,
  deleteDebtHandler,
  getDebtHandler,
  updateDebtHandler,
} from "../controller/debt.controller";

const debtRoute = require("express").Router();

debtRoute.get("/:page", getDebtHandler);

debtRoute.post("/", addDebtHandler);

debtRoute.patch("/", updateDebtHandler);

debtRoute.delete("/", deleteDebtHandler);

export default debtRoute;
