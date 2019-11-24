const Slide = require("../slide");
const writer = require("../helpers/writer");
const format = require("../helpers/format");
const components = require("../helpers/components");

class ListSlide extends Slide {
  constructor(props) {
    super(props);

    this.multistep = true;
    this.steps = this.slide.list.length;
    this.listToBeDisplayed = [];
  }

  renderNextStep() {
    this.listToBeDisplayed.push(this.slide.list[this.currentStep-1]);
    this.render();
  }

  renderPreviousStep() {
    this.listToBeDisplayed.pop();
    writer.clearLine();
    this.render();
  }

  render() {
    const rows = writer.getRows();
    const cols = writer.getColumns();
    const subtitlePresent = !!(this.slide.subtitle);
    const title = components.title(this.slide.title);
    writer.printCenter(title, rows / 2 - 4 - (subtitlePresent ? 2 : 0));
    if (subtitlePresent) writer.printCenter(this.slide.subtitle, rows/2 - 4);
    
    const lengths = this.slide.list.map(l => format.actualLength(l) + 2);
    const max = Math.max(...lengths);
    const left = (cols - max) / 2;
    this.listToBeDisplayed.map((i, index) => {
      writer.printLeft(`* ${i}`, rows / 2 - (2 - index), left);
    });
  }
}

module.exports = ListSlide;