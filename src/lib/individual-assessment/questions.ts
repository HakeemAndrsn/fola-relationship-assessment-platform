// ── FOLA Individual Growth Assessment — Question Bank ──

export const ATTACHMENT_OPTIONS = [
  {
    value: "secure",
    label: "Secure",
    description: "I feel comfortable with closeness and interdependence. I trust that people I love won't abandon me.",
  },
  {
    value: "anxious",
    label: "Anxious / Preoccupied",
    description: "I crave closeness but often worry that others don't value me as much as I value them.",
  },
  {
    value: "avoidant",
    label: "Avoidant / Dismissing",
    description: "I value independence highly. Closeness often feels uncomfortable and I tend to self-rely.",
  },
  {
    value: "disorganized",
    label: "Disorganized / Fearful",
    description: "I want closeness but it also frightens me. I can feel confused or overwhelmed in intimate situations.",
  },
];

export const LOVE_LANGUAGE_OPTIONS = [
  { value: "words", label: "Words of Affirmation", description: "Verbal praise, encouragement, and appreciation matter most to me." },
  { value: "acts", label: "Acts of Service", description: "Actions — helping, doing — speak louder than any words." },
  { value: "gifts", label: "Receiving Gifts", description: "Thoughtful gestures and tokens of affection communicate love to me." },
  { value: "time", label: "Quality Time", description: "Undivided attention and shared experiences are how I feel loved." },
  { value: "touch", label: "Physical Touch", description: "Physical connection — hugs, affection, presence — is my primary love language." },
];

export const CHANGE_READINESS_OPTIONS = [
  { value: "precontemplation", label: "Not Ready Yet", description: "I'm not sure I need to change anything right now." },
  { value: "contemplation", label: "Thinking About It", description: "I can see that change might be beneficial, but I haven't committed yet." },
  { value: "preparation", label: "Getting Ready", description: "I'm actively planning to make changes and gathering resources." },
  { value: "action", label: "Ready to Act", description: "I'm committed and ready to take action immediately." },
];

export const TRAUMA_QUESTIONS = [
  { id: "hypervigilance", label: "Hypervigilance in relationships", description: "I often feel on alert for signs of rejection, criticism, or abandonment — even when things seem fine." },
  { id: "trust_difficulty", label: "Difficulty trusting others", description: "Opening up emotionally or trusting people's intentions feels risky or unsafe." },
  { id: "emotional_shutdown", label: "Emotional shutdown under pressure", description: "When conflict or intensity arises, I tend to go blank, numb, or shut down internally." },
  { id: "past_intrusion", label: "Past experiences bleeding into the present", description: "Old wounds and past relationships frequently influence how I interpret current situations." },
  { id: "body_tension", label: "Body tension during intimacy or conflict", description: "I notice physical tension (chest, stomach, throat) in close or confrontational moments." },
];

export const EMOTIONAL_REGULATION_QUESTIONS = [
  { id: "emotion_awareness", label: "Emotional awareness", description: "I can identify and name what I'm feeling in real time, even under pressure." },
  { id: "self_soothing", label: "Self-soothing capacity", description: "When I'm distressed, I have reliable ways to calm myself without numbing out or exploding." },
  { id: "recovery_speed", label: "Recovery speed after conflict", description: "After a difficult conversation or emotional upset, I bounce back relatively quickly." },
  { id: "emotion_tolerance", label: "Tolerance of difficult emotions", description: "I can sit with discomfort, sadness, or anger without immediately acting out or shutting down." },
  { id: "regulation_under_stress", label: "Regulation under relationship stress", description: "When someone I care about triggers me, I can still access my prefrontal cortex — I don't fully lose it." },
];

export const SELF_WORTH_QUESTIONS = [
  { id: "inherent_value", label: "Sense of inherent worth", description: "My value as a person doesn't depend on my relationship status, achievements, or other people's approval." },
  { id: "self_compassion", label: "Self-compassion when you fail", description: "When I make mistakes, I can hold them with gentleness rather than harsh self-criticism." },
  { id: "boundary_capacity", label: "Capacity to hold boundaries", description: "I can say no, express my needs, and maintain limits without guilt or collapse." },
  { id: "authentic_expression", label: "Authentic self-expression", description: "I feel safe being fully myself — not a performance — in close relationships." },
  { id: "self_respect_choices", label: "Self-respect in relationship choices", description: "My past and current relationship choices reflect a genuine respect for my own wellbeing." },
];

