#!/usr/bin/env node

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const os = require("os");

const downloadPlanete = () => {
  const down_ver = "0.1.0";
  const down_file = `planete-wasm-${down_ver}.${
    os.type() === "Windows_NT" ? "zip" : "tar.gz"
  }`;
  const down_path = path.resolve(__dirname, down_file);
  const down_url = `https://github.com/Colocasian/planete-wasm/releases/download/v${down_ver}/${down_file}`;
  const writer = fs.createWriteStream(down_path);

  return new Promise((resolve, reject) => {
    axios
      .get(down_url, { responseType: "stream" })
      .then((res) => {
        res.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", (err) => {
          fs.unlink(down_path, (err) => {
            if (err) reject(err);
            resolve();
          });
          reject(err);
        });
      })
      .catch((err) => {
        fs.unlink(down_path, (err) => {
          if (err) reject(err);
          resolve();
        });
        reject(err);
      });
  });
};

console.log("Started download of planete-wasm...");
downloadPlanete()
  .then(() => console.log("Download completed successfully"))
  .catch((err) => console.error("Download failed:", err));
