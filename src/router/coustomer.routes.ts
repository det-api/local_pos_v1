import {
  addCoustomerHandler,
  deletCoustomerHandler,
  getCoustomerHandler,
  searchCoustomerHandler,
} from "../controller/coustomer.controller";

const coustomerRoute = require("express").Router();

coustomerRoute.get("/", getCoustomerHandler);
coustomerRoute.post("/", addCoustomerHandler);
coustomerRoute.delete("/", deletCoustomerHandler);

coustomerRoute.get("/search", searchCoustomerHandler);

export default coustomerRoute;
