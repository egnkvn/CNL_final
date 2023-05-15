import express from "express";
import { Model } from "../Model/video.js";
const router = express.Router();

router.use(express.urlencoded());
router.use(express.json());

router.get("/subject", async (req, res, next) => {
  const result = await Model.getAllSubject(next);
  res.status(200).send({ subject: result });
});

router.get("/search", async (req, res, next) => {
  const { keyword, subject } = req.query;
  const result = await Model.getSearchResult(keyword, subject, next);
  res.status(200).send({ videos: result });
});

router.get("/category", async (req, res, next) => {
  const result = await Model.getCategoryResult(req.query.subject, next);
  res.status(200).send({ videos: result });
});
export default router;
