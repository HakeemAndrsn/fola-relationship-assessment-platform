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
  [
    "Your brain isn't broken. It's still at war.\n\nYou thought it was laziness. Or weakness. Or the peculiar shame of being someone who can't simply get it together.\n\nBut here's what nobody told you: when a body has been through sustained stress — or the slow, quiet violence of a childhood where safety was never guaranteed — the brain reroutes. It pulls energy from the prefrontal cortex (decision-making, regulation, sleep) and sends it to the amygdala. The survival centre.\n\nThis isn't pathology. It's genius.\n\nYour body is trying to keep you alive. The problem is the war is over — and nobody told your body.\n\nAt FOLA, we work with the nervous system, not against it. We don't treat symptoms as character flaws. We treat them as signals.\n\nIf you've been carrying something you can't name, the first step is understanding what you're actually carrying.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-08"
  ],
  [
    "There is a man I know — I know many versions of him — who cannot go to sleep until everyone in his house is okay.\n\nHe checks the doors. The finances. His phone for messages from people who may need something. He has learned that the way to feel safe is to make himself indispensable.\n\nIf he is needed, he cannot be left.\n\nHe calls this love. Most people around him call it love too.\n\nIt is a wound wearing a costume.\n\nThe care is genuine. But underneath it is a child who learned, very early, that his value depended on what he could do for others. Not on who he was.\n\nThis is not a character flaw. It is a survival strategy that has outlived its usefulness.\n\nAt FOLA, we help men untangle the difference between genuine care and compulsive rescue. Between love and the fear of being left.\n\nThat distinction changes everything.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-08"
  ],
  [
    "I want to tell you this before it happens, so that when it does, you don't interpret it as failure.\n\nWhen you start to get well — actually well, not the surface version where you have better language for your patterns but the same patterns — the people around you will respond.\n\nSome will become uncomfortable. Some will pull back without being able to explain why. Some will accuse you of changing, as though change was the betrayal and not the wound they've been benefiting from.\n\nThis is not a reason to stop.\n\nThe relationships in your life were built around a specific version of you. When that version starts to heal, the system reorganises. Not everyone makes it through the reorganisation.\n\nThat doesn't mean the healing was wrong. It means the container wasn't built for who you're becoming.\n\nAt FOLA, we prepare people for this. Because the loneliness of outgrowing your old life is real — and you shouldn't have to navigate it alone.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-09"
  ],
  [
    "You have forgiven yourself.\n\nYou said the words. You did the session. You cried the cry that felt like it came from somewhere very deep and very old. And you thought: that's it, that's the thing I needed to release.\n\nAnd then something happened — a conversation, a look, a small thing that should not have carried the weight it carried — and there you were again. Holding the same thing.\n\nYou will probably tell yourself you didn't do it right. That the forgiveness wasn't real.\n\nStop.\n\nWhat you are describing is not failure. It is the difference between an event and a practice.\n\nForgiveness is not a transaction you complete. It is a muscle you build. Every time you return to the same wound and choose not to make it mean something about your worth, you are not failing. You are strengthening.\n\nAt FOLA, we teach self-forgiveness as a practice — not a performance.\n\nBecause healing doesn't happen in a single session. It happens in the thousands of small choices you make after.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-09"
  ],
  [
    "I know what you're thinking. You've heard the phrase. You've categorised it — gently — as the soft end of the therapeutic world.\n\nI need to correct that.\n\nThe inner child is not a metaphor. It is a neurological reality.\n\nBetween the ages of zero and six, the brain operates in a state researchers have compared to hypnosis. The prefrontal cortex — critical thinking, evaluation, the ability to say \"that's not true about me\" — is essentially offline. The child is a receiver. Everything goes in without filtering.\n\nThe parent who loves fiercely but rages when overwhelmed? That goes in. The silence after something bad happened? That goes in. The message that you are too much, not enough, responsible for everyone else's feelings? All of it. Unfiltered. Unquestioned.\n\nAnd then, decades later, you wonder why you react to certain situations as though you are still small.\n\nBecause part of you is.\n\nAt FOLA, we work with the inner child not as regression, but as reorganisation. We go back to the original recording and update the file.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-10"
  ],
  [
    "Money gives you a handle on the door.\n\nIt does not tell you what is on the other side.\n\nI have watched enough people come into resources — real resources, the kind that change the material texture of a life — to say this with certainty: money does not heal wounds. Money amplifies what is already present.\n\nIf the wound is still open when the money arrives, the money makes the wound louder. More room to run. More distractions with higher production values. More people willing to agree with you, because disagreeing now has a cost.\n\nPoverty is a wound. I don't want to be misread. The chronic scarcity that marks so many Black lives — the monthly arithmetic of not enough — that is real, and it leaves its own kind of damage.\n\nBut money alone does not undo that damage. It just changes the neighbourhood where the damage lives.\n\nAt FOLA, we help people do both: build the resource and heal the wound. Because one without the other is just a more comfortable version of the same prison.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-10"
  ],
  [
    "There is a moment — most of us know it — when a feeling arrives so loudly that it becomes the only truth in the room.\n\nThe voice that says: this is over. Or: they do not care about you. Or: you are alone in this.\n\nThe feeling arrives with the confidence of evidence. It does not announce itself as interpretation. It announces itself as fact.\n\nAnd you act from it. Or you collapse into it. Or you carry it around for days, quietly poisoning every interaction from inside it.\n\nI want to give you a tool I use in sessions.\n\nWhen a client arrives inside one of these certainties, I ask them to do a pre-mortem. Before you act on the feeling, test it against the truth. What is the evidence — not the emotion, the evidence — that this is real? What would you tell a friend who came to you with this same certainty?\n\nMost of the time, the feeling is not wrong. It's just incomplete. It's a signal, not a verdict.\n\nAt FOLA, we teach people to read their feelings without being ruled by them. To distinguish between what you feel and what is true.\n\nThat distinction is a superpower.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-11"
  ],
  [
    "There is a particular kind of exhaustion that comes from having to narrate your own interior in real time.\n\nYou know this exhaustion. The exhaustion of being in a conversation where you can feel that you are not okay — where something has shifted, where the person in front of you has said something that landed in a place you did not expect — and instead of saying that, you say nothing. Or you say fine. Or you reroute into a version of the conversation that keeps everyone comfortable except you.\n\nYou have been doing this for a very long time.\n\nIt probably started as survival. Somewhere in your early life, you learned that expressing what was actually happening inside you produced results you couldn't handle. So you learned to manage. To smooth over. To perform okay.\n\nHealing requires you to stop explaining yourself to people who are not equipped to receive what you're saying.\n\nAt FOLA, we help people reclaim the right to be seen without having to justify it.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-11"
  ],
  [
    "I am going to write something practitioners are not supposed to write.\n\nI know exactly what is wrong. With my practice. With the gap between what the work produces in the room and what the infrastructure around the room can hold. I know the names of the systems that are not working. I know what the website should say. I know what the person on the other side of it needs to feel before they will pick up the phone.\n\nI know all of this. And there are days when none of it is moving and I am sitting in the middle of my own knowing and it is the loneliest place in the world.\n\nPeople assume clarity is comfort. That if you can see the problem, you are close to solving it.\n\nThey are not wrong, exactly. But they are not right either.\n\nClarity without capacity is its own kind of grief.\n\nI share this because I think more practitioners need to say it out loud. The work of building a practice that actually serves people — not just the ones who can afford it, not just the ones who already understand the language — is slow. It is unglamorous. And it is worth it.\n\nAt FOLA, we are building something that holds both the clinical rigour and the human truth. If that resonates, you know where to find me.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-12"
  ],
  [
    "Start with the resentment.\n\nNot the kindness — everybody starts with the kindness. Everybody leads with how much they give, how much they help, how available they are. They lead with the generosity. And it is real.\n\nBut follow the generosity far enough and you always hit the resentment. The specific, hot, slightly shameful resentment of someone who keeps giving without being asked and then cannot understand why nobody is giving back at the same volume.\n\nSomeone who keeps saying yes until they cannot, and then when they finally say no, they are treated — or they feel they are treated — as though the no was a betrayal.\n\nPeople-pleasing is not kindness. It is a wound wearing a costume.\n\nThe generosity is real. But the engine behind it is fear. Fear of rejection. Fear of conflict. Fear that your value depends on what you provide.\n\nAt FOLA, we help people untangle the generosity from the fear. So you can give from fullness instead of from emptiness.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-12"
  ],
  [
    "Most people approach personal optimisation backwards.\n\nThey start with productivity systems. Morning routines. Biohacking. The latest protocol for getting more out of a 24-hour day.\n\nAnd then they wonder why none of it sticks.\n\nHere's what nobody tells you about optimisation: you cannot optimise a system that is still in survival mode.\n\nIf your nervous system is scanning for threats, no amount of cold plunges or Notion templates will give you focus. If your inner architecture is organised around protection, the most elegant productivity system in the world will collapse the first time you feel unsafe.\n\nReal optimisation starts with regulation. Not discipline. Not hustle. The ability to return to baseline when life gets loud.\n\nAt FOLA, we build the foundation first. Nervous system regulation. Attachment repair. Inner child reorganisation. Then we build the performance layer on top.\n\nBecause you cannot out-discipline a dysregulated nervous system.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-13"
  ],
  [
    "Self-mastery is not what you think it is.\n\nIt is not the ability to suppress your emotions in a meeting. It is not the capacity to push through exhaustion. It is not the discipline to wake up at 4 AM and grind while everything inside you is screaming for rest.\n\nThat is not mastery. That is dissociation with a productivity aesthetic.\n\nReal self-mastery is the ability to feel what you feel without being controlled by it. To notice the impulse to react — and choose a response instead. To sit with discomfort long enough to understand what it's telling you, rather than numbing, distracting, or performing your way past it.\n\nMastery is not the absence of chaos. It is the capacity to remain centred inside it.\n\nAt FOLA, we teach self-mastery as an inside-out practice. Regulation first. Awareness second. Action third.\n\nAnything else is just performance.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-13"
  ],
  [
    "I started FOLA because I got tired of watching people spend years in therapy without a roadmap.\n\nNot because the therapy was bad. Because the therapy was blind.\n\nMost people enter healing without a baseline. They don't know what's actually wrong — they just know something hurts. They don't know if they're making progress — they just know some weeks feel better than others.\n\nThat's not healing. That's hoping.\n\nAt FOLA, we start with data. Clinical assessments that measure what's actually happening. Attachment patterns. Trauma load. Nervous system state. Values alignment. Change readiness.\n\nThen we build a pathway. Not a generic protocol. A specific, phased plan based on what the data reveals.\n\nAnd we measure progress. Not by how you feel on a Tuesday. By whether the numbers are moving in the right direction.\n\nThis is what happens when you put clinical rigour at the centre of the healing conversation.\n\nIf you're ready to stop guessing and start knowing, book a discovery call.\n\nhttps://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-14"
  ],
  [
    "Here's what I know after years of sitting across from people who are doing the work:\n\nHealing is not a straight line. It is not a destination you arrive at and then everything is fine. It is a continuous, unglamorous, deeply courageous practice of showing up for yourself even when nobody is watching.\n\nSome weeks you will feel like you've undone all your progress. You haven't. You're just in a new layer of the same work.\n\nSome weeks you will feel like nobody understands what you're going through. You're right — they don't. But that doesn't mean you're alone.\n\nSome weeks you will want to quit. Don't.\n\nThe version of you that started this journey deserves to see what's on the other side.\n\nAt FOLA, we don't just help you start the work. We help you stay in it long enough for it to change your life.\n\nIf you've been waiting for a sign to begin — this is it.\n\nBook a discovery call: https://healingsessions.co.za",
    "",
    "",
    "pending",
    "2026-06-14"
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

  console.log(
    "✅ Appended " + posts.length + " posts starting at row " + lastRow
  );
  console.log("Updated range: " + res.data.updates.updatedRange);
}
main().catch(console.error);
