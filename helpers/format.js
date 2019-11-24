function splitLine(input, size) {
  const LEN = size || 60;
  const words = input.split(" ");
  let current = 0;
  let output = [];
  
  let newLine = "";
  while (current < words.length) {
    while(newLine.length < LEN && current != words.length) {
      if (newLine == "" && actualLength(words[current]) > LEN) {
        newLine = " " + words[current];
        current++;
      }
      if (actualLength(newLine) + actualLength(words[current]) > LEN) {
        break;
      }
      newLine += " " + words[current];
      current++;
    }
    output.push(newLine.substr(1));
    newLine = "";
  }
  return output;
}

function actualLength(text) {
  return stripStyling(text).length;
}

function stripStyling(text) {
  return text.replace(/\[[a-z]*\]/g, "");
}

function splitText(text, size) {
  let lines = text.split("\n");

  let finalText = [];
  for (let i = 0; i < lines.length; i++) {
    let l = splitLine(lines[i], size)
    l.map(i => finalText.push(i));
  }
  
  return finalText;
}

module.exports = {
  splitText,
  actualLength,
  stripStyling
};