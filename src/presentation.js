const writer = require("./helpers/writer");
const readline = require("readline");
const helpers = require("./helpers/helpers");
const fs = require("fs");

const DiagramSlide = require("./templates/diagram");
const ListSlide = require("./templates/list");
const NotFoundSlide = require("./templates/notfound");
const SimpleSlide = require("./templates/simple");
const SpeakingSlide = require("./templates/speaking");
const TerminalSlide = require("./templates/terminal");
const TitleSlide = require("./templates/title");
const TitleOnlySlide = require("./templates/titleOnly");
const CodeSlide = require("./templates/code");
const SplitSlide = require("./templates/split");

class Presentation {
  constructor(presentationFile) {
    let presentationObject = JSON.parse(fs.readFileSync(presentationFile));
    fs.watchFile(presentationFile, (c, p) => {
      let newData = fs.readFileSync(presentationFile);
      try {
        newData = JSON.parse(newData);
      } catch (e) {
        return;
      }
      this.slides = newData.slides;
      newData.slides = undefined;
      this.meta = newData;
      this.renderDeck();
    });
    this.slides = presentationObject.slides;
    presentationObject.slides = undefined;
    this.meta = presentationObject;

    this.frame = {};
    if (presentationObject.frame && presentationObject.frame.top && presentationObject.frame.top.center) {
      let text = helpers.objectPropByString(presentationObject, presentationObject.frame.top.center);
      if (!text) text = presentationObject.frame.top.center;
      this.frame.top = text;
    } else {
      this.frame.top = presentationObject.title;
    }
    this.frame.bottom = {left: [], center: []};
    if (presentationObject.frame && presentationObject.frame.bottom && presentationObject.frame.bottom.left) {
      if (!Array.isArray(presentationObject.frame.bottom.left)) {
        presentationObject.frame.bottom.left = [presentationObject.frame.bottom.left];
      }
      presentationObject.frame.bottom.left.map(data => {
        let text = helpers.objectPropByString(presentationObject, data);
        if (!text) text = data;
        this.frame.bottom.left.push(text);
      });
    } else {
      this.frame.bottom.left = [
        presentationObject.twitter.presenter,
        presentationObject.twitter.event
      ];
    }
    if (presentationObject.frame && presentationObject.frame.bottom && presentationObject.frame.bottom.center) {
      if (!Array.isArray(presentationObject.frame.bottom.center)) {
        presentationObject.frame.bottom.center = [presentationObject.frame.bottom.center];
      }
      presentationObject.frame.bottom.center.map(data => {
        let text = helpers.objectPropByString(presentationObject, data);
        if (!text) text = data;
        this.frame.bottom.center.push(text);
      });
    } else {
      this.frame.bottom.center = [
        presentationObject.company
      ];
    }

    this.currentSlide = 0;
    this.command = "";
    this.errMessage = "";

    process.stdout.on("resize", () => {
      this.renderDeck();
    });

    const rl = readline.createInterface({input: process.stdin});
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.on("keypress", (e, key) => {
      let originalSlide = this.currentSlide;
      if (key.name === "c" && key.ctrl) {
        process.exit();
      }
      if (key.name === "right" || key.name === "down") {
        if(this.activeSlide.isReadyToMoveForward()) {
          this.currentSlide++;
          if (this.currentSlide === this.slides.length) this.currentSlide--;
        } else {
          this.activeSlide.nextStep();
          return;
        }
      }
      if (key.name === "left" || key.name === "up") {
        if (this.activeSlide.isReadyToMoveBackward()) {
          this.currentSlide--;
          if (this.currentSlide === -1) this.currentSlide = 0;
        } else {
          this.activeSlide.previousStep();
          return;
        }
      }

      if (this.activeSlide.hijackIO && originalSlide === this.currentSlide) {
        this.activeSlide.keypress(e, key);
      } else {
        this.renderDeck();
      }
    });
  }

  renderDeck() {
    writer.clearScreen();
    this.renderHeader(this.frame.top);
    this.renderFooter({
      left: {
        line1: this.frame.bottom.left[0],
        line2: this.frame.bottom.left[1]
      },
      right: {
        line1: `[ ${this.currentSlide + 1} / ${this.slides.length} ]`
      },
      center: {
        line1: this.frame.bottom.center[0],
        line2: this.frame.bottom.center[1]
      }
    });
    this.renderCurrentSlide();
  }

  renderCurrentSlide() {
    let activeSlide;
    let slide = this.slides[this.currentSlide];

    switch (slide.type) {
      case "diagram":
        activeSlide = new DiagramSlide(slide);
        break;
      case "list":
        activeSlide = new ListSlide(slide);
        break;
      case "simple":
        activeSlide = new SimpleSlide(slide);
        break;
      case "speaking":
        activeSlide = new SpeakingSlide(slide);
        break;
      case "terminal": 
        activeSlide = new TerminalSlide(slide);
        break;
      case "title": 
        activeSlide = new TitleSlide(slide);
        break;
      case "titleOnly": 
        activeSlide = new TitleOnlySlide(slide);
        break;
      case "code":
        activeSlide = new CodeSlide(slide);
        break;
      case "split":
        activeSlide = new SplitSlide(slide);
        break;
      default:
        activeSlide = new NotFoundSlide(slide);
        break;
    }
    try {
      activeSlide.render();
    } catch(e) {
      console.log(e);
      writer.printCenter("Error rendering slide", writer.getRows()/2);
    }
    if (activeSlide.hideCursorAfterRender) {
      writer.hideCursor();
    }
    this.activeSlide = activeSlide;
  }

  renderHeader(text) {
    text = `[dim][blue]${text}[reset]`;
    writer.printCenter(text, 0);
  }

  renderFooter(options) {
    const left = options.left;
    if (!left.line1) left.line1 = "";
    if (!left.line2) left.line2 = "";
    const right = options.right;
    if (!right.line1) right.line1 = "";
    if (!right.line2) right.line2 = "";
    const center = options.center;
    if (!center.line1) center.line1 = "";
    if (!center.line2) center.line2 = "";

    const lastRow = writer.getRows() - 1;
    const cols = writer.getColumns();

    if(left.line1) left.line1 = `[blue]${left.line1}[reset]`;
    if(left.line2) left.line2 = `[blue]${left.line2}[reset]`;
    if(right.line1) right.line1 = `[blue]${right.line1}[reset]`;
    if(right.line2) right.line2 = `[blue]${right.line2}[reset]`;
    if(center.line1) center.line1 = `[red]${center.line1}[reset]`;
    if(center.line2) center.line2 = `[red]${center.line2}[reset]`;

    if (left.line1.length + center.line1.length + right.line1.length > cols) center.line1 = "";
    if (left.line2.length + center.line2.length + right.line2.length > cols) center.line2 = "";

    writer.printLeft(left.line1, lastRow);
    writer.printLeft(left.line2, lastRow + 1);
    writer.printRight(right.line1, lastRow);
    writer.printRight(right.line2, lastRow + 1);
    writer.printCenter(center.line1, lastRow);
    writer.printCenter(center.line2, lastRow + 1);
  }

  start(startSlide) {
    if(startSlide) this.currentSlide = startSlide - 1;
    this.renderDeck();
  }
}

module.exports = Presentation;