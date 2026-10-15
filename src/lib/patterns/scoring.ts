import { FAMILIES, GUARD_BY_ID, GUARD_ORDER, GUARDS } from "./data";
import type { Answers, GuardScore, PatternResult, ScoredGuard, ShuffledItem } from "./types";

export const TOTAL_ITEMS = GUARDS.length * 3;

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Builds one session's item order: three rounds, each a shuffled pass over
 * all 12 guards (one item per guard per round), so a guard's three items
 * land roughly a third apart instead of clustering.
 */
export function buildShuffledOrder(): ShuffledItem[] {
  const perGuardItemOrder: Record<string, number[]> = {};
  for (const guardId of GUARD_ORDER) {
    perGuardItemOrder[guardId] = shuffle([0, 1, 2]);
  }

  const rounds: ShuffledItem[][] = [0, 1, 2].map((round) => {
    const guardOrder = shuffle(GUARD_ORDER);
    return guardOrder.map((guardId) => {
      const itemIndex = perGuardItemOrder[guardId][round];
      return {
        guardId,
        itemIndex,
        item: GUARD_BY_ID[guardId].items[itemIndex],
      };
    });
  });

  // Avoid a guard's item landing right at a round boundary next to itself.
  for (let r = 0; r < rounds.length - 1; r++) {
    const tail = rounds[r][rounds[r].length - 1];
    const nextRound = rounds[r + 1];
    if (nextRound[0].guardId === tail.guardId) {
      const swapIdx = nextRound.findIndex((entry, i) => i > 0 && entry.guardId !== tail.guardId);
      if (swapIdx > 0) {
        [nextRound[0], nextRound[swapIdx]] = [nextRound[swapIdx], nextRound[0]];
      }
    }
  }

  return rounds.flat();
}

function guardScores(answers: Answers): GuardScore[] {
  return GUARDS.map((guard) => {
    const values = (answers[guard.id] ?? []).map((v) => v ?? 0);
    const score = values.reduce((sum, v) => sum + v, 0);
    const maxSingleItem = values.length ? Math.max(...values) : 0;
    return { guardId: guard.id, score, maxSingleItem };
  });
}

/**
 * Sequential top-3 selection. Each rank is decided by: score desc, then
 * highest single-item answer, then whichever family has fewer guards
 * already selected (keeps the top 3 from reading as one family sweeping
 * the board on near-ties), then fixed canonical order (brief §5).
 */
export function computeResult(answers: Answers): PatternResult {
  const scores = guardScores(answers);
  const remaining = new Set(scores.map((s) => s.guardId));
  const selected: ScoredGuard[] = [];

  while (selected.length < 3 && remaining.size > 0) {
    const candidates = scores.filter((s) => remaining.has(s.guardId));
    const topScore = Math.max(...candidates.map((c) => c.score));
    let tied = candidates.filter((c) => c.score === topScore);

    if (tied.length > 1) {
      const topMax = Math.max(...tied.map((c) => c.maxSingleItem));
      tied = tied.filter((c) => c.maxSingleItem === topMax);
    }

    if (tied.length > 1) {
      const familyCounts: Record<string, number> = {};
      for (const s of selected) {
        const fam = GUARD_BY_ID[s.guardId].familyId;
        familyCounts[fam] = (familyCounts[fam] ?? 0) + 1;
      }
      const fewestFamilyCount = Math.min(
        ...tied.map((c) => familyCounts[GUARD_BY_ID[c.guardId].familyId] ?? 0)
      );
      tied = tied.filter(
        (c) => (familyCounts[GUARD_BY_ID[c.guardId].familyId] ?? 0) === fewestFamilyCount
      );
    }

    if (tied.length > 1) {
      tied.sort((a, b) => GUARD_ORDER.indexOf(a.guardId) - GUARD_ORDER.indexOf(b.guardId));
    }

    const winner = tied[0];
    selected.push({ ...winner, guard: GUARD_BY_ID[winner.guardId] });
    remaining.delete(winner.guardId);
  }

  const top3 = selected as [ScoredGuard, ScoredGuard, ScoredGuard];
  const family = FAMILIES[top3[0].guard.familyId];

  return { topGuards: top3, family };
}
