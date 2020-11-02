#!/usr/bin/env node

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");

const downloadPlanete = () => {
  const down_ver = "0.1.0";
  const down_file = `planete-wasm-${down_ver}.${
    os.type() === "Windows_NT" ? "zip" : "tar.gz"
  }`;
  const down_path = path.resolve(__dirname, down_file);
  const down_url = `https://github.com/Colocasian/planete-wasm/releases/download/v${down_ver}/${down_file}`;

  return new Promise((resolve, reject) => {
    if (fs.existsSync(down_path)) {
      console.error(`Cannot download: ${down_path} already exists`);
      reject(new Error(`cannot download: ${down_path} already exists`));
    } else {
      const writer = fs.createWriteStream(down_path);
      axios
        .get(down_url, { responseType: "stream" })
        .then((res) => {
          res.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", (err) => {
            fs.unlinkSync(down_path, (err) => {
              if (err) reject(err);
              resolve();
            });
            reject(err);
          });
        })
        .catch((err) => {
          fs.unlinkSync(down_path, (err) => {
            if (err) reject(err);
            resolve();
          });
          reject(err);
        });
    }
  });
};

const extractAndMovePlanete = () => {
  const down_ver = "0.1.0";
  const down_file = `planete-wasm-${down_ver}.${
    os.type() === "Windows_NT" ? "zip" : "tar.gz"
  }`;
  const down_path = path.resolve(__dirname, down_file);

  const extract_dir = __dirname;
  const extract_path = path.resolve(extract_dir, "planete-wasm");
  const pkg_dir = path.resolve(__dirname, "..", "lib", "planete-wasm");
  const pkg_path = path.resolve(pkg_dir, "pkg");

  return new Promise((resolve, reject) => {
    if (fs.existsSync(pkg_path)) {
      console.error(`'${pkg_path}' already exists`);
      reject(new Error(`'${pkg_path}' already exists`));
    } else if (fs.existsSync(extract_path)) {
      console.error(`Cannot extract: '${extract_path}' already exists`);
      reject(new Error(`cannot extract: '${extract_path}' already exists`));
    } else {
      if (fs.existsSync(pkg_dir)) {
        pkg_dir_stats = fs.statSync(pkg_dir);
        if (!pkg_dir_stats.isDirectory()) {
          console.error(
            `Cannot extractAndMove: '${pkg_dir}' already exists, and is not a directory`
          );
          reject(
            new Error(
              `cannot extractAndMove: '${pkg_dir}' already exists, and is not a directory`
            )
          );
        }
      } else {
        console.log(`'${pkg_dir}' doesn't exist; creating directory...`);
        fs.mkdirSync(pkg_dir);
        console.log(`Created '${pkg_dir}'`);
      }

      console.log("Extracting file using bsdtar...");
      const extract = spawn("bsdtar", [
        "-xf",
        down_path,
        "--directory",
        extract_dir,
      ]);
      extract
        .on("close", (tar_code) => {
          if (tar_code !== 0) {
            console.error("Extraction gave error code: error code", tar_code);
            reject(new Error(`bsdtar gave error code ${tar_code}`));
          } else {
            console.log("Extraction succeeded");
            console.log("Moving planete-wasm...");
            const move = spawn("mv", [extract_path, pkg_path]);
            move
              .on("close", (mv_code) => {
                if (mv_code !== 0) {
                  console.error("Move failed: error code", mv_code);
                  reject(new Error(`mv gave error code ${mv_code}`));
                } else {
                  console.log("Move succeeded");
                  resolve();
                }
              })
              .on("error", (err) => {
                console.error("Move failed:", err);
                reject(err);
              });
          }
        })
        .on("error", (err) => {
          console.error("Extraction failed:", err);
          reject(err);
        });
    }
  });
};

console.log("Started download of planete-wasm...");
downloadPlanete()
  .then(() => {
    console.log("Download completed successfully");
    console.log("Extracting and moving planete-wasm...");
    extractAndMovePlanete()
      .then(() => {
        console.log("extractAndMove succeeded");
      })
      .catch((err) => {
        console.error("extractAndMove failed:", err);
      });
  })
  .catch((err) => console.error("Download failed:", err));
