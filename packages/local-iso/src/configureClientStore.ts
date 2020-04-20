import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { isBrowser } from '@sha/utils'
import { routerMiddleware, connectRouter, getBrowserHistory } from '@sha/router'
import eyezonDuck from './ducks/eyezonDuck'
import {uiDuck} from './ducks/uiDuck'

const clientReducer = (history: History = getBrowserHistory()) =>
    combineReducers({
            router: connectRouter(history),
            eyezon: eyezonDuck.reducer,
            ui: uiDuck.reducer,
        })

export type ClientState = ReturnType<ReturnType<typeof clientReducer>>

const REDUX_DEV_TOOLS = '__REDUX_DEVTOOLS_EXTENSION__'

const configureClientStore = (
    initialState?: ClientState,
    historyInstance: ReturnType<typeof getBrowserHistory> = getBrowserHistory()
) => {

    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(clientReducer(historyInstance), initialState, getFrontEndMiddleware(historyInstance, sagaMiddleware))
    const runSaga = sagaMiddleware.run

    return {...store, runSaga}
}

const getFrontEndMiddleware = (history, sagaMiddleware) =>
    isBrowser() && window[REDUX_DEV_TOOLS]
        ?
        compose(
            applyMiddleware(routerMiddleware(history), sagaMiddleware),
            window[REDUX_DEV_TOOLS](),
        )
        :
        compose(
            applyMiddleware(routerMiddleware(history), sagaMiddleware),
        )

export default configureClientStore
