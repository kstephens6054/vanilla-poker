import { Card } from "./Card";
import { Deck } from "./Deck";

class MultipleDeck extends Deck {
  constructor(numberOfDecks = 1) {
    super();
    this.numberOfDecks = numberOfDecks;
  }

  _buildDeck() {
    this._cards = new Array(this.size);
    let index = 0;

    for (let deck = 0; deck < this.numberOfDecks; deck++) {
      for (const suit of Card.suits()) {
        for (const face of Card.faces()) {
          this._cards[index] = new Card(face, suit);
          index += 1;
        }
      }
    }
  }

  get size() {
    return this.numberOfDecks * Deck.NUMBER_OF_CARDS;
  }
}

export { MultipleDeck };
