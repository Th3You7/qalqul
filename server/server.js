import express from "express";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("hello word");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/user", userRouter);

app.listen(port, (req, res) => {
  console.log(`port at ${port}`);
});
