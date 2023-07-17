import {
  addDeviceHandler,
  deletDeviceHandler,
  getDeviceHandler,
} from "../controller/device.controller";
import { validateToken } from "../middleware/validator";

const deviceRoute = require("express").Router();

deviceRoute.get("/", validateToken, getDeviceHandler);
deviceRoute.post("/", addDeviceHandler);
deviceRoute.delete("/", deletDeviceHandler);

export default deviceRoute;
