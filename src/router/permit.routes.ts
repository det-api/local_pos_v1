import {
    getPermitHandler,
    addPermitHandler,
    deletPermitHandler,
  } from "../controller/permit.controller";
import { roleValidator } from "../middleware/roleValidator";
import { validateAll, validateToken } from "../middleware/validator";
import { allSchemaId, permitSchema } from "../schema/schema";

  
  const permitRoute = require("express").Router();
  
  permitRoute.get(
    "/",
    // validateToken,
    // roleValidator(["admin"]),
    getPermitHandler
  );
  permitRoute.post(
    "/",
    // validateToken,
    // validateAll(permitSchema),
    // roleValidator(["admin"]),
    addPermitHandler
  );
  permitRoute.delete(
    "/",
    // validateToken,
    // validateAll(allSchemaId),
    // roleValidator(["admin"]),
    deletPermitHandler
  );
  
  export default permitRoute;
  