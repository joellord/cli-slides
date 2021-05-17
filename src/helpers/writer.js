function getRows() {
  return process.stdout.rows
}

function getColumns() {
  return process.stdout.columns;
}

function moveCursor(x, y) {
  x = Math.floor(x);
  y = Math.floor(y);
  write("\x1b[" + y + ";" + x + "H");
}

function hideCursor() {
  moveCursor(getColumns()-1, getRows()-1);
}

function printCenter(text, line, firstCol, lastCol) {
  let columns = getColumns();
  if (firstCol || lastCol) {
    columns = lastCol - firstCol;
  }
  const start = (columns - actualTextLength(text)) / 2;
  moveCursor(start, line);
  write(text);
}

function printLeft(text, line, leftPad) {
  if (!leftPad) leftPad = 0;
  moveCursor(leftPad, line);
  write(text);
}

function printRight(text, line) {
  const cols = getColumns();
  moveCursor(cols - actualTextLength(text), line);
  write(text);
}

function clearScreen() {
  write("\x1b[2J");
}

function write(text) {
  text = colorize(text);
  process.stdout.write(text);
}

function colorize(text) {
  text = text.replace(/\[reset\]/g, "\x1b[0m");
  text = text.replace(/\[bright\]/g, "\x1b[1m");
  text = text.replace(/\[dim\]/g, "\x1b[2m");
  text = text.replace(/\[underscore\]/g, "\x1b[4m");
  text = text.replace(/\[blink\]/g, "\x1b[5m");
  text = text.replace(/\[reverse\]/g, "\x1b[7m");
  text = text.replace(/\[hidden\]/g, "\x1b[8m");

  text = text.replace(/\[black\]/g, "\x1b[30m");
  text = text.replace(/\[red\]/g, "\x1b[31m");
  text = text.replace(/\[green\]/g, "\x1b[32m");
  text = text.replace(/\[yellow\]/g ,"\x1b[33m");
  text = text.replace(/\[blue\]/g, "\x1b[34m");
  text = text.replace(/\[magenta\]/g, "\x1b[35m");
  text = text.replace(/\[cyan\]/g, "\x1b[36m");
  text = text.replace(/\[white\]/g, "\x1b[37m");

  text = text.replace(/\[bgblack\]/g, "\x1b[40m");
  text = text.replace(/\[bgred\]/g, "\x1b[41m");
  text = text.replace(/\[bggreen\]/g, "\x1b[42m");
  text = text.replace(/\[bgyellow\]/g, "\x1b[43m");
  text = text.replace(/\[bgblue\]/g, "\x1b[44m");
  text = text.replace(/\[bgmagenta\]/g, "\x1b[45m");
  text = text.replace(/\[bgcyan\]/g, "\x1b[46m");
  text = text.replace(/\[bgwhite\]/g, "\x1b[47m");

  return text;
}

function actualTextLength(text) {
  return text.replace(/\[[a-z]*\]/g, "").length;
}

function box(x, y, width, height, doubleTop, doubleSide) {
  const side = doubleSide ? "\u2551" : "\u2502";
  const top = doubleTop ? "\u2550" : "\u2500";
  let corners = ["\u250C", "\u2510", "\u2514", "\u2518"];
  if (doubleTop && !doubleSide) corners = ["\u2552", "\u2555", "\u2558", "\u255B"];
  if (doubleTop && doubleSide) corners = ["\u2554", "\u2557", "\u255A", "\u255D"];
  if (!doubleTop && doubleSide) corners = ["\u2553", "\u2556", "\u2559", "\u255C"];
  moveCursor(x, y);
  write(`${corners[0]}${top.repeat(width-2)}${corners[1]}`);
  for (let i = 0; i < height - 2; i++) {
    moveCursor(x, y + 1 + i);
    write(`${side}${" ".repeat(width-2)}${side}`);
  }
  moveCursor(x, y + height - 1);
  write(`${corners[2]}${top.repeat(width-2)}${corners[3]}`);
}

function asciiArtify(text) {
  let font = {
    a: [
      "   ",
      "|\\ ",
      "|-\\"
    ],
    b: [
      " _ ",
      "|_)",
      "|_)"
    ],
    c: [
      " _ ",
      "|  ",
      "|_ "
    ],
    d: [
      " _ ",
      "| \\",
      "|_/"
    ],
    e: [
      " __",
      "|__",
      "|__"
    ],
    f: [
      " __",
      "|_ ",
      "|  "
    ],
    g: [
      " __",
      "| _",
      "|_|"
    ],
    h: [
      "   ",
      "|_|",
      "| |"
    ],
    i: [
      " . ",
      " | ",
      " | "
    ],
    j: [
      "___",
      "  |",
      "|_|"
    ],
    k: [
      "| /",
      "|< ",
      "| \\"
    ],
    l: [
      "   ",
      "|  ",
      "|__"
    ],
    m: [
      "    ",
      "|\\/|",
      "|  |"
    ],
    n: [
      "   ",
      "|\\|",
      "| |"
    ],
    o: [
      " _ ",
      "| |",
      "|_|"
    ],
    p: [
      " _ ",
      "|_|",
      "|  "
    ],
    q: [
      " _ ",
      "| |",
      "|_\\"
    ],
    r: [
      " _ ",
      "|_|",
      "| \\"
    ],
    s: [
      " __",
      "|_ ",
      "__|"
    ],
    t: [
      "___",
      " | ",
      " | "
    ],
    u: [
      "   ",
      "| |",
      "|_|"
    ],
    v: [
      "    ",
      "\\  /",
      " \\/ "
    ],
    w: [
      "     ",
      "\\   /",
      " \\^/ "
    ],
    x: [
      "   ",
      "\\_/",
      "/ \\"
    ],
    y: [
      "   ",
      "\\_/",
      " | "
    ],
    z: [
      "___",
      " / ",
      "/__"
    ],
    " ": [
      "   ",
      "   ",
      "   "
    ]
  }
  text = text.toLowerCase();
  let art = ["", "", ""];
  text.split("").map(l => {
    art[0] += font[l][0];
    art[1] += font[l][1];
    art[2] += font[l][2];
  });
  return art;
}

function clearLine() {
  process.stdout.clearLine();
}

module.exports = {
  printCenter,
  printRight,
  printLeft,
  moveCursor,
  getColumns,
  getRows,
  hideCursor,
  clearScreen,
  write,
  box,
  asciiArtify,
  clearLine
}