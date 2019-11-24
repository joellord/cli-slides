# CLI Slides
A framework to build slide decks that will run in the terminal. This application will use a JSON file to generate a full slide deck. You can use many of the different templates for the slides or, if you feel adventurous, you can create your own.

Once you start the presentation tool, it will support hot reloading of you slide deck. This means you can open your presentation, change the JSON file and you should immediately see the changes in your terminal.

## Usage
You can install the cli-slides package from npm and then run it with your presentation .json file.

```
npm install -g cli-slides
cli-slides path/to/presentation.json
```

## JSON File Structure
The slides file uses the following syntax. Those properties are used for the presentation layout (headers and footers).

```
{
  "title": "My New Talk",       // Title of the presentation
  "presenter": "Joel Lord",     // Name of the presenter / author
  "date": "November 25, 2019",  // Date of the event
  "conference": "This Event",   // Conference name
  "location": "Toronto, Canada",// Event location
  "twitter": {                  // Twitter information about the presenter and event
    "presenter": "@joel__lord",
    "event": "#EventHashtag"
  },
  "slides": []                  // An array containing the slide definitions
}

```

## Slide Templates
Many slide templates are available, each one has a slightly different structure.

### Code
A slide template to display code. Code be be displayed as a whole, line by line, or one highlighted section at a time.
```
{
  "type": "code",
  "title": "Slide Title",
  "multistep": true,
  "multistepType": "highlight",
  "text": "Description for this code sample",
  "code": "[reverse]npm install[reset] [reverse]-g[reset] [reverse]./demo.json[reset]",
  "notes": "You can also add footer notes"
}
```

*title*: The title to be displayed on this slide.
*code*: The code snippet to be displayed, will be enclosed in a box. Use an array to display multiple lines of code.
*text*: Description of the code snippet, displayed over the box.
*notes* (optional): Adds some notes at the bottom of the slide.
*multistep* (optional): boolean.

### Diagram
Used to display some text on the left side and some ASCII art on the right side. You're on your own to draw that diagram though.
```
{
  "type": "diagram",
  "title": "Slide Title",
  "diagram": [
    "-----------------------------",
    "|            Box A          |",
    "-----------------------------",
    "               |             ",
    "               v             ",
    "-----------------------------",
    "|            Box B          |",
    "-----------------------------"  ]
}
```

*title*: The title to be displayed on the left side of the slide.
*diagram*: An array of strings to be displayed on the right side

### List

### Simple
A simple slide with a title and some text.

```
{
  "type": "simple",
  "title": "Slide Title",
  "text": "You can use a long string here, text will wrap. Or use \n for multiple lines"
}
```

*title*: The title to be displayed on this slide. 
*text*: Some text to be displayed. Text will be centered and wraps automatically. Supports multiple lines with the \n character

### Speaking

### Split

### Terminal

### Title
Used typically as a presentation title. Will convert the text into ASCII art.

```
{
  "type": "title",
  "title": "Slide Title"
}
```

*title*: The title to be displayed on this slide. Converted into ASCII art

### TitleOnly

## Formatting
All the strings provided to the slides can use the following styling. Note that you should always terminate your string with a _[reset]_ tag.

