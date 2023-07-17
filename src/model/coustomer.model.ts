import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface coustomerDocument extends mongoose.Document {
  cou_name: string;
  cou_id: string;
  cou_debt: number;
}

const coustomerSchema = new Schema({
  cou_name: { type: String, required: true },
  cou_id: { type: String, unique: true },
  cou_phone: { type: Number, unique: true },
  cou_debt: { type: Number, default: 0 },
});

coustomerSchema.pre("save", function (next) {
  this.cou_name = this.cou_name.toLowerCase();
  // console.log(uuidv4().substr(0, 6));
  this.cou_id = uuidv4().substr(0, 6);
  next();
});

const coustomerModel = mongoose.model<coustomerDocument>(
  "coustomer",
  coustomerSchema
);

export default coustomerModel;
