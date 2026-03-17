import { Content } from "./content"
import { Guide } from "./guide"

export class Topic extends Content {
  // TODO
  public imageUrl: string = ""
  public lessons: Lesson[] = []

  firstLesson(): Lesson | undefined {
    return this.lessons[0]
  }
}

export class Lesson {
  constructor(
    public readonly guide: Guide,
    public readonly topic: Topic,
    public readonly number: number
  ) { }
}