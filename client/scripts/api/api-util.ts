import { TicTacToeRequest } from '../../../common/types';

/**
 * Util class for easily making API calls via fetch()
 */
export default class ApiUtil {

  /**
   * Make a POST request
   * @param {string} url the url to query
   * @param body the body of the request
   * @returns {Promise<any>} the response body
   */
  public static async post(url: string, body: TicTacToeRequest): Promise<any> {
    const response: Response = await fetch(url, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    });
    if (response.ok && response.status === 200) {
      return response.json();
    } else {
      const errorMessage = await response.text();
      throw new Error(`Server responded with status code ${response.status}: ${errorMessage}`);
    }
  }
}
