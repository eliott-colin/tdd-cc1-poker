import { describe, expect, it } from 'vitest';
import { ACE, JACK, KING, QUEEN, type Card, type CardValue, type Hand, type Suit } from './card';
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

    it('vaut 10 quand la carte la plus haute est un 10', () => {
      const hand: Hand = [
        card(2, 'hearts'),
        card(4, 'clubs'),
        card(6, 'diamonds'),
        card(8, 'spades'),
        card(10, 'hearts'),
      ];

      expect(scoreHand(hand)).toBe(10);
    });

    it('vaut 14 quand la carte la plus haute est un As', () => {
      const hand: Hand = [
        card(2, 'hearts'),
        card(4, 'clubs'),
        card(6, 'diamonds'),
        card(8, 'spades'),
        card(ACE, 'hearts'),
      ];

      expect(scoreHand(hand)).toBe(14);
    });

    it('ignore une paire et retient la carte la plus haute', () => {
      const hand: Hand = [
        card(5, 'hearts'),
        card(5, 'clubs'),
        card(9, 'diamonds'),
        card(JACK, 'spades'),
        card(KING, 'hearts'),
      ];

      expect(scoreHand(hand)).toBe(13);
    });

    it('ignore une double paire et retient la carte la plus haute', () => {
      const hand: Hand = [
        card(5, 'hearts'),
        card(5, 'clubs'),
        card(9, 'diamonds'),
        card(9, 'spades'),
        card(KING, 'hearts'),
      ];

      expect(scoreHand(hand)).toBe(13);
    });
  });

  describe('brelan', () => {
    it('vaut 30 points pour trois cartes de même valeur', () => {
      const hand: Hand = [
        card(4, 'clubs'),
        card(4, 'diamonds'),
        card(4, 'spades'),
        card(9, 'hearts'),
        card(KING, 'diamonds'),
      ];

      expect(scoreHand(hand)).toBe(30);
    });
  });

  describe('suite', () => {
    it('vaut 40 points pour cinq valeurs consécutives', () => {
      const hand: Hand = [
        card(5, 'clubs'),
        card(6, 'diamonds'),
        card(7, 'hearts'),
        card(8, 'spades'),
        card(9, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(40);
    });
  });
});
