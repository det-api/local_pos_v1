import { Request, Response, NextFunction, query } from "express";
import fMsg, { previous } from "../utils/helper";
import {
  getDetailSale,
  addDetailSale,
  updateDetailSale,
  deleteDetailSale,
  detailSalePaginate,
  detailSaleByDate,
  detailSaleByDateAndPagi,
  detailSaleUpdateError,
  // detailSaleByDate,
} from "../service/detailSale.service";
import {
  addFuelBalance,
  calcFuelBalance,
  getFuelBalance,
} from "../service/fuelBalance.service";
import { fuelBalanceDocument } from "../model/fuelBalance.model";
import { addDailyReport, getDailyReport } from "../service/dailyReport.service";
import { deviceLiveData } from "../connection/liveTimeData";

export const getDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let pageNo = Number(req.params.page);
    let { data, count } = await detailSalePaginate(pageNo, req.query);
    // console.log(typeof result[0].createAt);
    fMsg(res, "DetailSale are here", data, count);
  } catch (e) {
    next(new Error(e));
  }
};

//import
export const addDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let depNo = req.query.depNo?.toString();
    let nozzleNo = req.query.nozzleNo?.toString();
    if (!depNo || !nozzleNo) {
      throw new Error("you need pumpNo or message");
    }

    // that is save in data base
    let result = await addDetailSale(depNo, nozzleNo, req.body);

    console.log("wk5");

    fMsg(res, "New DetailSale data was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const updateDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateDetailSale(req.query, req.body);
    fMsg(res, "updated DetailSale data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const detailSaleUpdateErrorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let nozzleNo = req.query.nozzleNo;
    // console.log("wk");
    console.log(nozzleNo);

    let [saleLiter, totalPrice] = deviceLiveData.get(nozzleNo);

    console.log(saleLiter);

    req.body = {
      ...req.body,
      saleLiter: saleLiter,
      totalPrice: totalPrice,
    };

    let result = await detailSaleUpdateError(req.query, req.body);
    fMsg(res, "updated DetailSale error data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deleteDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteDetailSale(req.query);
    fMsg(res, "DetailSale data was deleted");
  } catch (e) {
    next(new Error(e));
  }
};

//get detail sale between two date

export const getDetailSaleByDateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let sDate: any = req.query.sDate;
    let eDate: any = req.query.eDate;

    delete req.query.sDate;
    delete req.query.eDate;

    let query = req.query;

    if (!sDate) {
      throw new Error("you need date");
    }
    if (!eDate) {
      eDate = new Date();
    }
    //if date error ? you should use split with T or be sure detail Id
    const startDate: Date = new Date(sDate);
    const endDate: Date = new Date(eDate);
    let result = await detailSaleByDate(query, startDate, endDate);
    fMsg(res, "detail sale between two date", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const getDetailSaleDatePagiHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let sDate: any = req.query.sDate;
    let eDate: any = req.query.eDate;
    let pageNo: number = Number(req.params.page);

    delete req.query.sDate;
    delete req.query.eDate;

    let query = req.query;

    if (!sDate) {
      throw new Error("you need date");
    }
    if (!eDate) {
      eDate = new Date();
    }
    //if date error ? you should use split with T or be sure detail Id
    const startDate: Date = new Date(sDate);
    const endDate: Date = new Date(eDate);
    let { data, count } = await detailSaleByDateAndPagi(
      query,
      startDate,
      endDate,
      pageNo
    );

    fMsg(res, "detail sale between two date", data, count);
  } catch (e) {
    next(new Error(e));
  }
};
