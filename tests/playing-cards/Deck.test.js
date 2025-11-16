import { describe, test, expect } from "vitest";
import { Deck } from "../../src/playing-cards/Deck.js";
import { Card } from "../../src/playing-cards/Card.js";
import { PlayingCardError } from "../../src/playing-cards/PlayingCardError.js";

describe("Class Deck", () => {
  const expectedsize = 52;

  test("Constructor", () => {
    const deck = new Deck();
    expect(deck).toBeInstanceOf(Deck);
  });

  test("There shold be 52 cards in a fresh deck", () => {
    const deck = new Deck();
    expect(deck.size).toBe(expectedsize);
    expect(deck.cardsRemaining).toBe(expectedsize);
  });

  test("The deck should be iterable", () => {
    const deck = new Deck();
    const cards = [...deck];
    expect(cards.length).toBe(expectedsize);
  });

  test("We can shuffle the deck", () => {
    const deck = new Deck();
    const oldOrder = [...deck];

    deck.shuffle();

    const newOrder = [...deck];
    expect(newOrder).not.toEqual(oldOrder);
  });

  test("We can deal a single card by default", () => {
    const deck = new Deck();
    const card = deck.deal();
    const expectedCardsRemaining = deck.size - 1;

    expect(card).not.toBeNull();
    expect(card).toBeInstanceOf(Card);
    expect(deck.cardsRemaining).toBe(expectedCardsRemaining);
  });

  test("We can deal a single card", () => {
    const deck = new Deck();
    const card = deck.deal(1);
    const expectedCardsRemaining = deck.size - 1;

    expect(card).not.toBeNull();
    expect(card).toBeInstanceOf(Card);
    expect(deck.cardsRemaining).toBe(expectedCardsRemaining);
  });

  test("We can deal multiple cards", () => {
    const cardsToDeal = 5;
    const deck = new Deck();
    const hand = deck.deal(cardsToDeal);
    const expectedCardsRemaining = deck.size - cardsToDeal;

    expect(hand).not.toBeNull();
    expect(hand).toBeInstanceOf(Array);
    expect(hand.length).toBe(cardsToDeal);
    expect(hand[0]).toBeInstanceOf(Card);
    expect(deck.cardsRemaining).toBe(expectedCardsRemaining);
  });

  test(`The deal method shold throw on invalid values`, () => {
    const deck = new Deck();
    expect(() => deck.deal(0)).toThrow(
      new PlayingCardError(`Invalid number of cards: 0`)
    );
    expect(() => deck.deal(deck.size + 1)).toThrow(
      new PlayingCardError(`Invalid number of cards: ${deck.size + 1}`)
    );
  });

  test("We can deal a single card by default to multiple players", () => {
    const numberOfPlayers = 3;
    const cardsToDeal = 1;

    const deck = new Deck();
    const hands = deck.multiPlayerDeal(numberOfPlayers);

    const expectedCardsRemaining = deck.size - numberOfPlayers * cardsToDeal;

    expect(hands).toBeInstanceOf(Array);
    expect(hands.length).toBe(numberOfPlayers);
    expect(hands.every((hand) => hand instanceof Card)).toBe(true);
    expect(deck.cardsRemaining).toBe(expectedCardsRemaining);
  });

  test("We can deal a single card to multiple players", () => {
    const numberOfPlayers = 3;
    const cardsToDeal = 1;

    const deck = new Deck();
    const hands = deck.multiPlayerDeal(numberOfPlayers, cardsToDeal);

    const expectedCardsRemaining = deck.size - numberOfPlayers * cardsToDeal;

    expect(hands).toBeInstanceOf(Array);
    expect(hands.length).toBe(numberOfPlayers);
    expect(hands.every((hand) => hand instanceof Card)).toBe(true);
    expect(deck.cardsRemaining).toBe(expectedCardsRemaining);
  });

  test("We can deal multiple cards to multiple players", () => {
    const numberOfPlayers = 3;
    const cardsToDeal = 5;

    const deck = new Deck();
    const hands = deck.multiPlayerDeal(numberOfPlayers, cardsToDeal);

    const expectedCardsRemaining = deck.size - numberOfPlayers * cardsToDeal;

    expect(hands.length).toBe(numberOfPlayers);
    expect(hands.every((hand) => hand instanceof Array)).toBe(true);
    expect(hands.every((hand) => hand.length === cardsToDeal)).toBe(true);
    expect(hands.every((hand) => hand[0] instanceof Card)).toBe(true);
    expect(deck.cardsRemaining).toBe(expectedCardsRemaining);
  });

  test.for([[0, 1], [Deck.NUMBER_OF_CARDS + 1]])(
    "The multiPlayerDeal method should throw on invalid numberOfPlayers",
    ([numberOfPlayers, cardsToDeal]) => {
      const deck = new Deck();
      expect(() => {
        deck.multiPlayerDeal(numberOfPlayers, cardsToDeal);
      }).toThrow(
        new PlayingCardError(`Invalid number of players: ${numberOfPlayers}`)
      );
    }
  );

  test.for([
    [2, 0],
    [2, Deck.NUMBER_OF_CARDS],
  ])(
    "The multiPlayerDeal method should throw on invalid numberOfCards",
    ([numberOfPlayers, cardsToDeal]) => {
      const deck = new Deck();
      expect(() => {
        deck.multiPlayerDeal(numberOfPlayers, cardsToDeal);
      }).toThrow(
        new PlayingCardError(
          `Invalid number of cards: ${numberOfPlayers * cardsToDeal}`
        )
      );
    }
  );
});
