export enum OutputContentType {
  Plain = "plain",
  Html = "html",
  Markdown = "markdown"
}

export class Language {
  constructor(
    public readonly name: string,
    public readonly extension: string,
    public readonly testExtension?: string,
    public readonly outputContentType: OutputContentType = OutputContentType.Plain,
    public readonly queriable: boolean = false,
    public readonly triable: boolean = false,
    public readonly statefulConsole: boolean = false
  ) {}

  toEmbeddedResource() {
    return {
      name: this.name,
      extension: this.extension,
      testExtension: this.testExtension
    };
  }
}