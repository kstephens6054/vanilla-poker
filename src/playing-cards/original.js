function pokerHands(arr) {
  const wins = 0;

  for (let line of arr){
    const cards = line.split(' ');
    const player1 = PokerHand.fromStringArray(cards.slice(0, 5));
    const player2 = PokerHand.fromStringArray(cards.slice(5));

    console.log(`player1: ${player1}`);
    console.log(`player2: ${player2}`);

    break;
  }
  
  return wins;
}

class PlayingCard {
  static _valueMap = new Map([
    ['2', 2], ['3', 3], ['4', 4], ['5', 5],
    ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['T', 10],
    ['J', 11], ['Q', 12], ['K', 13], ['A', 14],
  ]);

  static _suitMap = new Map([
    ['S', 4], ['H', 3], ['D', 2], ['C', 1],
  ]);

  static values() {
    return this._valueMap.keys();
  }

  constructor(face, suit) {
    this._face = face;
    this._suit = suit;
    this._value = PlayingCard._valueMap.get(face);
  }

  get face() {
    return this._face;
  }

  get suit() {
    return this._suit;
  }

  get value() {
    return this._value;
  }

  static fromString(str) {
    return new PlayingCard(str.charAt(0), str.charAt(1))
  }

  toString() {
    return `PlayingCard {face: ${ this._face}, suit: ${this._suit}}`
  }

  compare(other) {
    return other._value - this._value;
  }
}

class PokerHand {
  static ranks = {
    highCard: 1,
    onePair: 2,
    twoPairs: 3,
    threeOfAKind: 4,
    straight: 5,
    flush: 6,
    fullHouse: 7,
    fourOfAKind: 8,
    straightFlush: 9,
    royalFlush: 10,
  };
  
  constructor(cards) {
    if (cards !== undefined) {
      this._cards = cards.slice(0, 5);
      this._cards.sort((a, b) => a.compare(b))
    } else {
      this._cards = new Array(5);
    }
  }

  get cards() {
    return this._cards;
  }

  static fromStringArray(stringArray) {
    return new PokerHand(
      stringArray.map(PlayingCard.fromString)
    );
  }

  toString() {
    return `PokerHand {${this._cards.join(", ")}}`;
  }

  isRoyalFlush() {
    return this.isStraight()
      && this.isFlush()
      && this._cards[0].face === "A";
  }

  isStraightFlush() {
    return this.isStraight()
      && this.isFlush();
  }

  isFourOfAKind() {
    const counts = [...this._getFaceCounts().values()];
    return counts.includes(4);
  }

  isFullHouse() {
    const counts = [...this._getFaceCounts().values()];
    return counts.includes(3) && counts.includes(2);
  }
 
  isFlush() {
    const suits = new Set(this._cards.map((card) => card.suit));
    return suits.size === 1;
  }

  isStraight() {
    const values = this._cards.map((card) => card.value);
    return values.every((value, i) => {
      if (i === 0) return true;
      return value === values[i - 1] - 1;
    });
  }

  isThreeOfAKind() {
    const counts = [...this._getFaceCounts().values()];
    return counts.includes(3);
  }

  isTwoPairs() {
    const counts = [...this._getFaceCounts().values()];
    const pairs = counts.filter((count) => count === 2);
    return (pairs.length === 2);
  }

  isOnePair() {
    const counts = [...this._getFaceCounts().values()];
    const pairs = counts.filter((count) => count === 2);
    return (pairs.length === 1);
  }

  _getFaceCounts() {
    let faceCounts = new Map();

    for (let card of this._cards) {
      let face = card.face;
      let count = faceCounts.get(face) || 0;
      faceCounts.set(face, count + 1);
    }

    return faceCounts;
  }
}

const testArr = [
  '8C TS KC 9H 4S 7D 2S 5D 3S AC',
  '5C AD 5D AC 9C 7C 5H 8D TD KS',
  '3H 7H 6S KC JS QH TD JC 2D 8S',
  'TH 8H 5C QS TC 9H 4D JC KS JS',
  '7C 5H KC QH JD AS KH 4C AD 4S'
];

// pokerHands(testArr);

let cards = ["TS", "JS", "KS", "QS", "AS"];
let hand = PokerHand.fromStringArray(cards);
// console.log(hand);
// console.log(hand.isFlush());
// console.log(hand.isStraight());
// console.log(hand.isStraightFlush());
// console.log(hand.isRoyalFlush());
// console.log(hand.isFourOfAKind());

cards = ["AS", "AH", "AD", "4C", "2S"];
hand = PokerHand.fromStringArray(cards);

console.log(hand);
console.log(hand.isFlush());
console.log(hand.isStraight());
console.log(hand.isStraightFlush());
console.log(hand.isRoyalFlush());
console.log(hand.isFourOfAKind());
console.log(hand.isThreeOfAKind());

console.log(hand._getFaceCounts());
