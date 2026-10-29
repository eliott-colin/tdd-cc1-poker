import type { CardValue, Hand } from './card';

const THREE_OF_A_KIND_POINTS = 30;

export function scoreHand(hand: Hand): number {
  if (isThreeOfAKind(hand)) {
    return THREE_OF_A_KIND_POINTS;
  }
  return highestCardValue(hand);
}

function isThreeOfAKind(hand: Hand): boolean {
  return cardCountsByValue(hand)[0] === 3;
}

function cardCountsByValue(hand: Hand): number[] {
  const counts = new Map<CardValue, number>();
  hand.forEach((card) => counts.set(card.value, (counts.get(card.value) ?? 0) + 1));
  return [...counts.values()].sort((a, b) => b - a);
}

function highestCardValue(hand: Hand): number {
  return Math.max(...hand.map((card) => card.value));
}
