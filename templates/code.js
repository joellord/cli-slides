const Slide = require("../slide");
const writer = require("../helpers/writer");
const format = require("../helpers/format");
const components = require("../helpers/components");

class CodeSlide extends Slide {
  constructor(props) {
    super(props);

    if (!this.slide.text) this.slide.text = "";
    if (!this.slide.notes) this.slide.notes = "";
    if (!Array.isArray(this.slide.code)) this.slide.code = [this.slide.code];

    this.codeToBeDisplayed = this.slide.code;

    if(this.slide.multistep) this.multistep = true;
    switch (this.slide.multistepType) {
      case "highlight": 
        this.highlights = [];
        this.slide.code.map(c => c.match(/(\[[a-z]+\]){1,2}[^\[\]]+\[reset\]/g).map(h => this.highlights.push(h)));
        this.steps = this.highlights.length;
        this.codeToBeDisplayed = this.slide.code.map(c => format.stripStyling(c));
        break;
      case "line":
        this.steps = this.slide.code.length;
        this.codeToBeDisplayed = [];
        break;
    }
  }

  renderNextStep() {
    switch (this.slide.multistepType) {
      case "highlight": 
        let styledCode = this.slide.code.map(c => format.stripStyling(c));
        let currentHighlight = this.highlights[this.currentStep-1];
        styledCode = styledCode.map(c => c.replace(format.stripStyling(currentHighlight), currentHighlight))
        this.codeToBeDisplayed = styledCode;
        break;
      case "line":
        this.codeToBeDisplayed.push(this.slide.code[this.currentStep-1]);
        break;
    }
    
    this.render();
  }

  renderPreviousStep() {
    if (this.currentStep == 0) {
      this.codeToBeDisplayed = this.slide.code.map(c => format.stripStyling(c));
      this.render();
    } else {
      let styledCode = this.slide.code.map(c => format.stripStyling(c));
      let currentHighlight = this.highlights[this.currentStep-1];
      styledCode = styledCode.map(c => c.replace(format.stripStyling(currentHighlight), currentHighlight))
      this.codeToBeDisplayed = styledCode;
      this.render();
    }
  }

  render() {
    const rows = writer.getRows();
    const cols = writer.getColumns();
    const title = components.title(this.slide.title);
    writer.printCenter(title, rows / 2 - 6);
    let text = format.splitText(this.slide.text);
    text.map((t, index) => writer.printCenter(t, rows / 2 - (4 - index)));

    let boxX = 3;
    let boxY = Math.floor(rows/2);
    let boxWidth = cols - boxX*2;
    let boxHeight = ((this.slide.multistep && this.slide.multistepType === "line") ? this.slide.code.length : this.codeToBeDisplayed.length) + 2;
    writer.box(boxX, boxY, boxWidth, boxHeight);
    this.codeToBeDisplayed.map((c, index) => {
      writer.printLeft(c, boxY + 1 + index, boxX + 2);
    });

    if (this.slide.notes) {
      let notesArray = format.splitText(this.slide.notes, boxWidth - 2);
      notesArray.map((n, index) => {
        writer.printCenter(n, boxY + boxHeight + 2 + index);
      });
    }
  }
}

module.exports = CodeSlide;