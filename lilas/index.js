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

const LIBRARY_ENTRYPOINTS = [
  "src/index.js",
  "src/index.jsx",
  "src/index.ts",
  "src/index.tsx",
];
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

async function build() {
  console.log("Building");

  await buildLilas();
  await buildLibrary();
}

async function buildLilas() {
  console.log("Building Lilas");

  await esbuild.build({
    entryPoints: [resolve(SRC_DIR, files.src.entryPoint)],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    outfile: `${OUT_DIR}/bundle.js`,
    logLevel: "info",
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

async function buildLibrary() {
  console.log("Building library");

  const entrypoint = LIBRARY_ENTRYPOINTS.find((filename) =>
    existsSync(filename)
  );

  const result = await esbuild.build({
    entryPoints: [entrypoint],

    entryNames: "[dir]/[name]-[hash]",
    external: ["react", "react-dom"],
    metafile: true,

    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["es6"],
    logLevel: "info",
    outfile: resolve(OUT_DIR, LIBRARY_OUTFILE),
  });

  console.log(await esbuild.analyzeMetafile(result.metafile));
}

async function watch() {
  console.log("Watching");
  await build();
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

async function main() {
  const args = process.argv;
  if (args.length != 3) {
    print_usage();
    process.exit(1);
  }

  switch (args[2]) {
    case "build":
      await build();
      break;
    case "watch":
      await watch();
      break;
    default:
      print_usage();
      process.exit(1);
  }
}

main();
