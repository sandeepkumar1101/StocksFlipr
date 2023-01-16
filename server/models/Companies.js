import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    scId: { type: String, required: true },
  },
  {
    collection: "companies",
  }
);

const Companies = mongoose.model("companies", CompanySchema);
export default Companies;
