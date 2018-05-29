import { Difficulty } from '../../../common/types';

/**
 * Map from the game difficulty to the icon to use for its moves
 * @type {Map<Difficulty, string>}
 */
export const aiIcons = {
  [Difficulty.Easy]: '\uD83D\uDC2D',
  [Difficulty.Medium]: '\uD83E\uDD89',
  [Difficulty.Hard]: '\uD83D\uDE3A'
};