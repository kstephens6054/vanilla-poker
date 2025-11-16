import { describe, expect, test } from "vitest";
import { Deck, MultipleDeck } from "../../src/playing-cards";

describe("The Multipledeck class", () => {
  test("The default constructor should return a 52 card deck", () => {
    const deck = new MultipleDeck();
    expect(deck).toBeInstanceOf(MultipleDeck);
    expect(deck.size).toBe(Deck.NUMBER_OF_CARDS);
  });

  test.for([
    { numberOfDecks: 1, expectedSize: 1 * Deck.NUMBER_OF_CARDS },
    { numberOfDecks: 2, expectedSize: 2 * Deck.NUMBER_OF_CARDS },
    { numberOfDecks: 3, expectedSize: 3 * Deck.NUMBER_OF_CARDS },
  ])(
    "Calling new MultipleDeck($numberOfDecks) should return a $expectedSize card deck",
    ({ numberOfDecks, expectedSize }) => {
      const deck = new MultipleDeck(numberOfDecks);
      expect(deck.size).toBe(expectedSize);
      expect(deck.cardsRemaining).toBe(expectedSize);
    }
  );

  test("We should be able to deal more than 52 cards", () => {
    const deck = new MultipleDeck(2);
    const hand = deck.deal(2 * Deck.NUMBER_OF_CARDS);
    expect(hand.length).toBe(2 * Deck.NUMBER_OF_CARDS);
  });

  test("We should be able to deal more than 52 cards to muultiple players", () => {
    const numberOfDecks = 2;
    const numberOfPlayers = 50;
    const numberOfCards = 2;

    const deck = new MultipleDeck(numberOfDecks);
    const hands = deck.multiPlayerDeal(numberOfPlayers, numberOfCards);
    expect(hands.length).toBe(numberOfPlayers);
    expect(hands[0].length).toBe(numberOfCards);
  });
});
