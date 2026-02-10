export const TRAUMA_QUESTIONS = [
  { id: "hypervigilance", label: "I often feel on edge or hyper-alert in my relationship" },
  { id: "withdrawal", label: "I tend to shut down or withdraw during conflict" },
  { id: "trust", label: "I find it difficult to fully trust my partner" },
  { id: "emotional_flooding", label: "I experience intense emotional reactions that feel disproportionate" },
  { id: "abandonment", label: "I fear being abandoned or rejected by my partner" },
];

export const ADHD_QUESTIONS = [
  { id: "focus", label: "I struggle to stay focused during important conversations" },
  { id: "forgetfulness", label: "I frequently forget commitments, dates, or things my partner told me" },
  { id: "overwhelm", label: "I feel overwhelmed by household or shared responsibilities" },
  { id: "impulsivity", label: "I sometimes say or do things impulsively that I later regret" },
  { id: "time_management", label: "I have difficulty managing my time, which affects our plans" },
];

export const VALUES_QUESTIONS = [
  { id: "financial", label: "Financial philosophy", description: "0 = Prioritise security & saving | 10 = Prioritise freedom & experiences" },
  { id: "spiritual", label: "Spiritual/religious alignment", description: "0 = Faith is deeply central | 10 = Spirituality is personal & flexible" },
  { id: "family", label: "Children & family planning", description: "0 = Traditional family structure | 10 = Non-traditional / child-free" },
  { id: "goals", label: "Life goals & ambition", description: "0 = Stability & contentment | 10 = Growth & achievement" },
  { id: "intimacy", label: "Emotional & physical connection", description: "0 = Quality time & words | 10 = Physical touch & shared activities" },
];

export const COMMUNICATION_QUESTIONS = [
  { id: "conflict_style", label: "During disagreements, I tend to escalate rather than de-escalate" },
  { id: "active_listening", label: "I find it hard to truly listen without planning my response" },
  { id: "emotional_expression", label: "I struggle to express my feelings clearly to my partner" },
  { id: "repair_attempts", label: "After a conflict, I find it difficult to initiate repair or reconciliation" },
];

export const FUTURE_VISION_QUESTIONS = [
  { id: "five_year", label: "My 5-year vision aligns with my partner's", description: "0 = Very different visions | 10 = Completely aligned" },
  { id: "lifestyle", label: "Our ideal lifestyle preferences match", description: "0 = Very different preferences | 10 = Very similar" },
  { id: "career", label: "We support each other's career aspirations equally", description: "0 = Significant tension | 10 = Full mutual support" },
  { id: "location", label: "We agree on where we want to live long-term", description: "0 = Major disagreement | 10 = Fully aligned" },
];

export const ATTACHMENT_OPTIONS = [
  { value: "secure" as const, label: "Secure", description: "I feel comfortable with closeness and can depend on my partner" },
  { value: "anxious" as const, label: "Anxious", description: "I crave closeness but often worry my partner doesn't feel the same" },
  { value: "avoidant" as const, label: "Avoidant", description: "I value independence and sometimes feel suffocated by too much closeness" },
  { value: "disorganized" as const, label: "Disorganized", description: "I want closeness but also fear it; my feelings often feel contradictory" },
];

export const CHANGE_READINESS_OPTIONS = [
  { value: "precontemplation" as const, label: "Not Yet Considering Change", description: "I'm not sure there's a problem or that change is needed" },
  { value: "contemplation" as const, label: "Thinking About Change", description: "I recognize there may be issues and I'm considering what to do" },
  { value: "preparation" as const, label: "Preparing to Change", description: "I've decided to work on things and I'm getting ready to take action" },
  { value: "action" as const, label: "Actively Working on Change", description: "I'm already taking steps to improve our relationship" },
];
