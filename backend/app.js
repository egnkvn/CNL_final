import express from "express";
import cors from "cors";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

//Routes
import mainRoutes from "./Controller/index.js";
import videoRoutes from "./Controller/video.js";

app.use("/api/", mainRoutes);
app.use("/api/video", videoRoutes);

app.use((err, req, res, next) => {
  res.status(err.status).send(`${err.status} - ${err.message}`);
});
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
