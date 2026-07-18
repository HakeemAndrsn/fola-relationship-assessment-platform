import type { Family, FamilyId, Guard } from "./types";

// Canonical order below is also the tie-break order (brief §5, §6).
export const FAMILIES: Record<FamilyId, Family> = {
  "inward-blade": {
    id: "inward-blade",
    name: "The Inward Blade",
    essence: "Every wound points inward: “I am the problem.”",
    mailerliteFieldValue: "Inward Blade",
  },
  "storm-maker": {
    id: "storm-maker",
    name: "The Storm Maker",
    essence: "Every crack becomes a collapse: “It's already over.”",
    mailerliteFieldValue: "Storm Maker",
  },
  "story-spinner": {
    id: "story-spinner",
    name: "The Story Spinner",
    essence: "In love with the story, not the person: “I know what this means.”",
    mailerliteFieldValue: "Story Spinner",
  },
};

export const GUARDS: Guard[] = [
  {
    id: "personalisation",
    name: "Personalisation",
    familyId: "inward-blade",
    frame: "When something goes wrong between us, it must be my fault.",
    description: "Carrying blame that was never yours to hold.",
    items: [
      { id: "personalisation-1", prompt: "When my partner is in a bad mood, I assume I caused it." },
      { id: "personalisation-2", prompt: "If a relationship fails, I carry all of the blame." },
      { id: "personalisation-3", prompt: "When there's tension at home, my first thought is what I did wrong." },
    ],
  },
  {
    id: "labelling",
    name: "Labelling",
    familyId: "inward-blade",
    frame: "One mistake becomes who I am.",
    description: "Turning one moment into a life sentence.",
    items: [
      { id: "labelling-1", prompt: "When I get something wrong in my relationship, I call myself names — stupid, broken, too much." },
      { id: "labelling-2", prompt: "I describe myself in permanent terms: ‘I'm just bad at love.’" },
      { id: "labelling-3", prompt: "One selfish moment and I decide my partner is a selfish person." },
    ],
  },
  {
    id: "should-statements",
    name: "Should Statements",
    familyId: "inward-blade",
    frame: "Love has rules, and breaking them is failure.",
    description: "Grading love against a rulebook nobody agreed to.",
    items: [
      { id: "should-statements-1", prompt: "I have strict rules about what a good partner should always do." },
      { id: "should-statements-2", prompt: "I beat myself up with ‘I should have known better.’" },
      { id: "should-statements-3", prompt: "When my partner doesn't act the way they should, I struggle to let it go." },
    ],
  },
  {
    id: "discounting-the-positive",
    name: "Discounting the Positive",
    familyId: "inward-blade",
    frame: "The good moments don't count.",
    description: "Refusing to let the good moments count.",
    items: [
      { id: "discounting-the-positive-1", prompt: "When my partner compliments me, I brush it off or don't believe it." },
      { id: "discounting-the-positive-2", prompt: "A week of good days is erased by one bad evening." },
      { id: "discounting-the-positive-3", prompt: "When things are going well between us, I tell myself it doesn't really count." },
    ],
  },
  {
    id: "catastrophising",
    name: "Catastrophising",
    familyId: "storm-maker",
    frame: "A crack means the roof is coming down.",
    description: "Treating a small crack like a collapsed roof.",
    items: [
      { id: "catastrophising-1", prompt: "When we argue, part of me is already picturing the breakup." },
      { id: "catastrophising-2", prompt: "A small problem in my relationship quickly feels like the end of everything." },
      { id: "catastrophising-3", prompt: "When my partner is late or unreachable, my mind goes to the worst-case scenario." },
    ],
  },
  {
    id: "all-or-nothing",
    name: "All-or-Nothing",
    familyId: "storm-maker",
    frame: "It's perfect or it's ruined.",
    description: "Perfect or ruined, with nothing in between.",
    items: [
      { id: "all-or-nothing-1", prompt: "If my relationship isn't going perfectly, I feel like it's failing." },
      { id: "all-or-nothing-2", prompt: "People are either completely trustworthy or not at all." },
      { id: "all-or-nothing-3", prompt: "One bad day makes me question the whole relationship." },
    ],
  },
  {
    id: "fortune-telling",
    name: "Fortune Telling",
    familyId: "storm-maker",
    frame: "I already know how this ends.",
    description: "Ending the story before it's written.",
    items: [
      { id: "fortune-telling-1", prompt: "I predict my relationships will fail before there's any real sign of trouble." },
      { id: "fortune-telling-2", prompt: "I don't raise issues with my partner because I already know how they'll respond." },
      { id: "fortune-telling-3", prompt: "I hold back in love because I'm sure I'll be left eventually." },
    ],
  },
  {
    id: "magnification",
    name: "Magnification",
    familyId: "storm-maker",
    frame: "Small things grow huge in my hands.",
    description: "Growing small things until they block the sun.",
    items: [
      { id: "magnification-1", prompt: "I replay small relationship mistakes for days." },
      { id: "magnification-2", prompt: "A minor comment from my partner can occupy my mind all week." },
      { id: "magnification-3", prompt: "I treat my partner's small flaws as much bigger than the same flaws in others." },
    ],
  },
  {
    id: "mind-reading",
    name: "Mind Reading",
    familyId: "story-spinner",
    frame: "I know what they're thinking, and it's bad.",
    description: "Deciding what they think of you without evidence.",
    items: [
      { id: "mind-reading-1", prompt: "When my partner goes quiet, I assume I've done something wrong." },
      { id: "mind-reading-2", prompt: "I decide what my partner thinks of me without asking them." },
      { id: "mind-reading-3", prompt: "I react to what I believe my partner meant, not what they actually said." },
    ],
  },
  {
    id: "emotional-reasoning",
    name: "Emotional Reasoning",
    familyId: "story-spinner",
    frame: "If I feel it, it must be true.",
    description: "If it feels true, it must be true.",
    items: [
      { id: "emotional-reasoning-1", prompt: "If I feel unloved, I take it as proof that I am unloved." },
      { id: "emotional-reasoning-2", prompt: "When I feel jealous, I treat the jealousy as evidence something is going on." },
      { id: "emotional-reasoning-3", prompt: "My feelings about the relationship count as facts to me, even without evidence." },
    ],
  },
  {
    id: "mental-filter",
    name: "Mental Filter",
    familyId: "story-spinner",
    frame: "I see the one dark thread in the whole cloth.",
    description: "Seeing only the one dark thread in the whole cloth.",
    items: [
      { id: "mental-filter-1", prompt: "After a good evening together, I fixate on the one moment that went wrong." },
      { id: "mental-filter-2", prompt: "I remember the criticisms in my relationship far more vividly than the affection." },
      { id: "mental-filter-3", prompt: "When I think about my partner, the flaws come to mind before anything else." },
    ],
  },
  {
    id: "overgeneralisation",
    name: "Overgeneralisation",
    familyId: "story-spinner",
    frame: "It happened once, so it always happens.",
    description: "Turning one wound into a law of nature.",
    items: [
      { id: "overgeneralisation-1", prompt: "When my partner lets me down once, I hear myself say ‘you always do this.’" },
      { id: "overgeneralisation-2", prompt: "One rejection convinces me that nobody stays." },
      { id: "overgeneralisation-3", prompt: "I carry conclusions from old relationships into this one as if they're laws." },
    ],
  },
];

export const GUARD_ORDER: string[] = GUARDS.map((g) => g.id);

export const GUARD_BY_ID: Record<string, Guard> = Object.fromEntries(
  GUARDS.map((g) => [g.id, g])
);

export const RESPONSE_SCALE = [
  { value: 0, label: "Never" },
  { value: 1, label: "Rarely" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Almost always" },
] as const;
