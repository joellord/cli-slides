const Slide = require("../slide");
const writer = require("../helpers/writer");
const format = require("../helpers/format");
const components = require("../helpers/components");
const { exec } = require("child_process");

class TerminalSlide extends Slide {
  constructor(props) {
    super(props);
    
    this.hideCursorAfterRender = false;
    this.hijackIO = true;
    this.command = "";
    this.commandRow = 0;
    this.commands = ["$ "];

    this.firstRow = 8;
    this.margin = 3;
    this.width = writer.getColumns() - this.margin * 2;
    this.height = writer.getRows() - this.firstRow - 3;

    this.truncateTerminalOutput = true;

    if (!this.slide.text) this.slide.text = "";
  }

  keypress(e, key) {
    if (e && key.name !== "return" && key.name !== "backspace") {
      this.commands[this.commandRow] += e;
      this.command += e;
      this.render();
    }
    if (key.name === "backspace") {
      this.commands[this.commandRow] = this.commands[this.commandRow].substr(0, this.commands[this.commandRow].length - 1);
      this.command = this.command.substr(0, this.command.length - 1);
      this.render();
    }
    if (key.name === "return" && this.command) {
      if (this.command.substr(0, 2) === "rm") {
        this.commands.push("🖕");
        return;
      };
      exec(this.command, (err, stdout, stderr) => {
        if (err) {
          this.commands.push(err.toString().split("\n")[0]);
        }
        stdout.split("\n").map(s => s ? this.commands.push(s) : "");
        stderr.split("\n").map(s => s ? this.commands.push(s) : "");
        this.command = "";
        this.commands.push("$ ");        
        this.commands = this.commands.slice(-1 * (this.height - 3));
        this.commandRow = this.commands.length - 1;

        this.render();
      });
    }
  }

  render() {
    writer.printCenter(components.title(this.slide.title), 3);
    let textLines = format.splitText(this.slide.text, 40);
    textLines.map((t, index) => writer.printCenter(t, 5 + index));
  
    let terminalFirstRow = this.firstRow;
    let terminalMargin = this.margin;
    let terminalWidth = this.width;
    let terminalHeight = this.height;

    writer.box(terminalMargin, terminalFirstRow, terminalWidth, terminalHeight, true, false);

    this.commands.map((c, index) => {
      if (this.truncateTerminalOutput && c.length > this.width - 5) {
        c = c.substr(0, this.width - 8) + "...";
      }
      writer.printLeft(c, terminalFirstRow + index + 1, terminalMargin + 2);
    });

    writer.moveCursor(terminalMargin + 4 + this.command.length, terminalFirstRow + this.commands.length);
  }
}

module.exports = TerminalSlide;