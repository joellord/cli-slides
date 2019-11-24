const writer = require("./helpers/writer");

class Slide {
  constructor(slide) {
    this.slide = slide;
    
    this.hideCursorAfterRender = true;
    this.hijackIO = false;
    this.multistep = false;
    this.currentStep = 0;
    this.steps = 0;

    if (slide.cols) {
      writer.getColumns = () => slide.cols;
    }

    if (slide.rows) {
      writer.getRows = () => slide.rows;
    }
  }

  isReadyToMoveForward() {
    if (!this.multistep) return true;
    if (this.currentStep >= this.steps) return true;
    return false;
  }

  isReadyToMoveBackward() {
    if (!this.multistep) return true;
    if (this.currentStep <= 0) return true;
    return false;
  }

  nextStep() {
    this.currentStep = this.currentStep + 1;
    this.renderNextStep();
  }

  previousStep() {
    this.currentStep = this.currentStep - 1;
    this.renderPreviousStep();
  }

  renderNextStep() {
    writer.printCenter("Renders the next step (" + this.currentStep + ")", 10);
  }

  renderPreviousStep() {
    writer.printCenter("Renders the previous step (" + this.currentStep + ")", 10);
  }

  render() {
    writer.write("This render is meant to be overridden");
  }
}

module.exports = Slide;