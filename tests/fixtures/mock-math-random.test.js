import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  afterAll,
} from 'vitest';

import {
  replaceMathRandom,
  restoreMathRandom,
  MOCK_NAME as DEFAULT_MOCK_NAME,
} from './mock-math-random.js';

describe('Mock implementation of math.random', () => {
  const RANDOM_VALUE = 0.42;
  const ourMathRandom = () => RANDOM_VALUE;

  beforeEach(() => {
    replaceMathRandom(ourMathRandom);
  });

  afterEach(() => {
    restoreMathRandom();
  });

  test('We should be using our mock Math.random', () => {
    expect(Math.random()).toBe(RANDOM_VALUE);
    expect(Math.random()).toBe(RANDOM_VALUE);
    expect(Math.random).toHaveBeenCalledTimes(2);
  });
});

describe('Once more with a different value', () => {
  const OTHER_VALUE = 0.42;
  const otherMathRandom = () => OTHER_VALUE;

  beforeEach(() => {
    replaceMathRandom(otherMathRandom);
  });

  afterEach(() => {
    restoreMathRandom();
  });

  test('We should be using our other mock Math.random', () => {
    expect(Math.random()).toBe(OTHER_VALUE);
    expect(Math.random()).toBe(OTHER_VALUE);
    expect(Math.random).toHaveBeenCalledTimes(2);
  });
});

describe('Mocking Math.random in individuual tests', () => {
  afterAll(() => {
    restoreMathRandom();
  });

  test('Replacing in a singlel test', () => {
    const RANDOM_VALUE = 0.42;
    replaceMathRandom(() => RANDOM_VALUE);
    expect(Math.random()).toBe(RANDOM_VALUE);
    expect(Math.random()).toBe(RANDOM_VALUE);
    expect(Math.random).toHaveBeenCalledTimes(2);
    restoreMathRandom();
  });

  test('The mock should have a default name', () => {
    const RANDOM_VALUE = 0.42;
    replaceMathRandom(() => RANDOM_VALUE);
    expect(Math.random.getMockName()).toBe(DEFAULT_MOCK_NAME);
    restoreMathRandom();
  });

  test('We shold be able to set the mock name', () => {
    const RANDOM_VALUE = 0.42;
    const MY_MOCK_NAME = 'myMockMathFunction';

    replaceMathRandom(() => RANDOM_VALUE, MY_MOCK_NAME);
    expect(Math.random.getMockName()).not.toBe(DEFAULT_MOCK_NAME);
    expect(Math.random.getMockName()).toBe(MY_MOCK_NAME);
    restoreMathRandom();
  });

  test('We should restore Math.random to the original function', () => {
    const RANDOM_VALUE = 0.42;

    replaceMathRandom(() => RANDOM_VALUE);
    expect(Math.random()).toBe(RANDOM_VALUE);
    restoreMathRandom();

    expect(Math.random.name).toBe('random');
    // This may fail every 4.5e+15 runs or so....
    expect(Math.random()).not.toBe(RANDOM_VALUE);
  });
});
