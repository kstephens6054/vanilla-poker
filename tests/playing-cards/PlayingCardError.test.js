import { describe, test, expect } from 'vitest';
import { PlayingCardError } from '../../src/playing-cards/PlayingCardError.js';

describe('Class PlayingCardError', () => {
  test('Class PlayingCardError should be a subclass of Error', () => {
    expect(new PlayingCardError()).toBeInstanceOf(Error);
  });

  test('A PlayingCardError should contain a message', () => {
    const ERROR_MESSAGE = "Don't Panic!";
    expect(() => {
      throw new PlayingCardError(ERROR_MESSAGE);
    }).toThrow(ERROR_MESSAGE);
  });
});
