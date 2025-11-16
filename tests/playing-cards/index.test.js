import { describe, test, expect } from 'vitest';
import * as PlayingCards from '../../src/playing-cards';

describe('Package playing-cards exports', () => {
  test('Package exports class Card', () => {
    expect(PlayingCards.Card).toBeDefined();
  });

  test('Package exports class Deck', () => {
    expect(PlayingCards.Deck).toBeDefined();
  });

  test('Package exports class PlayingCardError', () => {
    expect(PlayingCards.PlayingCardError).toBeDefined();
  });
});
