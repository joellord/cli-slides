<div align="center">

# CLI Slides

**Your slidedeck inside your terminal**

[![GitHub](https://img.shields.io/static/v1?color=green&label=license&logo=github&message=ICS)](https://github.com/joellord/cli-slides/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/cli-slides?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/cli-slides)

</div>

---

**_Table of Contents_**

- [CLI Slides](#cli-slides)
  - [About](#about)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Starting through JavaScript](#starting-through-javascript)
  - [JSON File Structure](#json-file-structure)
    - [JSON Schema](#json-schema)
    - [Frame metadata](#frame-metadata)
    - [Slide Templates](#slide-templates)
      - [Code](#code)
      - [Diagram](#diagram)
      - [List](#list)
      - [Simple](#simple)
      - [Speaking](#speaking)
      - [Split](#split)
      - [Terminal](#terminal)
      - [Title](#title)
      - [TitleOnly](#titleonly)
  - [Formatting](#formatting)

## About

CLI Slides is a framework to build slide decks that will run in the terminal. This application will use a JSON file to generate a full slide deck. You can use many of the different templates for the slides - or, if you feel adventurous, you can even create your own.

Once you start the presentation tool, it comes with hot reloading for your slide deck, so you can change the JSON file and preview your changes on the fly.

## Installation

Install the package with your package manager of choice:

```sh
npm install cli-slides
yarn add cli-slides
pnpm add cli-slides
```

Or install it globally so you can access it anywhere:

```sh
npm install -g cli-slides
yarn global add cli-slides
pnpm add --global cli-slides
```

## Usage

After installing `cli-slides` you can start your slidedeck by passing it the slidedeck JSON file as the first argument, like so:

```sh
cli-slides path/to/presentation.json
```

Optionally, you can also provide a second argument to directly jump to the slide with the specified index (starting from 1):

```sh
cli-slides path/to/presentation.json 2
# This will jump to the second item in the slides array
```

### Starting through JavaScript

If you would prefer to start your presentation through JavaScript, for example if you want to be able to call `node start-slides.js`, then you can create a script like this:

```js
const Presentation = require("cli-slides");
const { join } = require("path");

const startSheet = process.argv?.[2] ?? 1;
const slidedeckFile = join(__dirname, "presentation.json");

let presentation = new Presentation(slidedeckFile);

presentation.start(startSheet);
```

Or when using ESM:

```js
import Presentation from "cli-slides";
import { fileURLToPath, URL } from "node:url";

const startSheet = process.argv?.[2] ?? 1;
const slidedeckFile = new URL("presentation.json", import.meta.url);

let presentation = new Presentation(fileURLToPath(slidedeckFile));

presentation.start(startSheet);
```

## JSON File Structure

The slides file uses the following syntax. Those properties are used for the presentation layout (headers and footers).

```jsonc
{
  "title": "My New Talk", // Title of the presentation
  "presenter": "Joel Lord", // Name of the presenter / author
  "date": "November 25, 2019", // Date of the event
  "conference": "This Event", // Conference name
  "company": "MongoDB", // Company / Organization
  "location": "Ottawa, Canada", // Event location
  "twitter": {
    // Twitter information about the presenter and event
    "presenter": "@joel__lord",
    "event": "#EventHashtag"
  },
  "frame": {
    // This object is optional
    "top": {
      "center": "title" // Text displayed at the top
    },
    "bottom": {
      // Text displayed at the bottom (see frame section)
      "left": ["twitter.presenter", "twitter.event"],
      "center": "company"
    },
    // Option colors for the frame, omitted colors will use defaults
    "colors": {
      // Colors can be a single string or array of strings
      "top": ["dim", "red"],
      "bottom": {
        "left": "blue",
        "center": "green",
        "right": ["blink", "yellow"]
      }
    }
  },
  "slides": [] // An array containing the slide definitions
}
```

### JSON Schema

A JSON schema is available at [`assets/json-schema.json`](assets/json-schema.json). You can use it in your JSON like so:

```json
{
  "$schema": "https://raw.githubusercontent.com/joellord/cli-slides/master/assets/json-schema.json"
}
```

### Frame metadata

You can specify content to display centered at the top with the `frame.top.center` property. First, `cli-slides` will attempt to find a property matching the value you set, but if one doesn't exist, it will display the specified text.

You can also customize the bottom part. The bottom section takes up to two lines. The `frame.bottom.left` and `frame.bottom.center` properties both take a string (for a single line) or an array of strings (if you need two lines). The strings can either be the property to display in the deck definition file or some text to be displayed.

### Slide Templates

Many slide templates are available, each one has a slightly different structure.

#### Code

A slide template to display code. Code be be displayed as a whole, line by line, or one highlighted section at a time.

```json
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

- `title`: The title to be displayed on this slide.
- `code`: The code snippet to be displayed inside of a code block. Use an array to display multiple lines of code.
- `text`: Description of the code snippet, displayed over the box.
- `notes` (optional): Adds some notes at the bottom of the slide.
- `multistep` (optional): A boolean to toggle multistep mode.
- `multistepType` (optional): This can take two values; "line", or "highlight". "line" displays one line at a time, "highlight" displays one highlighted item at a time.

#### Diagram

Used to display some text on the left side and some ASCII art on the right side. Drawing the diagram is your responsibility, though - there are none provided with `cli-slides`.

```json
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
    "-----------------------------"
  ]
}
```

- `title`: The title to be displayed on the left side of the slide.
- `diagram`: An array of strings to be displayed as lines of ASCII art on the right of the slide.

#### List

A list of items. Items can either be displayed one at a time, or all at once.

```json
{
  "type": "list",
  "title": "Title of the slide",
  "multistep": true,
  "list": ["Item number 1", "Item number 2", "Item number 3"]
}
```

- `title`: The title to be displayed on this slide.
- `multistep`: When set to true, the items will be displayed on my one.
- `list`: The list of items to be displayed on this slide.

#### Simple

A simple slide with a title and some text.

```json
{
  "type": "simple",
  "title": "Slide Title",
  "text": "You can use a long string here, text will wrap. Or use \n for multiple lines"
}
```

- `title`: The title to be displayed on this slide.
- `text`: Some text to be displayed. Text will be centred and wraps automatically. Supports multiple lines with a newline escape (`\n`).

#### Speaking

Shows a fun little ASCII character and some text in a bubble.

```json
{
  "type": "speaking",
  "character": "over-cubbie",
  "text": "Hey there!"
}
```

- `character`: The preset ASCII character to display
  - `over-cubbie` Someone looking over a wall
  - `me`: A man smiling
  - `me-oh-no`: The same as `me`, but with closed eyes and open mouth
  - `silly-face`: A face with a confused look
  - `scream`: The scream emoji converted to ASCII art
- `text`: Text to be displayed next to the character in a speech bubble

#### Split

If you need a 2 column template, you can use this one. For now, it's restricted to a list on the left side and some text on the right side.

```json
{
  "type": "split",
  "left": {
    "title": "Left Side Title",
    "list": ["Item 1", "Item 2", "Item 3"]
  },
  "right": {
    "text": ["You can put some text here", "or maybe a diagram", "", "Sky's the limit"]
  }
}
```

- `left`: Component on the left side
  - `title`: Title to be displayed on the left
  - `list`: Array of items to be displayed
- `right`: Component on the right side
  - `text`: Text to be displayed on the right side

#### Terminal

The famous terminal-in-a-terminal! ~~(obligatory inception joke goes here)~~
_Note: The terminal does not support interactive commands and will only display the final output._

```json
{
  "type": "terminal",
  "title": "Terminal Inside The Terminal",
  "text": "You can run some shell commands here. Try 'ls'."
}
```

- `title`: Title at the top of the slide
- `text`: (optional): Text displayed over the terminal

#### Title

Used typically as a presentation title. Will convert the text into ASCII art.

```json
{
  "type": "title",
  "title": "Slide Title"
}
```

- `title`: The title to be displayed on this slide. Converted into ASCII art. Letters only.

#### TitleOnly

Just a title slide, typically used as a section separator.

```json
{
  "type": "titleOnly",
  "title": "New Section"
}
```

- `title`: The title to be displayed on this slide.

## Formatting

All the strings provided to the slides can use the following styling. Note that you should always terminate your string with a `[reset]` tag.

- `[bright]`
- `[dim]`
- `[underscore]`
- `[blink]` (limited support)
- `[reverse]`
- `[hidden]`
- `[black]`
- `[red]`
- `[green]`
- `[yellow]`
- `[blue]`
- `[magenta]`
- `[cyan]`
- `[white]`
- `[bgblack]`
- `[bgred]`
- `[bggreen]`
- `[bgyellow]`
- `[bgblue]`
- `[bgmagenta]`
- `[bgcyan]`
- `[bgwhite]`
