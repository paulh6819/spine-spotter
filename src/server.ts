import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import routers here
import rootRouter from "./controllers/root-controller.js";

app.use("/", rootRouter);

app.listen(port, () => {
  console.log(`app listening @ http://localhost:${port}`);
});
