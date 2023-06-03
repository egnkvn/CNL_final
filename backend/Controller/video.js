import express from "express";
import fs from "fs";
import path from "path";
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

router.put("/hot/:id", async (req, res, next) => {
  const result = await Model.updateVideoView(req.params.id, next);
  console.log(result);
  if (result.affectedRows == 1) res.status(200).send("OK");
  else res.status(500).send("DB Error");
});

router.get("/hot", async (req, res, next) => {
  const result = await Model.getHotVideo(next);
  res.status(200).send({ videos: result });
});

router.get("/play", async (req, res, next) => {
  try {
    const videoPath = req.query.path;
    print(path.resolve(videoPath))
    let data = fs.readFileSync(path.resolve(videoPath));
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Something wrong!");
  }
});
export default router;
