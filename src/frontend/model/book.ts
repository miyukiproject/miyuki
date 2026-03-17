import { Topic } from "./topic";
import { Content } from "./content"

export class Book extends Content {
  public chapters: Chapter[] = []

  firstChapter(): Chapter | undefined {
    return this.chapters[0]
  }
}

export class Chapter {
  constructor(
    public readonly topic: Topic,
    public readonly book: Book,
    public readonly number: number
  ) { }
}