#!/usr/bin/env node
const { google } = require("googleapis");
const fs = require("fs");

const creds = JSON.parse(
  fs.readFileSync(
    "/Users/fola/.nanobot/workspace/credentials/google-service-account.json",
    "utf-8"
  )
);

const posts = [
  // Week 2 — Mon 16 Jun AM: Clinical Explainer — trauma is stored in the body
  [
    "You can talk about a wound for ten years and still not heal it.\n\nNot because the talking is useless. Because some wounds are not stored in the part of the brain that responds to language.\n\nTrauma is stored in the body. In the nervous system. In the way your shoulders tense when a certain tone of voice enters the room. In the way your chest tightens when someone moves too close too fast. In the way you go quiet, or loud, or numb — before you have even decided to respond.\n\nThis is not a failure of insight. You can understand your pattern perfectly and still be unable to change it in the moment. Because the body does not wait for the mind to catch up.\n\nAt FOLA, we work somatically. We don't just talk about what happened. We help the body release what it has been holding.\n\nBecause the wound lives in the tissue. That's where the healing has to go.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-16"
  ],
  // Week 2 — Mon 16 Jun PM: Emotional Truth-Teller — the cost of being the strong one
  [
    "Someone in your life probably calls you the strong one.\n\nIt sounds like a compliment. It is not always one.\n\nBeing the strong one means you are the person who absorbs. The one who holds everyone else's feelings without having anywhere to put your own. The one who is expected to be okay — not because you are okay, but because if you are not okay, the whole system wobbles.\n\nAnd so you learn to perform okay. You learn to say \"I'm fine\" in a voice that convinces everyone except the person who matters most — you.\n\nThe strong one is not strong. The strong one is the one who has learned that no one is coming to hold them.\n\nAt FOLA, we help people who have been carrying everyone else learn how to put the weight down. Not because you stop caring. Because you deserve to be held too.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-16"
  ],
  // Week 2 — Tue 17 Jun AM: Clinical Framework — attachment styles
  [
    "Your attachment style is not a personality trait. It is a survival blueprint.\n\nIt was built in the first years of your life, before you had language, before you had choice, before you could say \"this is not good for me.\" Your nervous system learned what to expect from relationships based on what it received.\n\nIf care was consistent, you learned that people are safe.\nIf care was unpredictable, you learned to cling or to guard.\nIf care was absent, you learned to need no one — because needing hurt too much.\n\nAnd now, as an adult, you wonder why you keep repeating the same patterns. Why you attract people who confirm what you already believe about love.\n\nYou are not broken. You are following a blueprint that kept you safe once. The problem is the blueprint is outdated.\n\nAt FOLA, we help you rewrite it.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-17"
  ],
  // Week 2 — Tue 17 Jun PM: Practitioner-to-Reader — the gap between knowing and doing
  [
    "The gap between knowing what to do and actually doing it is not a character flaw. It is a neurological gap.\n\nYou can know that your reaction is disproportionate. You can know that your partner is not your parent. You can know that the threat is not real. And still — your body acts as though it is.\n\nThis is not a failure of will. It is a failure of integration. The part of you that knows is not connected to the part of you that reacts.\n\nHealing is the process of closing that gap. Not through more information — you already have enough of that. Through practice. Repetition. The slow, unglamorous work of teaching your nervous system a new response.\n\nAt FOLA, we don't just give you insight. We give you a pathway to embody it.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-17"
  ],
  // Week 2 — Wed 18 Jun AM: Emotional Truth-Teller — anger is not the enemy
  [
    "Most of us were taught that anger is dangerous.\n\nWe were taught to suppress it. To apologise for it. To translate it into something more palatable — frustration, disappointment, exhaustion — because the raw version was too much for the people around us.\n\nBut here's what nobody told you: anger is not the enemy. Anger is a signal.\n\nIt tells you when a boundary has been crossed. When something is not right. When you have been asked to carry something that was never yours to carry.\n\nThe problem is not that you feel anger. The problem is that you were never taught what to do with it.\n\nSuppressed anger does not disappear. It turns into resentment. Into passive aggression. Into the quiet, slow erosion of your health and your relationships.\n\nAt FOLA, we help people learn to be with their anger without being controlled by it. To let it inform without letting it destroy.\n\nBecause anger is not the opposite of peace. Repressed anger is.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-18"
  ],
  // Week 2 — Wed 18 Jun PM: Clinical Explainer — what actually changes in therapy
  [
    "Most people think therapy changes what you think.\n\nIt doesn't. At least not primarily.\n\nTherapy changes what you feel safe enough to do.\n\nYou can know, intellectually, that you are worthy of love. But if your nervous system learned, in the first years of your life, that love is conditional — that it depends on what you achieve, how you perform, how well you manage everyone else's feelings — then knowing your worth will not be enough. Your body will not believe it.\n\nReal change happens when the body learns a new truth. When you have an experience — not just an idea — of being safe, being seen, being held without having to earn it.\n\nThat experience rewires the blueprint.\n\nAt FOLA, we create the conditions for that experience. Not just insight. Integration.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-18"
  ],
  // Week 2 — Thu 19 Jun AM: Practitioner-to-Reader — the loneliness of the healer
  [
    "There is a particular loneliness that comes with being the person everyone comes to for healing.\n\nYou hold space. You carry stories. You sit with pain that other people cannot look at directly. And you do it well — because you have done your own work, because you know the terrain, because you have walked through your own fire.\n\nBut who holds space for you?\n\nThis is not a complaint. It is an observation. The people who heal others often have the most sophisticated survival strategies. They learned early to attend to everyone else's needs because theirs were not being met. They became good at holding because no one held them.\n\nAt FOLA, we believe that healers need healing too. That the person in the room is as important as the method. That your capacity to hold others depends on your willingness to be held.\n\nIf you are a practitioner who has been carrying alone — this is your sign to find your own container.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-19"
  ],
  // Week 2 — Thu 19 Jun PM: Emotional Truth-Teller — grief is not a problem to solve
  [
    "We live in a culture that treats grief as a problem to be solved.\n\nThere is a timeline. There are stages. There is an expectation that after a certain period, you should be moving on, letting go, finding closure.\n\nBut grief is not a problem. Grief is a testimony to love.\n\nThe reason it hurts is because it mattered. The reason you cannot simply \"get over it\" is because the connection was real. Grief is the price of having loved deeply — and it is not a price you pay once. It is a price you pay every time the loss touches something new.\n\nAt FOLA, we don't try to fix grief. We help you carry it. We help you learn to live alongside it without being consumed by it. We help you find the places where joy and grief can coexist.\n\nBecause healing is not about getting over. It is about learning to carry.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-19"
  ],
  // Week 2 — Fri 20 Jun AM: Clinical Framework — the window of tolerance
  [
    "There is a concept in clinical work called the window of tolerance.\n\nIt is the zone in which you can think, feel, and respond without being overwhelmed. When you are inside this window, you can have a difficult conversation without losing your composure. You can hear feedback without collapsing. You can sit with discomfort without needing to escape.\n\nWhen you are outside this window — when your nervous system is hyper-aroused (anxious, reactive, flooded) or hypo-aroused (numb, shut down, dissociated) — you cannot access the parts of your brain that allow you to choose your response.\n\nYou are not choosing to react badly. Your window is just too narrow for what life is asking of you.\n\nThe goal of therapy is not to eliminate triggers. It is to widen the window. So that more of life fits inside it without breaking you.\n\nAt FOLA, we measure and expand the window. Systematically. Clinically. One session at a time.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-20"
  ],
  // Week 2 — Fri 20 Jun PM: Practitioner-to-Reader — the courage to be seen
  [
    "Most of us spend our lives managing how we are perceived.\n\nWe curate. We perform. We show the version of ourselves that is acceptable, successful, together. And we hide the rest — the confusion, the fear, the parts of us that don't have a neat narrative.\n\nThis is exhausting. Not because the performance is hard — though it is. But because the part of you that is hidden never stops knowing it is hidden. And it wants to be seen.\n\nThe courage to be seen is not about oversharing. It is not about performing vulnerability for an audience. It is about the quiet, terrifying decision to let one person — a therapist, a partner, a trusted friend — see what is actually there.\n\nNot the curated version. The real one.\n\nAt FOLA, we create a container where you don't have to perform. Where you can be exactly as messy, as complicated, as unfinished as you are.\n\nAnd that is where the real work begins.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-20"
  ],
  // Week 2 — Sat 21 Jun AM: Personal Optimisation — rest as a strategy
  [
    "The most underrated performance tool is rest.\n\nNot the kind of rest you take when you have earned it. Not the kind you take when you have finished everything on your list. The kind you take because your nervous system needs it — regardless of whether the list is done.\n\nWe have been sold a story that productivity is moral. That rest is a reward for hard work, not a prerequisite for it. That the people who succeed are the ones who push through, who grind, who never stop.\n\nThis is not wisdom. This is a trauma response dressed up as work ethic.\n\nA dysregulated nervous system cannot rest. And a nervous system that cannot rest cannot perform at its highest level. It can survive. It can push. But it cannot create, innovate, or connect in the way that real excellence requires.\n\nAt FOLA, we teach rest as a skill. Not as a luxury. As a strategic intervention.\n\nBecause you cannot outwork a dysregulated nervous system. You can only regulate it.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-21"
  ],
  // Week 2 — Sat 21 Jun PM: Self-Mastery — boundaries as self-respect
  [
    "A boundary is not something you impose on other people. It is something you honour for yourself.\n\nMost of us get this backwards. We think boundaries are about controlling other people's behaviour — telling them what they can and cannot do. And then we wonder why enforcing them feels like a battle.\n\nA boundary is not \"you cannot speak to me that way.\" A boundary is \"if you speak to me that way, I will remove myself from this conversation.\"\n\nOne is an attempt to control. The other is an act of self-respect.\n\nThe difference matters. Because when you understand that boundaries are about your own behaviour — what you will and will not tolerate, what you will and will not participate in — they become something you can hold without needing anyone else's cooperation.\n\nAt FOLA, we help people build boundaries from the inside out. Not as walls. As the shape of a life you are no longer willing to betray.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-21"
  ],
  // Week 2 — Sun 22 Jun AM: Why FOLA — the philosophy
  [
    "FOLA exists because I believe that healing should not be a luxury.\n\nIt should not require you to already understand the language. It should not require you to have a certain income, a certain level of insight, a certain tolerance for ambiguity. It should meet you where you are.\n\nThat is why we built the LoveBETTER Assessment — to give couples a clinical starting point without requiring them to commit to months of therapy before they know what they are dealing with.\n\nThat is why we offer single sessions alongside packages — because not everyone knows what they need yet.\n\nThat is why we are building content that does not assume you already speak the language of therapy — because most people don't.\n\nFOLA is not a practice that serves people who already understand healing. It is a practice that makes healing accessible to people who are still wondering if it is for them.\n\nIf you have been wondering — it is.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-22"
  ],
  // Week 2 — Sun 22 Jun PM: Closing the week — consistency over intensity
  [
    "Here is what I have learned from watching people heal:\n\nConsistency matters more than intensity.\n\nThe people who transform are not the ones who have the most dramatic breakthroughs. They are the ones who keep showing up. Who do the small, unglamorous work on the days when nothing seems to be moving. Who trust the process even when they cannot see the results.\n\nHealing is not a sprint. It is not even a marathon. It is a long, slow, repetitive practice of choosing yourself — over and over, in ways that no one else will ever see.\n\nAnd then one day, you realise you are not the same person who started.\n\nNot because of one big moment. Because of thousands of small ones.\n\nAt FOLA, we are building a practice that honours both the big moments and the small ones. The breakthroughs and the Tuesday afternoons when all you did was show up.\n\nIf you are ready to start showing up for yourself — we are here.\n\nBook a discovery call: https://calendly.com/folasessions/discovery-call",
    "",
    "",
    "pending",
    "2026-06-22"
  ]
];

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: "19rwiMCwlUJym2h_3jB9Fx1XdjJAwxvFm-ZpIXTQnNGA",
    range: "Posts!A:A",
  });
  const lastRow = (existing.data.values || []).length + 1;

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: "19rwiMCwlUJym2h_3jB9Fx1XdjJAwxvFm-ZpIXTQnNGA",
    range: "Posts!A" + lastRow,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: posts },
  });

  console.log("Appended " + posts.length + " posts starting at row " + lastRow);
  console.log("Updated range: " + res.data.updates.updatedRange);
}
main().catch(console.error);
