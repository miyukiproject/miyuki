import { Slug } from "./common"
import { Content } from "./content"
import { Language } from "./language"

export enum GuideType {
  Learning = "learning",
  Practice = "practice"
}

export class Guide extends Content {
  public exercises: Exercise[] = []

  constructor(
    id: number,
    slug: Slug,
    name: string,
    public readonly type: GuideType,
    public language: Language,
    description?: string
  ) {
    super(id, slug, name, description)
  }

  get exercisesCount(): number {
    return this.exercises.length
  }

  firstExercise(): Exercise | undefined {
    return this.exercises[0]
  }

  locateExercise(bibliothecaId: string): Exercise {
    const found = this.exercises.find(e => e.bibliothecaId === bibliothecaId)
    if (!found) {
      throw new Error(`Exercise ${bibliothecaId} not found in guide ${this.slug}`)
    }
    return found
  }

  toExpandedResource(): Record<string, unknown> {
    return {
      ...this.toResource(),
      type: this.type,
      language: this.language.toEmbeddedResource(),
      exercises: this.exercises.map(e => e.toResource())
    }
  }
}

export abstract class Exercise {
  public number!: number

  protected constructor(
    public readonly id: number,
    public readonly bibliothecaId: string,
    public readonly guide: Guide,
    public readonly language: Language,
    public readonly name: string,
    public readonly description: string,
    public readonly hint: string,
    public readonly tagList: string[] = []
  ) { }

  previous(): Exercise | undefined {
    return this.guide.exercises.find(e => e.number === this.number - 1)
  }

  next(): Exercise | undefined {
    return this.guide.exercises.find(e => e.number === this.number + 1)
  }

  searchTags(): string[] {
    return [this.language.name, ...this.tagList]
  }

  toResource(): Record<string, unknown> {
    return {
      id: this.bibliothecaId,
      name: this.name,
      number: this.number,
      type: this.constructor.name.toLowerCase(),
      language: this.language !== this.guide.language
        ? this.language.toEmbeddedResource()
        : undefined
    }
  }

  get descriptionHtml(): string {
    // TODO convert from markdown here
    return this.description ?? ""
  }

  static fromResource(resource: Record<string, unknown>) {
    // TODO import from guide json
  }

  abstract solvable(): boolean
}
