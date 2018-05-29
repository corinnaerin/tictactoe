import { Difficulty } from '../../../common/types';

/**
 * Map from the game difficulty to the icon to use for its moves
 * @type {Map<Difficulty, string>}
 */
const aiIcons = {
  [Difficulty.Easy]: '\uD83D\uDC2D',
  [Difficulty.Medium]: '\uD83E\uDD89',
  [Difficulty.Hard]: '\uD83D\uDE3A',
  [Difficulty.Luna]: () => {
    // Generate a random emoji!
    return String.fromCodePoint(Math.floor(0x1F600 + Math.random() * (0x1F644 - 0x1F600 + 1)));
  }
};

/**
 * Get the icon for the given difficulty
 * @param {Difficulty} difficulty
 * @returns {string}
 */
export const getAiIcon = (difficulty: Difficulty) => {
  const icon = aiIcons[difficulty];
  if (typeof icon === 'function') {
    return icon();
  }
  return icon;
};