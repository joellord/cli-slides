const title = (text) => {
  let isStyled = !!(text.match(/\[.*\]/g));
  return isStyled ? text : `[magenta]- ${text} -[reset]`;
};

const sectionTitle = (text) => {
  return `[yellow][bright]-= ${text} =-[reset]`;
}

const subtitle = (text) => {
  return text;
}

const text = (text) => {
  return text;
}

const notes = (text) => {
  return `[dim]${text}[reset]`
}

module.exports = {
  sectionTitle,
  title,
  subtitle,
  text,
  notes
}