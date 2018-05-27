import * as Redux from 'redux';

export default interface Action extends Redux.Action {
  input?: any;
  data?: any;
  error?: string;
}