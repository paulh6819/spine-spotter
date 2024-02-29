import express from "express";

const app = express();
const port = 3000;

app.get("/hello", (req, res) => {
  res.json({ serverMessage: "hello world" });
});

app.listen(port, () => {
  console.log(`app listening @ http://localhost:${port}`);
});
