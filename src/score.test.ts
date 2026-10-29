import { describe, expect, it } from 'vitest';
import { KING, QUEEN, type Card, type CardValue, type Hand, type Suit } from './card';
import { scoreHand } from './score';

const card = (value: CardValue, suit: Suit): Card => ({ value, suit });

describe('scoreHand', () => {
  describe('carte haute', () => {
    it('vaut 13 quand la carte la plus haute est un Roi', () => {
      const hand: Hand = [
        card(3, 'clubs'),
        card(8, 'diamonds'),
        card(10, 'hearts'),
        card(QUEEN, 'spades'),
        card(KING, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(13);
    });
  });
});