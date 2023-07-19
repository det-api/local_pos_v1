import express, { NextFunction, Request, Response } from "express";
import config from "config";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoute from "./router/user.routes";
import permitRoute from "./router/permit.routes";
import roleRoute from "./router/role.routes";
import detailSaleRoute from "./router/detailSale.routes";
import localToDeviceRoute from "./router/localToDevice.routes";
import coustomerRoute from "./router/coustomer.routes";
import deviceRoute from "./router/device.routes";
import debtRoute from "./router/debt.routes";
import dailyReportRoute from "./router/dailyReport.routes";
import fuelBalanceRoute from "./router/fuelBalance.routes";
import fuelInRoute from "./router/fuelIn.routes";
import { liveDataChangeHandler } from "./connection/liveTimeData";
import { detailSaleUpdateByDevice } from "./service/detailSale.service";
import dailyPriceRoute from "./router/dailyPrice.routes";
import dbConnect, { client, connect } from "./utils/connect";
import blinkLed from "./connection/ledBlink";

const app = express();
app.use(fileUpload());
app.use(cors({ origin: "*" }));

const server = require("http").createServer(app);

client.on("connect", connect);

client.on("message", async (topic, message) => {
  let data = topic.split("/");

  console.log(data[2]);

  // if (data[2] == "active") {
  //   console.log(data[3]);
  //   blinkLed(Number(data[3]));
  // }

  if (data[2] == "Final") {
    detailSaleUpdateByDevice(data[3], message.toString());
  }

  if (data[2] == "livedata") {
    liveDataChangeHandler(message.toString());
  }

  if (topic == "detpos/local_server/price") {
    console.log(topic, message.toString());
  }
});

// socket

const io = require("socket.io-client");

let socket = io.connect("http://13.251.206.31:9000");

socket.on("connect", () => {
  console.log("Connected to Raspberry Pi server");

  // Send data to the Raspberry Pi server
  socket.emit("test", "Hello from local");

  // Receive data from the Raspberry Pi server
  socket.on("test", (data) => {
    console.log("Received data:", data);
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from Raspberry Pi server");
});

const port = config.get<number>("port");
const host = config.get<string>("host");

//mongodb connection

dbConnect();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ok");
});

app.use("/api/user", userRoute);
app.use("/api/permit", permitRoute);
app.use("/api/role", roleRoute);

app.use("/api/detail-sale", detailSaleRoute);

app.use("/api/device-connection", localToDeviceRoute);
app.use("/api/customer", coustomerRoute);
app.use("/api/device", deviceRoute);

app.use("/api/debt", debtRoute);

app.use("/api/daily-report", dailyReportRoute);
app.use("/api/fuel-balance", fuelBalanceRoute);
app.use("/api/fuelIn", fuelInRoute);

app.use("/api/daily-price", dailyPriceRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 409;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

server.listen(port, () =>
  console.log(`server is running in  http://${host}:${port}`)
);
