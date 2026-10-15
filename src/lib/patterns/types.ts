export type FamilyId = "inward-blade" | "storm-maker" | "story-spinner";

export interface Family {
  id: FamilyId;
  name: string;
  essence: string;
  mailerliteFieldValue: string;
}

export interface GuardItem {
  id: string;
  prompt: string;
}

export interface Guard {
  id: string;
  name: string;
  familyId: FamilyId;
  frame: string;
  description: string;
  items: [GuardItem, GuardItem, GuardItem];
}

/** guardId -> item index (0-2) -> 0-4 response, or undefined if unanswered */
export type Answers = Record<string, (number | undefined)[]>;

export interface ShuffledItem {
  guardId: string;
  itemIndex: number;
  item: GuardItem;
}

export interface GuardScore {
  guardId: string;
  score: number;
  maxSingleItem: number;
}

export interface ScoredGuard extends GuardScore {
  guard: Guard;
}

export interface PatternResult {
  topGuards: [ScoredGuard, ScoredGuard, ScoredGuard];
  family: Family;
}
