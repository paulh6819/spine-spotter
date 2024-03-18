import express from "express";

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//import routers here
import rootRouter from "./controllers/root-controller.js";

app.use("/", rootRouter);

app.listen(port, () => {
  console.log(`app listening @ http://localhost:${port}`);
});
