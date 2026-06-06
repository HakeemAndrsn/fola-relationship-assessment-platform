#!/usr/bin/env node
const { google } = require("googleapis");
const fs = require("fs");

const creds = JSON.parse(
  fs.readFileSync(
    "/Users/fola/.nanobot/workspace/credentials/google-service-account.json",
    "utf-8"
  )
);

const playbook = `FOLA AD COPY PLAYBOOK
The Complete Persuasion System For Agents, Marketers & AI Assistants

Rule #1: Never Sell The Session
Nobody wakes up wanting age regression therapy.
They wake up wanting:
- To stop reacting the way they react
- To finally feel safe in their own body
- To stop repeating the same patterns
- To be free of the thing that keeps tripping them up
- To feel like themselves again
- To sleep through the night
- To be present with the people they love

The session is not the product.
The outcome is the product.

Bad: "Book an age regression therapy session."
Better: "Finally understand why you keep reacting the way you do."
Best: "You've been fighting the same war for years. Your body doesn't know it's over."

THE FOLA VALUE PROPOSITION
FOLA helps individuals and couples uncover the hidden patterns stored in their nervous system — and release what their body has been holding since long before they had words for it.

Core Promise:
"We help you see what you can't see — and release what you've been carrying."

Everything should stem from this idea.

THE 7 PRIMARY AD ANGLES

1. MISDIAGNOSIS
Core Idea: You're solving the wrong problem.

Examples:
- The most expensive personal mistake is misdiagnosis.
- Most people spend years trying to fix symptoms they don't understand.
- You can't heal what you can't name.
- You've been told it's anxiety. It might be something your body has been holding since you were six.

Audience: Professionals, Executives, LinkedIn, High-income individuals
Emotional Trigger: Intelligence

2. PATTERN RECOGNITION
Core Idea: The problem isn't the reaction. It's the cycle.

Examples:
- Same reaction. Different situation.
- You're not having new problems. You're reliving old patterns.
- The outburst isn't the problem. The pattern is.
- You keep attracting the same kind of person. That's not bad luck. That's a blueprint.

Audience: Facebook, Instagram, YouTube
Emotional Trigger: Recognition

3. HIGH ACHIEVERS
Core Idea: You know how to solve problems everywhere except here.

Examples:
- Successful in business. Stuck in your own head?
- You run a company with strategy. Why run your nervous system without one?
- Smart people still have blind spots. Especially about themselves.
- The part of you that can't be fixed by achievement — that's where the real work lives.

Audience: LinkedIn, Professionals, Entrepreneurs
Emotional Trigger: Identity

4. HIDDEN COST
Core Idea: Doing nothing has consequences.

Examples:
- Resentment starts quietly.
- The signs were there. You just didn't know what they meant.
- Most people wait until something breaks.
- The cost of not healing is not just your peace. It's your relationships. Your health. Your capacity to be present.

Audience: Married couples, people in long-term relationships
Emotional Trigger: Loss Aversion

5. PERSONAL MRI
Core Idea: Diagnosis before treatment.

Examples:
- An MRI for your nervous system.
- Before you fix it, understand what's actually running underneath.
- Clarity changes everything.
- You can't navigate what you refuse to name.

Audience: Premium buyers, people ready for deep work
Emotional Trigger: Certainty

6. FUTURE SELF
Core Idea: Build the person you actually want to be.

Examples:
- Freedom tomorrow starts with awareness today.
- Better understanding. Better relationships. Better life.
- Grow beyond the version of yourself that was built for survival.
- Imagine what you could build if you weren't fighting the same war every day.

Audience: Optimistic buyers, growth-oriented individuals
Emotional Trigger: Aspiration

7. RELIEF
Core Idea: The problem has a name. And a solution.

Examples:
- Finally understand what's happening inside you.
- Stop guessing. Start knowing.
- Answers today. Freedom tomorrow.
- You are not broken. Your nervous system is just doing its job. Let us help it stand down.

Audience: Emotionally exhausted individuals
Emotional Trigger: Relief

PLATFORM STRATEGY

FACEBOOK
Purpose: Recognition
Structure: Pain → Recognition → Hope → CTA

Example:
Same reaction. Different situation.
You promised yourself you wouldn't react that way again.
Then somehow you did.
The same frustration. The same shutdown. The same feeling of watching yourself from outside your own body.
The problem isn't you.
It's the pattern your nervous system learned before you had a choice.
Discover what's really running beneath the surface.

INSTAGRAM
Purpose: Emotion
Structure: Big emotional statement → CTA

Examples:
- You love the people in your life. But something feels off inside you.
- The distance between who you are and who you want to be didn't happen overnight.
- Nobody teaches us this.
Short. Visual. Emotional.

LINKEDIN
Purpose: Authority
Structure: Insight → Curiosity → CTA

Example:
The most expensive personal mistake is misdiagnosis.
Most people spend years trying to fix symptoms they don't understand.
FOLA helps you identify what's actually running beneath the surface — and release what your body has been holding.

YOUTUBE
Purpose: Curiosity
Structure: Question → Contrarian insight

Examples:
- Why Smart People Keep Repeating The Same Mistakes
- It's Not Your Personality. It's Your Nervous System.
- Nobody Told You This About Why You React The Way You Do

COPY FORMULA

Step 1: Identify the symptom.
Examples: Anxiety, Overreaction, Numbness, People-pleasing, Exhaustion, Conflict patterns, Shutdown

Step 2: Challenge the assumption.
Examples: It's not laziness. It's not weakness. It's not a character flaw. It's not lack of effort.

Step 3: Reveal the deeper truth.
Examples: It's a nervous system pattern. It's an old survival strategy. It's unresolved activation. It's a blueprint your body learned before you had words.

Step 4: Introduce FOLA.
FOLA helps you discover what's really running beneath the surface — and release it.

Step 5: Call to action.
Get clarity. Book a discovery call. Break the cycle. Start your healing journey.

WORDS WE LOVE
clarity | patterns | beneath the surface | hidden | understand | discover | insight | growth | freedom | breakthrough | nervous system | blueprint | release | awareness | integration | somatic | regulation | window of tolerance | safety | presence | embodiment

WORDS WE AVOID
therapy (as lead word) | counselling | mental illness | diagnosis | disorder | treatment | psychological issues | broken | damaged | crazy

Reason: People buy outcomes. Not interventions.

THE GOLDEN RULE
Every piece of FOLA copy should leave the reader thinking:
"That sounds exactly like me."
Not:
"That sounds interesting."

Recognition converts.

CALENDLY LINK REFERENCE
- Discovery Call: https://calendly.com/folasessions/discovery-call
- Initial Session: https://calendly.com/folasessions/art10-initial-za
- Follow Up Session: https://calendly.com/folasessions/age-regression-therapy-session-follow-up
- Breakthrough Session: https://calendly.com/folasessions/the-breakthrough-session
- Built Capacity Protocol: https://calendly.com/folasessions/built-capacity-protocol
- BCP Follow-Up: https://calendly.com/folasessions/progression
- Inner Child Healing Challenge: https://calendly.com/folasessions/the-inner-child-healing-program-5-day-challenge
- Age Regression Therapy (6 Session Package): https://calendly.com/folasessions/immersive-therapy-package

CTA VARIATIONS BY OFFER
- Discovery Call (default): "Book a discovery call"
- Initial Session (ready buyers): "Book your first session"
- Breakthrough Session (stuck buyers): "Book a breakthrough session"
- Inner Child Challenge (curious): "Join the 5-day challenge"
- Immersive Package (committed): "Start your 6-session journey"
`;

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });
  const drive = google.drive({ version: "v3", auth });

  // Create the file in the Ad Creatives folder
  const res = await drive.files.create({
    requestBody: {
      name: "FOLA_Ad_Copy_Playbook",
      mimeType: "application/vnd.google-apps.document",
      parents: ["1zKWuHYCG_ffGIdETBejuo_QoTOY1AQLN"],
    },
    media: {
      mimeType: "text/plain",
      body: playbook,
    },
  });

  console.log("Created: " + res.data.id);
  console.log("URL: https://docs.google.com/document/d/" + res.data.id);
}
main().catch(console.error);
