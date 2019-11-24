const Slide = require("../slide");
const writer = require("../helpers/writer");
const format = require("../helpers/format");
const components = require("../helpers/components");

class SimpleSlide extends Slide {
  render() {
    const rows = writer.getRows();
    const title = components.title(this.slide.title);
    writer.printCenter(title, rows / 2 - 4);
    let text = format.splitText(this.slide.text);
    text.map((t, index) => writer.printCenter(t, rows / 2 - (2 - index)));
  }
}

module.exports = SimpleSlide;