import { PlayingCardError } from './PlayingCardError.js';

function* arraySkipIterator(array, modulus = 2, offset = 0) {
  if (!(array instanceof Array)) {
    throw new PlayingCardError('The array must be an instance of Array');
  }

  if (modulus < 2 || modulus > array.length) {
    throw new PlayingCardError(`Invalid modulus: ${modulus}`);
  }

  if (offset < 0 || offset >= modulus) {
    throw new PlayingCardError(`Invalid offset: ${offset}`);
  }

  const limit = modulus * Math.floor(array.length / modulus);

  for (let i = offset; i < limit; i += modulus) {
    yield array[i];
  }
}

export { arraySkipIterator };
