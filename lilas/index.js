#!/usr/bin/env node
import { copyFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import esbuild from "esbuild";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(".", "dist");
const STATIC_DIR = resolve(ROOT_DIR, "static");
const SRC_DIR = resolve(ROOT_DIR, "src");

const LIBRARY_ENTRYPOINTS = ["src/index.js", "src/index.jsx", "src/index.ts", "src/index.tsx"];
const LIBRARY_OUTFILE = "library-bundle.js";

const files = {
  static: {
    html: "index.html",
    css: "styles.css",
  },
  src: {
    entryPoint: "index.jsx",
  },
};

function print_usage() {
  console.log("Usage: lilas [ build | watch ]");
}

function build() {
  console.log("Building");

  buildLilas();
  buildLibrary();
  buildShowcase();
}

function buildLilas() {
  console.log("Building Lilas");

  esbuild.buildSync({
    entryPoints: [resolve(SRC_DIR, files.src.entryPoint)],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    outfile: `${OUT_DIR}/bundle.js`,
  });

  copyFileSync(
    resolve(STATIC_DIR, files.static.html),
    resolve(OUT_DIR, files.static.html)
  );

  copyFileSync(
    resolve(STATIC_DIR, files.static.css),
    resolve(OUT_DIR, files.static.css)
  );
}

function buildLibrary() {
  console.log("Building library");

  const entrypoint = LIBRARY_ENTRYPOINTS.find(filename => existsSync(filename));
  console.log("the entrypoint is ======", entrypoint);

  esbuild.buildSync({
    entryPoints: [entrypoint],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["es6"],
    outfile: resolve(OUT_DIR, LIBRARY_OUTFILE),
  });
}

function buildShowcase() {
  console.log("TODO: Building showcase");
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

  console.log(`Opening ${files.static.html}`);
  execSync(`${command} ${resolve(OUT_DIR, files.static.html)}`);
}

function main() {
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
}

main();
