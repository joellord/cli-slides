const Slide = require("../slide");
let writer = require("../helpers/writer");

class DiagramSlide extends Slide {
  render() {
    const rows = writer.getRows();
    const cols = writer.getColumns() / 2;
    writer.moveCursor((cols - this.slide.title.length)/2, rows/2 - 2);
    writer.write(this.slide.title);
    
    const lengths = this.slide.diagram.map(l => l.length + 2);
    const max = Math.max(...lengths);
    const left = ((cols - max) / 2) + cols;
    this.slide.diagram.map((i, index) => {
      writer.printLeft(i, index + 5, left);
    });
  }
}

module.exports = DiagramSlide;