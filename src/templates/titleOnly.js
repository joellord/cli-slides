const Slide = require("../slide");
const writer = require("../helpers/writer");
const components = require("../helpers/components");

class TitleOnlySlide extends Slide {
  render() {
    const rows = writer.getRows();
    const text = components.sectionTitle(this.slide.title);
    writer.printCenter(text, rows / 2 -2);
  }
}

module.exports = TitleOnlySlide;