import express from "express";
import fs, { copyFileSync } from "fs";
import { upload } from "../multer.js";

const userRouter = express.Router();

userRouter.post("/add", upload, (req, res) => {
  const { originalname, path, destination } = req.file;
  try {
    if (originalname) {
      res.json({ path, originalname, destination });
    } else {
      res.status(404).send("no file sent to the server");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.delete("/remove", async (req, res) => {
  const { source } = req.body;

  try {
    const { path } = source;

    fs.unlink(path, (err) => {
      if (err) return err;
      res.send("deleted succ");
    });
  } catch (error) {
    res.status(500).send("err has occured");
  }
});
export default userRouter;
