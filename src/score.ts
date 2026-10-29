import type { Hand } from './card';

export function scoreHand(hand: Hand): number {
  return highestCardValue(hand);
}

function highestCardValue(hand: Hand): number {
  return Math.max(...hand.map((card) => card.value));
}