export const RELATIONSHIP_READINESS_QUESTIONS = [
  { id: "emotional_availability", label: "Emotional availability", description: "I have emotional bandwidth and space for another person right now — I'm not depleted or closed off." },
  { id: "past_relationship_processing", label: "Processing of past relationships", description: "I've worked through the significant wounds, grief, or resentment from previous relationships." },
  { id: "independence_security", label: "Security in independence", description: "I can be fully present in a relationship without losing myself or being consumed by it." },
  { id: "vulnerability_readiness", label: "Readiness for vulnerability", description: "I'm willing to be seen — not just the curated version of me, but the uncertain, messy, growing version." },
  { id: "growth_orientation", label: "Growth orientation", description: "I approach relationships as a space for personal evolution, not just comfort or validation." },
];

export const COMMUNICATION_QUESTIONS = [
  { id: "assertive_expression", label: "Assertive self-expression", description: "I can share my needs, feelings, and perspectives clearly without aggression or collapse." },
  { id: "active_listening", label: "Quality of listening", description: "I genuinely listen to understand — not just to respond or defend my position." },
  { id: "conflict_navigation", label: "Conflict navigation", description: "When disagreement arises, I can stay present and curious rather than reactive or shut down." },
  { id: "repair_initiation", label: "Willingness to repair", description: "After a rupture, I take responsibility and initiate reconnection rather than waiting or withdrawing." },
  { id: "non_verbal_awareness", label: "Non-verbal attunement", description: "I'm aware of tone, body language, and the unspoken dimensions of communication." },
];

export const VALUES_CLARITY_QUESTIONS = [
  { id: "values_articulation", label: "Clarity of personal values", description: "I know what I stand for — my non-negotiables, my vision, the life I'm building — and I can articulate it." },
  { id: "values_alignment_behaviour", label: "Living in alignment with values", description: "My daily choices and relationships generally reflect my stated values, not just my impulses." },
  { id: "spiritual_grounding", label: "Spiritual or philosophical grounding", description: "I have a sense of meaning, purpose, or spiritual grounding that anchors me through difficulty." },
  { id: "long_term_vision", label: "Long-term relationship vision", description: "I have a clear picture of the kind of relationship I want to build — its texture, depth, and direction." },
  { id: "dealbreaker_clarity", label: "Clarity about dealbreakers", description: "I know which values are non-negotiable in a partner and which are areas of flexibility." },
];

export const PREJUDICES_BIASES_QUESTIONS = [
  { id: "gender_belief_origin", label: "Awareness of where your beliefs came from", description: "I can trace where my beliefs about the opposite gender originated — family, culture, past relationships, or personal experiences." },
  { id: "projection_awareness", label: "Awareness of projecting onto partners", description: "I recognise when I'm attributing traits or intentions to my partner based on assumptions about their gender rather than who they actually are." },
  { id: "habit_visibility", label: "Visibility of bias-driven habits", description: "I can identify specific habits or behaviours in my relationships that stem from gender-based assumptions rather than the reality of the person I'm with." },
  { id: "relationship_weight", label: "Weight of biases on the relationship", description: "I'm aware of how much tension, misunderstanding, or distance in my relationships is caused by unexamined gender beliefs rather than genuine incompatibility." },
  { id: "consequence_awareness", label: "Awareness of consequences", description: "I can see the real cost of my biases — the arguments that keep repeating, the trust that erodes, the intimacy that never forms because of what I assume." },
  { id: "counter_willingness", label: "Willingness to counter biases", description: "I'm genuinely open to questioning and unlearning the gender-based beliefs I hold, even when they feel true or justified." },
];

export const NEURODIVERGENCE_QUESTIONS = [
  { id: "focus_in_conversation", label: "Sustained focus in conversation", description: "I can stay present and focused during extended conversations without drifting or getting overwhelmed." },
  { id: "emotional_intensity", label: "Emotional intensity awareness", description: "I recognise when my emotional reactions are more intense than the situation seems to warrant." },
  { id: "executive_function", label: "Executive function in daily life", description: "I manage time, commitments, tasks, and responsibilities reliably without significant lapses." },
  { id: "sensory_processing", label: "Sensory or overwhelm sensitivity", description: "I handle sensory input, noise, and social overwhelm in a way that doesn't significantly disrupt my relationships." },
  { id: "rejection_sensitivity", label: "Rejection sensitivity awareness", description: "I'm aware of how I respond to perceived criticism or rejection — and can manage that response." },
];
