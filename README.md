# Node Presenter
A framework to build slide decks that will run in the terminal. This application will use a JSON file to generate a full slide deck. You can use many of the different templates for the slides or, if you feel adventurous, you can create your own.

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

### Title
Used typically as a presentation title. Will convert the text into ASCII art.
