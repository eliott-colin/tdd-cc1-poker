import type { Hand } from './card';

const THREE_OF_A_KIND_POINTS = 30;

export function scoreHand(hand: Hand): number {
  if (isThreeOfAKind(hand)) {
    return THREE_OF_A_KIND_POINTS;
  }
  return highestCardValue(hand);
}

function isThreeOfAKind(hand: Hand): boolean {
  return hand.some((card) => hand.filter((other) => other.value === card.value).length === 3);
}

function highestCardValue(hand: Hand): number {
  return Math.max(...hand.map((card) => card.value));
}
