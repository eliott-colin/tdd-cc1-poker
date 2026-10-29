import type { CardValue, Hand } from './card';

const FULL_HOUSE_POINTS = 50;
const FLUSH_POINTS = 45;
const STRAIGHT_POINTS = 40;
const THREE_OF_A_KIND_POINTS = 30;

export function scoreHand(hand: Hand): number {
  if (isFullHouse(hand)) {
    return FULL_HOUSE_POINTS;
  }
  if (isFlush(hand)) {
    return FLUSH_POINTS;
  }
  if (isStraight(hand)) {
    return STRAIGHT_POINTS;
  }
  if (isThreeOfAKind(hand)) {
    return THREE_OF_A_KIND_POINTS;
  }
  return highestCardValue(hand);
}

function isFullHouse(hand: Hand): boolean {
  const [largestGroup, secondGroup] = cardCountsByValue(hand);
  return largestGroup === 3 && secondGroup === 2;
}

function isFlush(hand: Hand): boolean {
  return hand.every((card) => card.suit === hand[0].suit);
}

function isStraight(hand: Hand): boolean {
  return sortedValues(hand).every((value, index, values) => index === 0 || value === values[index - 1] + 1);
}

function sortedValues(hand: Hand): number[] {
  return hand.map((card) => card.value).sort((a, b) => a - b);
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
