import { Exercise, Guide } from "./guide";
import { Language } from "./language";

export abstract class Challenge extends Exercise {
  constructor(
    id: number,
    bibliothecaId: string,
    guide: Guide,
    language: Language,
    name: string,
    description: string,
    hint: string,
    tagList: string[] = [],
    public layout: string
  ) {
    super(
      id,
      bibliothecaId,
      guide,
      language,
      name,
      description,
      hint,
      tagList
    );
  }

  abstract console(): boolean;
}

export class Problem extends Challenge {
  constructor(
    id: number,
    bibliothecaId: string,
    guide: Guide,
    language: Language,
    name: string,
    description: string,
    hint: string,
    tagList: string[] = [],
    layout: string,
    public defaultCode?: string,
    public expectations: string[] = [],
    public test?: string,
    public manualEvaluation: boolean = false
  ) {
    super(
      id,
      bibliothecaId,
      guide,
      language,
      name,
      description,
      hint,
      tagList,
      layout
    );
  }

  console(): boolean {
    return false
  }

  solvable(): boolean {
    return true;
  }

  automatedEvaluation(): boolean {
    return this.expectations.length > 0 || !!this.test;
  }

  evaluationCriteria(): boolean {
    return this.manualEvaluation || this.automatedEvaluation();
  }
}

export class Playground extends Challenge {
  solvable(): boolean {
    return false;
  }

  console(): boolean {
    return true;
  }
}

export class Interactive extends Challenge {
  constructor(
    id: number,
    bibliothecaId: string,
    guide: Guide,
    language: Language,
    name: string,
    description: string,
    hint: string,
    tagList: string[] = [],
    layout: string,
    public goal?: string
  ) {
    super(
      id,
      bibliothecaId,
      guide,
      language,
      name,
      description,
      hint,
      tagList,
      layout
    );
  }

  solvable(): boolean {
    return false;
  }

  console(): boolean {
    return true;
  }
}