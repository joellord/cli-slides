#!/usr/bin/env node

const Presentation = require("../src/presentation");

const ARG = process.argv[2];

if (ARG === "version") {
  console.log("CLI-Slides");
  let package = require("../package.json");
  console.log(package.version);
  process.exit(0);
}

let presentation = new Presentation(process.argv[2]);

let START = 1;
presentation.start(process.argv[3] || START);
