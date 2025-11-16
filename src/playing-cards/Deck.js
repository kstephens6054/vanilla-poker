import { Card } from './Card.js';
import { PlayingCardError } from './PlayingCardError.js';
import { arraySkipIterator } from './utility.js';

class Deck {
  static NUMBER_OF_CARDS = 52;

  constructor() {
    this._buildDeck();
    //this[Symbol.iterator] = this._cards[Symbol.iterator];
  }

  *[Symbol.iterator]() {
    for (const card of this._cards) {
      yield card;
    }
  }

  get cardsRemaining() {
    return this._cards.length;
  }

  _buildDeck() {
    this._cards = new Array(Deck.size);
    let index = 0;

    for (const suit of Card.suits()) {
      for (const face of Card.faces()) {
        this._cards[index] = new Card(face, suit);
        index += 1;
      }
    }
  }

  shuffle() {
    this._cards.sort(() => (Math.random() >= 0.5 ? 1 : -1));
  }

  deal(numberOfCards = 1) {
    if (numberOfCards < 1 || numberOfCards > Deck.NUMBER_OF_CARDS) {
      throw new PlayingCardError(`Invalid number of cards: ${numberOfCards}`);
    }

    if (numberOfCards > this._cards.length) {
      return null;
    }

    const hand = this._cards.splice(0, numberOfCards);

    return numberOfCards === 1 ? hand[0] : hand;
  }

  multiPlayerDeal(numberOfPlayers, numberOfCards = 1) {
    const cardsNeeded = numberOfPlayers * numberOfCards;

    if (numberOfPlayers < 1 || numberOfPlayers > Deck.NUMBER_OF_CARDS) {
      throw new PlayingCardError(
        `Invalid number of players: ${numberOfPlayers}`
      );
    }

    if (cardsNeeded < 1 || cardsNeeded > Deck.NUMBER_OF_CARDS) {
      throw new PlayingCardError(`Invalid number of cards: ${cardsNeeded}`);
    }

    if (cardsNeeded > this._cards.length) {
      return null;
    }

    const cardsToDeal = this._cards.splice(0, cardsNeeded);

    if (numberOfCards === 1) {
      return cardsToDeal;
    }

    return new Array(numberOfPlayers)
      .fill(null)
      .map((hand, player) => [
        ...arraySkipIterator(cardsToDeal, numberOfPlayers, player),
      ]);
  }
}

export { Deck };
