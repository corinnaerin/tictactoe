import rootSaga from '../saga/root-saga';
import { INITIAL_STATE, universalReducer } from './reducers';
import * as Redux from 'redux';
import createSagaMiddleware from 'redux-saga';
import ApplicationState from '../model/application-state';

const sagaMiddleware = createSagaMiddleware();

/* tslint:disable-next-line no-string-literal */
const devTools: (f: any) => any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;

const store: Redux.Store<ApplicationState> =
    Redux.createStore(
        universalReducer,
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
