import { vi } from 'vitest';

const setup = () => {
  const MOCK_NAME = 'mockMathRandom';
  let jsMathRandom = null;

  const replaceMathRandom = (fn, name) => {
    if (jsMathRandom === null) {
      jsMathRandom = Math.random;
    }

    const newMockName = name !== undefined ? name : 'mockMathRandom';

    Math.random = vi.fn(fn).mockName(newMockName);
  };

  const restoreMathRandom = () => {
    if (jsMathRandom !== null) {
      Math.random = jsMathRandom;
      jsMathRandom = null;
    }

    return Math.random;
  };

  return { replaceMathRandom, restoreMathRandom, MOCK_NAME };
};

const { replaceMathRandom, restoreMathRandom, MOCK_NAME } = setup();

export { replaceMathRandom, restoreMathRandom, MOCK_NAME };
