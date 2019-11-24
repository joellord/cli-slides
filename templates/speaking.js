const Slide = require("../slide");
const writer = require("../helpers/writer");
const format = require("../helpers/format");

class SpeakingSlide extends Slide {
  render() {
    let character;
    let characterFirstRow = 0;
    let characterLeftPad = 0;
    let bubbleFirstRow = 0;
    let bubbleLeftPad = 0;
    let arrowPointsLeft = true;

    const colsPerSide = writer.getColumns() / 2;

    switch(this.slide.character) {
      case "over-cubbie":
        character = [
          "         ,,,",
          "        (o o)",
          "----oOO--( )--OOo----",
        ];
        characterFirstRow = writer.getRows() - 10;
        characterLeftPad = (colsPerSide - 21) / 2;
        bubbleFirstRow = 6;
        bubbleLeftPad = colsPerSide + 2;
        arrowPointsLeft = true;
        break;
      case "me":
        character = [
          "    .-\"\"\"\"\"-.",
          "    / _____/\\_\\",
          "   //`__   __ \\\\",
          "  //  (o) (o)  \\\\",
          " (_    (___)    _)",
          "   \\  \\_____/  /",
          "    `-._   _.-'",
          "    __.-)_(-,__ ",
          " ./'/   |_|   \\`\\.",
          " /   `\"\"\"\"\"\"\"\"\"\"`  \\"
        ];
        characterFirstRow = 6;
        characterLeftPad = colsPerSide + 4;
        bubbleFirstRow = writer.getRows() - 12;
        bubbleLeftPad = (colsPerSide - 20) / 2;
        arrowPointsLeft = false;
        break;
      case "me-oh-no":
        character = [
          "    .-\"\"\"\"\"-.",
          "    / _____/\\_\\",
          "   //` _    _ \\\\",
          "  //   -   -   \\\\",
          " (_    (___)    _)",
          "   \\     O     /",
          "    `-._   _.-'",
          "    __.-)_(-,__ ",
          " ./'/   |_|   \\`\\.",
          " /   `\"\"\"\"\"\"\"\"\"\"`  \\"
        ];
        characterFirstRow = 6;
        characterLeftPad = colsPerSide + 4;
        bubbleFirstRow = writer.getRows() - 12;
        bubbleLeftPad = (colsPerSide - 20) / 2;
        arrowPointsLeft = false;
        break;
      case "silly-face":
        character = [
          "   ..@@@@@@@..",
          "  .@@@@@@@@@@/@@@@.",
          " @@@@@@@@@@@/@@@@@@@",
          "@@@@@@@@@@@'   '@@@@@",
          "@@@@@@'          `@@@",
          "@@@' .--.   .--.   @@",
          " @  (()__) (_()_)  @",
          "((       / \       ))",
          "  |     (_ _)     |",
          "  \        __.-.  /",
          "   '._ '--'    _.'",
          "      `-------'",
        ];
        characterFirstRow = 10;
        characterLeftPad = (colsPerSide - 21) / 2 + 5;
        bubbleFirstRow = 6;
        bubbleLeftPad = colsPerSide + 2;
        arrowPointsLeft = true;
        break;
      case "scream": 
      character = [
        "           #///////////////%           ",
        "       &///                 ///&       ",
        "     #//                       //&     ",
        "   &//                           //*   ",
        "  #/                              //%  ",
        " #/      //*.,*/      //*.,*/      //* ",
        "*//     /.      /    /*      */     /( ",
        "(/     /,       ,/   /        **     / ",
        "//     /.       /    /,       */     / ",
        "//     */      /      /*     ./      / ",
        "/*/*    */////*,,*#%(*,*/////*     ////",
        "/  */*         *&&&&&&%          */  */",
        "/*    *//*     /&&&&&&&      //*     /*",
        "*/        */   /&&&&&&&   */        */ ",
        " */*        /*./&&&&&&&,./*        //  ",
        "   */*       /..%&&&&&/.*/       //*   ",
        "     //     */,   ,,   .**     */*     ",
        "     //******/////////////******/      "
        ];
      characterFirstRow = 8;
      characterLeftPad = colsPerSide + 4;
      bubbleFirstRow = writer.getRows() - 12;
      bubbleLeftPad = (colsPerSide - 30) / 2;
      arrowPointsLeft = false;
      break;
    }

    let bubbleText = format.splitText(this.slide.text, 30);
    if (bubbleText.length === 1) bubbleText.push("");
    let max = Math.max(...bubbleText.map(t => t.length));
    let bubble = [];
    bubble[0] = "//" + "-".repeat(max + 2) + "\\\\";
    bubbleText.map(t => bubble.push(`| ${t}`.padEnd(max + 4) + " |"));
    bubble.push("\\\\" + "-".repeat(max + 2) + "//");
    if (arrowPointsLeft) {
      bubble.push("      |  /");
      bubble.push("      / /");
      bubble.push("     _/");
    } else {
      bubble[0] += "  /-"
      bubble[1] += "/ /";
      bubble[2] += " / ";
      bubble[3] += "/"
    }

    character.map((l, index) => writer.printLeft(l, characterFirstRow + index, characterLeftPad));
    bubble.map((l, index) => writer.printLeft(l, bubbleFirstRow + index, bubbleLeftPad));
  }
}

module.exports = SpeakingSlide;