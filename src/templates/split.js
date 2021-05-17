const Slide = require("../slide");
let writer = require("../helpers/writer");
let components = require("../helpers/components");

class SplitSlide extends Slide {
  render() {
    const rows = writer.getRows();
    const cols = writer.getColumns() / 2;
    
    //Right
    const lengths = this.slide.right.text.map(l => l.length + 2);
    const max = Math.max(...lengths);
    const left = ((cols - max) / 2) + cols;
    const height = this.slide.right.text.length;
    const firstRow = (rows - height) / 2;
    this.slide.right.text.map((i, index) => {
      writer.printLeft(i, firstRow + index, left);
    });

    // Left
    writer.printCenter(components.title(this.slide.left.title), rows/2 - 4, 0, cols);
    if (this.slide.left.text && !this.slide.left.list) this.slide.left.list = [this.slide.left.text];
    const  maxListItemLength = Math.max(...this.slide.left.list.map(l => l.length));
    const leftPad = (cols - maxListItemLength + 2) / 2;
    this.slide.left.list.map((l, index) => {
      writer.printLeft(`* ${l}`, (rows/2)-2 + index, leftPad);
    });
  }
}

module.exports = SplitSlide;