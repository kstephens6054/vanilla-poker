import { describe, test, expect } from 'vitest';
import { Card } from '../../src/playing-cards/Card.js';
import { PlayingCardError } from '../../src/playing-cards/PlayingCardError.js';

describe('Class Card', () => {
  test('Constructor and getters', () => {
    const card = new Card(Card.ACE, Card.SPADES);
    expect(card).toBeInstanceOf(Card);
    expect(card.face).toBe(Card.ACE);
    expect(card.suit).toBe(Card.SPADES);
    expect(card.faceValue).toBe(14);
    expect(card.suitValue).toBe(4);
  });

  test('Invalid face in constructor', () => {
    expect(() => new Card('X', Card.SPADES)).toThrow(
      new PlayingCardError('Invalid card face value: X')
    );
    expect(() => Card.fromString('XS')).toThrow(
      new PlayingCardError('Invalid card face value: X')
    );
  });

  test('Invalid suit in constructor', () => {
    expect(() => new Card(Card.ACE, 'X')).toThrow(
      new PlayingCardError('Invalid card suit value: X')
    );
    expect(() => Card.fromString('AX')).toThrow(
      new PlayingCardError('Invalid card suit value: X')
    );
  });

  test('Method: toString', () => {
    const card = new Card(Card.ACE, Card.SPADES);
    expect(card.toString()).toBe('PlayingCard {face: A, suit: S}');
  });

  test('Method: toText', () => {
    expect(new Card(Card.ACE, Card.SPADES).toText()).toBe('Ace of Spades');
    expect(new Card(Card.KING, Card.SPADES).toText()).toBe('King of Spades');
    expect(new Card(Card.QUEEN, Card.HEARTS).toText()).toBe('Queen of Hearts');
    expect(new Card(Card.JACK, Card.DIAMONDS).toText()).toBe(
      'Jack of Diamonds'
    );
    expect(new Card(Card.TEN, Card.CLUBS).toText()).toBe('Ten of Clubs');
    expect(new Card(Card.NINE, Card.SPADES).toText()).toBe('Nine of Spades');
    expect(new Card(Card.EIGHT, Card.HEARTS).toText()).toBe('Eight of Hearts');
    expect(new Card(Card.SEVEN, Card.DIAMONDS).toText()).toBe(
      'Seven of Diamonds'
    );
    expect(new Card(Card.SIX, Card.CLUBS).toText()).toBe('Six of Clubs');
    expect(new Card(Card.FIVE, Card.SPADES).toText()).toBe('Five of Spades');
    expect(new Card(Card.FOUR, Card.HEARTS).toText()).toBe('Four of Hearts');
    expect(new Card(Card.THREE, Card.DIAMONDS).toText()).toBe(
      'Three of Diamonds'
    );
    expect(new Card(Card.TWO, Card.CLUBS).toText()).toBe('Two of Clubs');
  });

  test('Method: compareByValue', () => {
    const aceOfSpades = new Card(Card.ACE, Card.SPADES);
    const aceOfDiamonds = new Card(Card.ACE, Card.DIAMONDS);
    const twoOfClubs = new Card(Card.TWO, Card.CLUBS);

    expect(aceOfSpades.compareByValue(twoOfClubs)).toBe(1);
    expect(aceOfSpades.compareByValue(aceOfDiamonds)).toBe(0);
    expect(twoOfClubs.compareByValue(aceOfSpades)).toBe(-1);
  });

  test('Method: compareBySuit', () => {
    const aceOfSpades = new Card(Card.ACE, Card.SPADES);
    const aceOfHearts = new Card(Card.ACE, Card.HEARTS);
    const aceOfDiamonds = new Card(Card.ACE, Card.DIAMONDS);
    const aceOfClubs = new Card(Card.ACE, Card.CLUBS);

    expect(aceOfSpades.compareBySuit(aceOfSpades)).toBe(0);

    expect(aceOfSpades.compareBySuit(aceOfHearts)).toBe(1);
    expect(aceOfHearts.compareBySuit(aceOfSpades)).toBe(-1);

    expect(aceOfHearts.compareBySuit(aceOfDiamonds)).toBe(1);
    expect(aceOfDiamonds.compareBySuit(aceOfHearts)).toBe(-1);

    expect(aceOfDiamonds.compareBySuit(aceOfClubs)).toBe(1);
    expect(aceOfClubs.compareBySuit(aceOfDiamonds)).toBe(-1);
  });

  test('Static method: faces', () => {
    expect([...Card.faces()]).toEqual(Array.from('23456789TJQKA'));
  });

  test('Static method: suits', () => {
    expect([...Card.suits()]).toEqual(Array.from('SHDC'));
  });

  test('Static method: fromString', () => {
    const card = Card.fromString('TC');
    expect(card.face).toBe(Card.TEN);
    expect(card.suit).toBe(Card.CLUBS);
  });
});
