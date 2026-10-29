export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export const JACK: CardValue = 11;
export const QUEEN: CardValue = 12;
export const KING: CardValue = 13;
export const ACE: CardValue = 14;

export interface Card {
  value: CardValue;
  suit: Suit;
}

export type Hand = [Card, Card, Card, Card, Card];
