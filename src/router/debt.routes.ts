import {
  addDebtHandler,
  deleteDebtHandler,
  getDebtDatePagiHandler,
  getDebtHandler,
  updateDebtHandler,
} from "../controller/debt.controller";

const debtRoute = require("express").Router();

debtRoute.get("/:page", getDebtHandler);

debtRoute.get(
  "/pagi/by-date/:page",
  // validateToken,
  // hasAnyPermit(["view"]),
  getDebtDatePagiHandler
);

debtRoute.post("/", addDebtHandler);

debtRoute.patch("/", updateDebtHandler);

debtRoute.delete("/", deleteDebtHandler);

export default debtRoute;
