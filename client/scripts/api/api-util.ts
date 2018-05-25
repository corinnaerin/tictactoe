import axios, { AxiosResponse } from 'axios';

export default class ApiUtil {
  public static async get(url: string) {
    try {
      const response: AxiosResponse = await axios.get(url);
      return response.data;
    } catch (e) {
      console.error(e.response ? e.response.statusText : e);
      throw (e.response ? e.response.statusText : e);
    }
  }
}
