import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import DatauriParser from "datauri/parser";

// const dUri = new DatauriParser();

const dir = path.join(__dirname, ".", "/myUploads");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, ".", "/myUploads"));
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("image");

// const bufferToUri = (req) =>
//   dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { upload };
