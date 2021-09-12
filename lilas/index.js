#!/usr/bin/env node
import { copyFileSync } from "fs";
import { execSync } from "child_process";
import esbuild from "esbuild";

const OUT_DIR = "dist";
const STATIC_DIR = "static";

const staticFiles = {
  html: "index.html",
  css: "styles.css",
};

function print_usage() {
  console.log("Usage: npm start [ watch | build ]");
}

function build() {
  console.log("Building");

  esbuild.buildSync({
    entryPoints: ["src/index.jsx"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    outfile: `${OUT_DIR}/bundle.js`,
  });


  copyFileSync(`${STATIC_DIR}/${staticFiles.html}`, `${OUT_DIR}/${staticFiles.html}`);
  copyFileSync(`${STATIC_DIR}/${staticFiles.css}`, `${OUT_DIR}/${staticFiles.css}`);
}

function watch() {
  console.log("Watching");
  build();
  open();
}

function open() {
  let command = null;
  switch (process.platform) {
    case "darwin":
      command = "open";
      break;
    default:
      console.log("command", command);
      throw `Unknown open command for platform '${process.platform}'`;
  }

  console.log(`Opening ${staticFiles.html}`);
  execSync(`${command} ${OUT_DIR}/${staticFiles.html}`);
}

const args = process.argv;
if (args.length != 3) {
  print_usage();
  process.exit(1);
}

switch (args[2]) {
  case "build":
    build();
    break;
  case "watch":
    watch();
    break;
  default:
    print_usage();
    process.exit(1);
}
