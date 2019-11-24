#!/usr/bin/env node

const Presentation = require("./presentation");

let presentation = new Presentation(process.argv[2]);

let START = 1;
presentation.start(process.argv[3] || START);
