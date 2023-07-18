import { FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import debtModel, { debtDocument, debtInput } from "../model/debt.model";
import { getCoustomerById, updateCoustomer } from "./coustomer.service";

export const getDebt = async (query: FilterQuery<debtDocument>) => {
  try {
    return await debtModel
      .find(query)
      .populate("coustomer")
      .lean()
      .select("-__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const DebtPaginate = async (
  pageNo: number,
  query: FilterQuery<debtDocument>
): Promise<{ count: number; data: debtDocument[] }> => {
  const limitNo = config.get<number>("page_limit");
  const reqPage = pageNo == 1 ? 0 : pageNo - 1;
  const skipCount = limitNo * reqPage;
  const data = await debtModel
    .find(query)
    .populate("coustomer")
    .skip(skipCount)
    .limit(limitNo)
    .lean()
    .select("-__v");

  const count = await debtModel.countDocuments(query);

  return { data, count };
};

export const addDebt = async (body: debtInput) => {
  try {
    let coustomerConditon = await getCoustomerById(body.couObjId);

    if (!coustomerConditon)
      throw new Error("There is no coustomer with that name");

    return await new debtModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const countDebt = async () => {
  return await debtModel.countDocuments();
};

export const updateDebt = async (
  query: FilterQuery<debtDocument>,
  body: UpdateQuery<debtDocument>
) => {
  try {
    await debtModel.updateMany(query, body);
    return await debtModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteDebt = async (query: FilterQuery<debtDocument>) => {
  try {
    let Debt = await debtModel.find(query);
    if (!Debt) {
      throw new Error("No Debt with that id");
    }
    return await debtModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};
