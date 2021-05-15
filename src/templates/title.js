const Slide = require("../slide");
const writer = require("../helpers/writer");

class TitleSlide extends Slide {
  render() {
    let rows = writer.getRows();
    let text = writer.asciiArtify(this.slide.title);
    text.map((t, index) => {
      writer.printCenter(t, rows/2 - 2 + index);
    });
  }
}

module.exports = TitleSlide;