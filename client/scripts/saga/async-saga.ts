import Action from '../model/action';
import ApplicationState from '../model/application-state';
import * as Redux from 'redux';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

export default class AsyncSaga {
  private readonly requestActionType: string;
  private readonly successActionType: string;
  private readonly failureActionType: string;
  private readonly asyncFunc: (input?: any) => Promise<any>;

  constructor(requestActionType: string, successActionType: string,
              failureActionType: string, asyncFunc: (input?: any) => Promise<any>) {
    this.requestActionType = requestActionType;
    this.successActionType = successActionType;
    this.failureActionType = failureActionType;
    this.asyncFunc = asyncFunc;
  }

  public getRequestAction(input: any): Action {
    return {
      input,
      type: this.requestActionType
    };
  }

  public getSuccessAction(input: any, data: any): Action {
    return {
      data,
      input,
      type: this.successActionType
    };
  }

  public getFailureAction(input: any, error: string): Action {
    return {
      error,
      input,
      type: this.failureActionType
    };
  }

  public * handle(action: Action): IterableIterator<any> {
    try {
      const results = yield call(this.asyncFunc, action.input);
      yield put(this.getSuccessAction(action.input, results));
    } catch (error) {
      console.error(error);
      let errorMessage = 'Unknown error';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      yield put(this.getFailureAction(action.input, errorMessage));
    }
  }

  public * watch(): IterableIterator<any> {
    // FIXME
    yield takeEvery(this.requestActionType, this.handle.bind(this));
  }

  public trigger(store: Redux.Store<ApplicationState>, input?: any): void {
    store.dispatch(this.getRequestAction(input));
  }
}
