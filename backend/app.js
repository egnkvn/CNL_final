import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

//Routes
import mainRoutes from "./Controller/index.js";
import videoRoutes from "./Controller/video.js";

app.use("/", mainRoutes);
app.use("/video", videoRoutes);

app.use((err, req, res, next) => {
  res.status(err.status).send(`${err.status} - ${err.message}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
