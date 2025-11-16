class PlayingCardError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PlayingCardError);
    }

    this.name = 'PlayingCardError';
  }
}

export { PlayingCardError };
