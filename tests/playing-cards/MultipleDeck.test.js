import { describe, expect, test } from "vitest";
import { MultipleDeck } from "../../src/playing-cards";

describe("The Multipledeck class", () => {
  test("Should exist", () => {
    expect(new MultipleDeck()).toBeInstanceOf(MultipleDeck);
  });
});
