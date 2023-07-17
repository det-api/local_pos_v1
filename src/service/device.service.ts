import { FilterQuery } from "mongoose";
import deviceModel, { deviceDocument } from "../model/device.model";
import { UpdateQuery } from "mongoose";

export const getDevice = async (query: FilterQuery<deviceDocument>) => {
  try {
    return deviceModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const addDevice = async (body: deviceDocument) => {
  try {
    return new deviceModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteDevice = async (query: FilterQuery<deviceDocument>) => {
  try {
    return deviceModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateDevice = async (
  query: FilterQuery<deviceDocument>,
  body: UpdateQuery<deviceDocument>
) => {
  try {
    await deviceModel.updateMany(query, body);
    return await deviceModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};
