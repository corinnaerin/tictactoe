import rootSaga from '../saga/root-saga';
import { INITIAL_STATE, reducer } from './reducers';
import * as Redux from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

/* tslint:disable-next-line no-string-literal */
const devTools: (f: any) => any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;

const store: Redux.Store<any> =
    Redux.createStore(
        reducer,
        INITIAL_STATE,
        Redux.compose(
            Redux.applyMiddleware(
                sagaMiddleware
            ),
            devTools
        )
    );

sagaMiddleware.run(rootSaga);

export default store;
