declare module 'cli-slides' {
  /** The presentation class that handles the entire presentation */
  class Presentation {
    /** Construct a new presentation given the path to the presentation JSON schema */
    constructor(path: string);
  
    /** Start the presentation, optionally providing a sheet to start at */
    public start(startSheet?: string | number): void;
  }
  
  export = Presentation;
}
