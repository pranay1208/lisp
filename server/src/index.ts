import express from "express";
import { writeFileSync } from "fs";
import path from "path";
import multer from "multer";

const locationCounter: Record<string, number> = {}; // this is a record from string  to int

const upload = multer();
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.status(200).send("ONLINE");
});

app.post("/", upload.single("file"), async (req, res) => {
  const fileContent = req.body.file as string;
  const fileType = req.body.type as string;
  const location = req.body.location as string;

  const keyName = `${location}|${fileType}`;

  if (!(keyName in locationCounter)) {
    locationCounter[keyName] = 0;
  }
  locationCounter[keyName] += 1;

  const fileName = `${location}T${locationCounter[keyName]}.m4a`;
  const fullFilePath = path.join("audio", fileType, fileName);

  const buffer = Buffer.from(fileContent, "base64");
  console.log("Wrote file", fileName);

  writeFileSync(fullFilePath, buffer);

  const json = '{"result":true, "count":42}';
  const obj = JSON.parse(json);
  res.status(200).send(obj);
});

app.listen(PORT, () => {
  console.log("Server listening at port", PORT);
});
