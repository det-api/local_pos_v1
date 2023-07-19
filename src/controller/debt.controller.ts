import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import {
  DebtPaginate,
  addDebt,
  countDebt,
  deleteDebt,
  detailSaleByDateAndPagi,
  updateDebt,
} from "../service/debt.service";
import {
  getCoustomerById,
  updateCoustomer,
} from "../service/coustomer.service";

export const getDebtHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let pageNo = Number(req.params.page);

    let { data, count } = await DebtPaginate(pageNo, req.query);
    fMsg(res, "Debt are here", data, count);
  } catch (e) {
    next(new Error(e));
  }
};

export const addDebtHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("add new debt");

    if (!req.body.couObjId && !req.body.credit)
      throw new Error("you need customer id or deposit");

    let count = await countDebt();
    req.body.vocono = `paid-${count}`;

    let result = await addDebt(req.body);
    // console.log(result);

    let coustomerConditon = await getCoustomerById(result.couObjId);

    if (!coustomerConditon)
      throw new Error("There is no coustomer with that name");

    coustomerConditon.cou_debt = coustomerConditon.cou_debt - result.credit;

    await updateCoustomer(result.couObjId, coustomerConditon);

    fMsg(res, "New Debt data was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const updateDebtHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateDebt(req.query, req.body);
    fMsg(res, "updated Debt data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deleteDebtHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteDebt(req.query);
    fMsg(res, "Debt data was deleted");
  } catch (e) {
    next(new Error(e));
  }
};

export const getDebtDatePagiHandler = async (
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

    fMsg(res, "debt between two date", data, count);
  } catch (e) {
    next(new Error(e));
  }
};
