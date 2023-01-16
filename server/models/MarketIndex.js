import mongoose from "mongoose";

const MarketIndexSchema = new mongoose.Schema(
  {
    data: {
      type: Array,
      name: {
        type: String,
        required: true,
      },
      last: {
        String,
        default: 0,
      },
      high: {
        String,
        default: 0,
      },
      low: {
        String,
        default: 0,
      },
      changePercent: {
        String,
        default: 0,
      },
      Change: {
        String,
        default: 0,
      },
      // %d/%m format
      dateofFetch: {
        String,
        default: 0,
      },
      default: [],
    },
  },
  {
    collection: "marketIndex",
    timestamps: true,
  }
);

const MarketIndex = mongoose.model("marketIndex", MarketIndexSchema);
export default MarketIndex;
