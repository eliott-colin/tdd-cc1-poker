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

    it('détecte une suite dont les cartes sont dans le désordre', () => {
      const hand: Hand = [
        card(9, 'clubs'),
        card(5, 'clubs'),
        card(7, 'hearts'),
        card(6, 'diamonds'),
        card(8, 'spades'),
      ];

      expect(scoreHand(hand)).toBe(40);
    });

    it('détecte une suite terminée par l\'As', () => {
      const hand: Hand = [
        card(10, 'diamonds'),
        card(JACK, 'clubs'),
        card(QUEEN, 'hearts'),
        card(KING, 'spades'),
        card(ACE, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(40);
    });

    it('ne compte pas A-2-3-4-5 comme une suite', () => {
      const hand: Hand = [
        card(ACE, 'clubs'),
        card(2, 'diamonds'),
        card(3, 'hearts'),
        card(4, 'spades'),
        card(5, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(14);
    });

    it('ne compte pas une main avec un trou comme une suite', () => {
      const hand: Hand = [
        card(5, 'clubs'),
        card(6, 'diamonds'),
        card(7, 'hearts'),
        card(8, 'spades'),
        card(10, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(10);
    });

    it('ne compte pas une main avec une paire couvrant cinq valeurs comme une suite', () => {
      const hand: Hand = [
        card(5, 'clubs'),
        card(6, 'diamonds'),
        card(7, 'hearts'),
        card(9, 'spades'),
        card(9, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(9);
    });
  });

  describe('couleur', () => {
    it('vaut 45 points pour cinq cartes de la même enseigne', () => {
      const hand: Hand = [
        card(2, 'hearts'),
        card(7, 'hearts'),
        card(9, 'hearts'),
        card(JACK, 'hearts'),
        card(KING, 'hearts'),
      ];

      expect(scoreHand(hand)).toBe(45);
    });

    it('ne compte pas quatre cartes de la même enseigne comme une couleur', () => {
      const hand: Hand = [
        card(2, 'hearts'),
        card(7, 'hearts'),
        card(9, 'hearts'),
        card(JACK, 'hearts'),
        card(KING, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(13);
    });
  });

  describe('full', () => {
    it('vaut 50 points pour un brelan et une paire plutôt que 30 pour le brelan', () => {
      const hand: Hand = [
        card(2, 'hearts'),
        card(2, 'spades'),
        card(2, 'diamonds'),
        card(9, 'clubs'),
        card(9, 'spades'),
      ];

      expect(scoreHand(hand)).toBe(50);
    });

    it('détecte un full dont la paire est plus haute que le brelan', () => {
      const hand: Hand = [
        card(4, 'clubs'),
        card(4, 'diamonds'),
        card(4, 'spades'),
        card(JACK, 'hearts'),
        card(JACK, 'diamonds'),
      ];

      expect(scoreHand(hand)).toBe(50);
    });
  });

  describe('carré', () => {
    it('vaut 60 points pour quatre cartes de même valeur', () => {
      const hand: Hand = [
        card(7, 'hearts'),
        card(7, 'clubs'),
        card(7, 'diamonds'),
        card(7, 'spades'),
        card(KING, 'clubs'),
      ];

      expect(scoreHand(hand)).toBe(60);
    });
  });

  describe('quinte flush', () => {
    it('vaut 80 points pour une suite de la même enseigne', () => {
      const hand: Hand = [
        card(5, 'hearts'),
        card(6, 'hearts'),
        card(7, 'hearts'),
        card(8, 'hearts'),
        card(9, 'hearts'),
      ];

      expect(scoreHand(hand)).toBe(80);
    });

    it('détecte une quinte flush terminée par l\'As', () => {
      const hand: Hand = [
        card(10, 'spades'),
        card(JACK, 'spades'),
        card(QUEEN, 'spades'),
        card(KING, 'spades'),
        card(ACE, 'spades'),
      ];

      expect(scoreHand(hand)).toBe(80);
    });

    it('compte A-2-3-4-5 de la même enseigne comme une couleur', () => {
      const hand: Hand = [
        card(ACE, 'hearts'),
        card(2, 'hearts'),
        card(3, 'hearts'),
        card(4, 'hearts'),
        card(5, 'hearts'),
      ];

      expect(scoreHand(hand)).toBe(45);
    });
  });
});
