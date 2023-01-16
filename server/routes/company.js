import express from "express";
import {
  getCompanies,
  getCompany,
  getMarketIndex,
  getTrendingStocks,
} from "../controllers/companies.js";

const router = express.Router();

router.get("/getCompany", getCompanies);
router.get("/getCompany/:id", getCompany);
router.get("/getMarketIndex", getMarketIndex);
router.get("/getTrendingStocks", getTrendingStocks);

export default router;
