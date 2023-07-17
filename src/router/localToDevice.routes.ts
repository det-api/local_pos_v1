import { connectDeviceHandler, devicePermitHandler } from "../controller/localToDevice.controller";
const localToDeviceRoute = require("express").Router();

localToDeviceRoute.post('/whreq' , connectDeviceHandler)

localToDeviceRoute.post('/device-permit' , devicePermitHandler)
 
export default localToDeviceRoute