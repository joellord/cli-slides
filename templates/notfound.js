const Slide = require("../slide");
const writer = require("../helpers/writer");

class NotFoundSlide extends Slide {
  render() {
    writer.printCenter(`No renderer found for ${this.slide.type}`, writer.getRows() / 2 - 4);
  }
}

module.exports = NotFoundSlide;