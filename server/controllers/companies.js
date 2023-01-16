import { format } from "path";
import Companies from "../models/Companies.js";
import MarketIndex from "../models/MarketIndex.js";
import TrendingStocks from "../models/TrendingData.js";

export const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Companies.findById(id);
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    console.log(search);
    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    console.log(search);
    const companies = await Companies.find({
      name: { $regex: search, $options: "i" },
    })
      .skip(page * pageSize)
      .limit(pageSize)
      .sort(sortFormatted);

    const total = await Companies.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      companies,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMarketIndex = async (req, res) => {
  try {
    // get latest with the help of timestamp
    const marketIndex = await MarketIndex.findOne({ indexid: "123" });
    const marketIndexFormatted = {
      ...marketIndex._doc,
      length: marketIndex._doc.data.length,
    };
    res.status(200).json(marketIndexFormatted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getTrendingStocks = async (req, res) => {
  try {
    // get latest with the help of timestamp
    const trendingStocks = await TrendingStocks.findOne({ indexid: "123" });
    const trendingStocksFormatted = {
      ...trendingStocks._doc,
      length: trendingStocks._doc.data.length,
    };
    res.status(200).json(trendingStocksFormatted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
