#!/usr/bin/env node
const { google } = require("googleapis");
const fs = require("fs");

const creds = JSON.parse(
  fs.readFileSync(
    "/Users/fola/.nanobot/workspace/credentials/google-service-account.json",
    "utf-8"
  )
);

const auth = new google.auth.GoogleAuth({
  credentials: creds,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const spreadsheetId = "19rwiMCwlUJym2h_3jB9Fx1XdjJAwxvFm-ZpIXTQnNGA";

const posts = [
  // === BATCH 1: 1-20 ===
  [
    "She told you what she needed. You heard her. You just decided your comfort mattered more than her staying.\n\nThat's not a misunderstanding. That's a choice you made every single day.\n\nThe LoveBETTER Assessment shows you where your patterns are costing you the people who actually showed up.\n\nStart here: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-09"
  ],
  [
    "He didn't leave because he stopped loving you. He left because he got tired of loving someone who wouldn't love themselves enough to grow.\n\nYou can't outsource self-worth to someone else's patience.\n\nThe LoveBETTER Assessment maps 10 dimensions of your relational self — including where you're avoiding the mirror.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-09"
  ],
  [
    "You called it 'accepting me as I am.' They called it watching you self-destruct and being told to clap.\n\nThere's a difference between being loved for who you are and being tolerated while you refuse to change.\n\nFind out which one you're actually asking for: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-10"
  ],
  [
    "The audacity of being offended that they left — when you left the relationship emotionally long before they left it physically.\n\nDistance doesn't start when someone walks out the door. It starts in every conversation you didn't show up for.\n\nSee where you checked out: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-10"
  ],
  [
    "You want unconditional love but you're offering conditional effort. That math doesn't work.\n\nLove isn't the problem. The gap between what you expect and what you give is.\n\nThe LoveBETTER Assessment measures that gap. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-10"
  ],
  [
    "They didn't ask you to become someone else. They asked you to become who you kept promising you'd be.\n\nYou said you'd change. You meant it when you said it. But meaning it and doing it are different muscles.\n\nWhich one are you actually training? https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-11"
  ],
  [
    "You confused loyalty with tolerance. Just because someone stays doesn't mean they're not dying beside you.\n\nPresence isn't proof of love. Sometimes it's proof of exhaustion.\n\nThe LoveBETTER Assessment helps you see what you've been missing while someone was quietly disappearing.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-11"
  ],
  [
    "The things you wouldn't change for them? Watch how fast you change them for the next person. And ask yourself why they deserved your growth but the one who begged for it didn't.\n\nThat question will haunt you until you answer it honestly.\n\nStart here: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-11"
  ],
  [
    "You say 'they should've loved me through it.' They did. For years. You just didn't notice because you were too busy testing how far you could push before they broke.\n\nLove isn't a stress test. It's a practice.\n\nFind out where you're testing instead of building: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-12"
  ],
  [
    "A person who loves you enough to tell you the truth is rare. You had one. And you punished them for it.\n\nHonesty isn't cruelty. But when you're not ready to hear it, it feels like attack.\n\nThe LoveBETTER Assessment shows you where your defensiveness is costing you the people who actually care.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-12"
  ],
  [
    "You're not 'hard to love.' You're easy to love and impossible to build with. There's a difference.\n\nLove gets you in the door. Building keeps you there.\n\nWhich one are you actually showing up for? https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-12"
  ],
  [
    "They didn't give up on you. They gave up on the version of you that refused to show up.\n\nThere's a person inside you who wants to be different. The question is whether you'll let them out before the next person leaves.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-13"
  ],
  [
    "You keep saying 'I need someone who accepts me.' What you mean is 'I need someone who won't hold me accountable.' That's not a partner — that's an enabler.\n\nAccountability isn't rejection. It's the highest form of respect.\n\nSee where you're confusing acceptance with avoidance: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-13"
  ],
  [
    "The same mouth that says 'they were always complaining' is the same mouth that never once said 'you're right, let me work on that.'\n\nYou didn't have a communication problem. You had a humility problem.\n\nThe LoveBETTER Assessment measures your willingness to be wrong. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-13"
  ],
  [
    "You weaponised your vulnerability. You told them your trauma so they'd lower their standards — not so you could raise your behaviour.\n\nUsing your past as a shield against accountability isn't healing. It's manipulation.\n\nFind out if you're healing or hiding: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-14"
  ],
  [
    "They asked you to communicate. You stonewalled. They asked you to be present. You disappeared. They asked you to try. You gave excuses. And when they left, you called them heartless.\n\nYou're not the victim of this story. You're the author.\n\nRewrite it: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-14"
  ],
  [
    "Your next partner will ask for the same things. The only question is whether you'll finally listen or whether you'll lose them too.\n\nThe pattern doesn't change until you do.\n\nStart before the next one arrives: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-14"
  ],
  [
    "Growth isn't betraying yourself. It's betraying the version of you that was built on avoidance, ego, and fear. Let that version die.\n\nYou're not losing yourself. You're finally finding who you were supposed to be.\n\nThe LoveBETTER Assessment shows you what's ready to die and what's ready to live.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-15"
  ],
  [
    "You don't miss them. You miss having someone who tolerated what you refuse to fix. That's not love. That's convenience grieving.\n\nGrief is real. But grieve the right thing.\n\nFind out what you're actually mourning: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-15"
  ],
  [
    "The hardest truth: they didn't leave because the love ran out. They left because they realised you were never going to meet them where they'd been standing — waiting — the entire time.\n\nLove doesn't run out. Hope does.\n\nDon't let the next one run out of hope: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-15"
  ],
  // === BATCH 2: 21-40 ===
  [
    "You told them 'this is who I am' like stagnation is a personality trait. It's not. It's a choice you made every single day.\n\nGrowth is the only thing that proves love was real.\n\nSee where you've been choosing comfort over connection: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-16"
  ],
  [
    "They weren't asking for perfection. They were asking for effort. And you couldn't even give them that.\n\nThe bar was on the floor and you still tripped.\n\nThe LoveBETTER Assessment shows you where your effort is actually going. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-16"
  ],
  [
    "You'll rewrite the story to make yourself the victim. But your body knows the truth. So does theirs.\n\nNarratives protect us. They also trap us.\n\nFind out what story you're telling that isn't true: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-16"
  ],
  [
    "The version of you that 'wasn't enough' for them is the same version you're about to inflict on someone new. And you think that's their problem.\n\nIt's not. It's the pattern.\n\nBreak it before you break someone else: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-17"
  ],
  [
    "You called their standards 'too high' because meeting them would've required you to actually change. And change was never the plan.\n\nLow standards aren't love. They're low expectations of yourself.\n\nThe LoveBETTER Assessment measures your readiness for a partner who actually expects something.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-17"
  ],
  [
    "You're out here looking for someone with lower expectations instead of becoming someone who can meet higher ones.\n\nThat's not strategy. That's avoidance with a dating profile.\n\nStart becoming: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-17"
  ],
  [
    "They cried in front of you. They told you what was breaking them. And you still didn't move. That's not love. That's occupation.\n\nWhen someone trusts you with their tears and you do nothing, you're not a partner. You're a landlord.\n\nFind out where you've been occupying instead of loving: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-18"
  ],
  [
    "You want a soft woman but you create hard conditions. You want a strong man but you punish him for having standards.\n\nYou can't demand a specific kind of love while creating the opposite environment for it to grow.\n\nThe LoveBETTER Assessment shows you the gap between what you want and what you're building.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-18"
  ],
  [
    "'They knew who I was when they got with me' — yes. And they believed you when you said you wanted to be better. You lied.\n\nNot with words. With inaction.\n\nSee where your promises don't match your follow-through: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-18"
  ],
  [
    "You keep attracting the same type of person because you keep being the same type of partner. The pattern isn't bad luck. It's a mirror.\n\nStop asking why they're all the same. Start asking why you keep showing up the same way.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-19"
  ],
  [
    "They didn't leave because they couldn't handle you. They left because they finally stopped handling you and realised they'd been carrying the whole thing alone.\n\nYou weren't heavy. You were absent.\n\nThe LoveBETTER Assessment measures presence — not just physical, but emotional. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-19"
  ],
  [
    "You say you want growth but you get defensive every time someone shows you where you're stuck. Pick one.\n\nGrowth and defensiveness cannot coexist.\n\nFind out which one you're actually committed to: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-19"
  ],
  [
    "The relationship didn't fail. You failed to show up for it. There's a difference and you know it.\n\nCalling it 'the relationship failed' lets you off the hook. Calling it 'I failed to show up' is where healing begins.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-20"
  ],
  [
    "You'd rather lose a good person than lose an argument. And you'll do it again. And again. Until the house is empty and the ego is the only thing keeping you company.\n\nBeing right is cold company.\n\nThe LoveBETTER Assessment shows you where your need to be right is costing you what matters.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-20"
  ],
  [
    "They asked you to go to therapy. You said you don't need it. Now you're single, still angry, still repeating — and still don't think you need it.\n\nDenial isn't strength. It's the most expensive form of avoidance.\n\nStart before the next loss: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-20"
  ],
  [
    "You confused being chosen with being owed. Nobody owes you their stay when you won't give them a reason to.\n\nCommitment isn't a contract. It's a renewable choice.\n\nSee where you've been treating love like an entitlement: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-21"
  ],
  [
    "Your pride cost you a person who would've gone to war for you. And pride doesn't hold you at night.\n\nEgo is expensive. The bill always comes due.\n\nThe LoveBETTER Assessment measures where pride is running your relationships. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-21"
  ],
  [
    "You're not afraid of commitment. You're afraid of being seen — fully, honestly — and being asked to actually show up for what you see in the mirror.\n\nCommitment isn't the problem. Visibility is.\n\nFind out what you're hiding from: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-21"
  ],
  [
    "They didn't leave because the love died. They left because they realised they were the only one keeping it alive.\n\nYou can't CPR a relationship you stopped breathing into.\n\nSee where you stopped showing up: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-22"
  ],
  [
    "You want forgiveness without repentance. Reconciliation without change. A second chance while offering the same first version. That's not accountability. That's audacity.\n\nForgiveness is free. Trust is earned.\n\nThe LoveBETTER Assessment shows you where you're asking for grace you haven't earned.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-22"
  ],
  // === BATCH 3: 41-60 ===
  [
    "You'll post 'I deserve better' while being the reason someone else had to go find better.\n\nThe mirror doesn't care about your caption.\n\nLook before you post: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-22"
  ],
  [
    "The things you called 'small' were the things that mattered most to them. And dismissing what matters to your partner is just a slow, polite way of dismissing them.\n\nAttention is love in detail.\n\nFind out what you've been dismissing: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-23"
  ],
  [
    "You think leaving means they didn't love you enough. But staying while you refused to grow was them loving you more than you deserved for longer than you earned.\n\nGrace has limits. You passed them.\n\nThe LoveBETTER Assessment shows you where you overstayed someone's patience. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-23"
  ],
  [
    "Your avoidance isn't mysterious. It isn't complex. It's cowardice dressed up as independence.\n\nCall it what it is so you can actually change it.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-23"
  ],
  [
    "You want a partner who stays through everything — but you won't stay present through a single difficult conversation.\n\nThe math doesn't add up.\n\nSee where you're asking for more than you're giving: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-24"
  ],
  [
    "They were building a future. You were protecting a past. And you expected them to live in your museum forever.\n\nNobody builds a life with someone who's still living in a memory.\n\nThe LoveBETTER Assessment shows you where you're stuck in yesterday. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-24"
  ],
  [
    "You keep saying 'I just need time.' You've had years. Time isn't what you need. Honesty is.\n\nMore time won't fix what honesty hasn't touched.\n\nStart being honest: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-24"
  ],
  [
    "The fact that you can be disciplined at work, consistent at gym, and committed to your friendships — but can't show up in your relationship — tells them everything. It's not that you can't. It's that you won't. For them.\n\nThat's not a capacity problem. That's a priority problem.\n\nFind out who you're actually prioritising: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-25"
  ],
  [
    "You treated their patience like a renewable resource. It wasn't. And now it's gone.\n\nPatience isn't infinite. It's a savings account they kept depositing into while you kept withdrawing.\n\nThe LoveBETTER Assessment shows you where you've been overdrawn. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-25"
  ],
  [
    "You'll tell the next person 'my ex was crazy' without ever mentioning what you did to make a sane person lose themselves.\n\nIf every relationship ends the same way, the common denominator isn't them.\n\nLook at the denominator: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-25"
  ],
  [
    "You want to be understood but you refuse to be transparent. You want intimacy but you punish vulnerability. You want trust but you hide. The contradiction is the wound.\n\nYou can't get what you won't give.\n\nSee where you're blocking your own desire: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-26"
  ],
  [
    "They didn't ask you to be perfect. They asked you to be honest. And you couldn't even do that.\n\nHonesty isn't about words. It's about showing who you actually are.\n\nThe LoveBETTER Assessment measures your honesty — with yourself first. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-26"
  ],
  [
    "You're not 'bad at relationships.' You're good at avoiding the parts of yourself that relationships expose.\n\nThe relationship isn't the problem. You're just not used to being seen.\n\nStart being seen: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-26"
  ],
  [
    "The love was there. The willingness was there. The only thing missing was your participation.\n\nYou can't heal a relationship you weren't present for.\n\nFind out where you checked out: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-27"
  ],
  [
    "You watched them shrink trying to fit into the space you were willing to give. And you called that 'keeping the peace.'\n\nThat's not peace. That's slow erasure.\n\nThe LoveBETTER Assessment shows you the space you're actually making for someone. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-27"
  ],
  [
    "You say 'they changed.' No — they stopped performing. They stopped pretending your bare minimum was enough. That's not change. That's clarity.\n\nYou didn't lose them. You lost the version of them that was willing to pretend.\n\nhttps://lovebetter.netlify.app",
    "", "", "pending", "2026-06-27"
  ],
  [
    "You'll spend years building walls and then be shocked when nobody can reach you. The isolation isn't happening to you. You're engineering it.\n\nYou built the fortress. You can open the gate.\n\nStart opening: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-28"
  ],
  [
    "They asked for communication. You gave silence. They asked for presence. You gave distraction. They asked for growth. You gave excuses. And when they finally asked for nothing — you panicked. Because nothing is what you trained them to expect.\n\nYou trained them to stop needing you. And then wondered why they didn't.\n\nThe LoveBETTER Assessment shows you what you've been teaching your partner. https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-28"
  ],
  [
    "You're not healing between relationships. You're just resting between rounds of inflicting the same wound on different people.\n\nA break isn't growth. It's a pause.\n\nActually heal before the next round: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-28"
  ],
  [
    "One day you'll meet someone who won't ask you to change. Not because you're perfect — but because they've already accepted that you won't. And that quiet resignation will hurt more than any argument ever did. Because it means someone finally gave up on you in peace.\n\nDon't let that be the ending.\n\nStart before the resignation: https://lovebetter.netlify.app",
    "", "", "pending", "2026-06-29"
  ],
];

async function main() {
  // Find the last row with data
  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Posts!A:A",
  });

  const lastRow = (getRes.data.values || []).length + 1;

  const updateRes = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Posts!A" + lastRow,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: posts },
  });

  console.log(`✅ Queued ${posts.length} LoveBETTER posts starting at row ${lastRow}`);
  console.log("Updated range: " + updateRes.data.updates.updatedRange);
}

main().catch(console.error);
