import { PlayingCardError } from './PlayingCardError.js';

class Card {
  static ACE = 'A';
  static KING = 'K';
  static QUEEN = 'Q';
  static JACK = 'J';
  static TEN = 'T';
  static NINE = '9';
  static EIGHT = '8';
  static SEVEN = '7';
  static SIX = '6';
  static FIVE = '5';
  static FOUR = '4';
  static THREE = '3';
  static TWO = '2';

  static SPADES = 'S';
  static HEARTS = 'H';
  static DIAMONDS = 'D';
  static CLUBS = 'C';

  static _valueMap = new Map([
    [Card.TWO, 2],
    [Card.THREE, 3],
    [Card.FOUR, 4],
    [Card.FIVE, 5],
    [Card.SIX, 6],
    [Card.SEVEN, 7],
    [Card.EIGHT, 8],
    [Card.NINE, 9],
    [Card.TEN, 10],
    [Card.JACK, 11],
    [Card.QUEEN, 12],
    [Card.KING, 13],
    [Card.ACE, 14],
  ]);

  static _suitMap = new Map([
    [Card.SPADES, 4],
    [Card.HEARTS, 3],
    [Card.DIAMONDS, 2],
    [Card.CLUBS, 1],
  ]);

  static _textMap = new Map([
    [Card.TWO, 'Two'],
    [Card.THREE, 'Three'],
    [Card.FOUR, 'Four'],
    [Card.FIVE, 'Five'],
    [Card.SIX, 'Six'],
    [Card.SEVEN, 'Seven'],
    [Card.EIGHT, 'Eight'],
    [Card.NINE, 'Nine'],
    [Card.TEN, 'Ten'],
    [Card.JACK, 'Jack'],
    [Card.QUEEN, 'Queen'],
    [Card.KING, 'King'],
    [Card.ACE, 'Ace'],
    [Card.SPADES, 'Spades'],
    [Card.HEARTS, 'Hearts'],
    [Card.DIAMONDS, 'Diamonds'],
    [Card.CLUBS, 'Clubs'],
  ]);

  constructor(face, suit) {
    if (!Card._valueMap.has(face)) {
      throw new PlayingCardError(`Invalid card face value: ${face}`);
    }

    if (!Card._suitMap.has(suit)) {
      throw new PlayingCardError(`Invalid card suit value: ${suit}`);
    }

    this._face = face;
    this._suit = suit;
  }

  get face() {
    return this._face;
  }

  get suit() {
    return this._suit;
  }

  get faceValue() {
    return Card._valueMap.get(this._face);
  }

  get suitValue() {
    return Card._suitMap.get(this._suit);
  }

  toString() {
    return `PlayingCard {face: ${this._face}, suit: ${this._suit}}`;
  }

  toText() {
    return `${Card._textMap.get(this._face)} of ${Card._textMap.get(
      this._suit
    )}`;
  }

  compare(other) {
    if (this.faceValue === other.faceValue) {
      return this.compareBySuit(other);
    }

    return this.compareByValue(other);
  }

  compareByValue(other) {
    const myValue = this.faceValue;
    const otherValue = other.faceValue;

    if (myValue > otherValue) {
      return 1;
    }

    if (otherValue > myValue) {
      return -1;
    }

    return 0;
  }

  compareBySuit(other) {
    const mySuitValue = this.suitValue;
    const otherSuitValue = other.suitValue;

    if (mySuitValue > otherSuitValue) {
      return 1;
    }

    if (otherSuitValue > mySuitValue) {
      return -1;
    }

    return 0;
  }

  static faces() {
    return this._valueMap.keys();
  }

  static suits() {
    return this._suitMap.keys();
  }

  static fromString(str) {
    return new Card(str.charAt(0), str.charAt(1));
  }
}

export { Card };
