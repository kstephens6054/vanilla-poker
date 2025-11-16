import { describe, test, expect } from 'vitest';
import { PlayingCardError } from '../../src/playing-cards/PlayingCardError.js';
import { arraySkipIterator } from '../../src/playing-cards/utility.js';

describe('The arraySkipIterator utility generator function', () => {
  const evenCase = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const oddCase = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  test.for([
    [evenCase, 2, 0, [1, 3, 5, 7, 9]],
    [evenCase, 2, 1, [2, 4, 6, 8, 10]],
    [oddCase, 2, 0, [1, 3, 5, 7, 9]],
    [oddCase, 2, 1, [2, 4, 6, 8, 10]],
    [evenCase, 3, 0, [1, 4, 7]],
    [evenCase, 3, 1, [2, 5, 8]],
    [evenCase, 3, 2, [3, 6, 9]],
  ])(
    'The arraySkipIterator function should yield alternating items',
    ([array, modulus, offset, expected]) => {
      expect([...arraySkipIterator(array, modulus, offset)]).toEqual(expected);
    }
  );

  test.for([
    [null, 2, 0, 'The array must be an instance of Array'],
    [[1, 2, 3], 1, 0, 'Invalid modulus: 1'], // modulus < 2
    [[1, 2, 3], 4, 0, 'Invalid modulus: 4'], // modulus > array length
    [[1, 2, 3], 2, -1, 'Invalid offset: -1'], // offset < 0
    [[1, 2, 3], 2, 2, 'Invalid offset: 2'], // offset >= modulus
  ])(
    'The arraySkipIterator function should throw on invalid parameters',
    ([array, modulus, offset, errorMessage]) => {
      expect(() => [...arraySkipIterator(array, modulus, offset)]).toThrow(
        new PlayingCardError(errorMessage)
      );
    }
  );
});
