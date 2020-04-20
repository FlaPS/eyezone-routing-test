import {push, dispatchOnRouteSaga, history, takeLatestRoute} from '@sha/router'
import nav from '../nav'
import {ClientState} from '../configureClientStore'
import { select } from 'redux-saga/effects'

export function* profileSaga() {
    yield takeLatestRoute(nav.profile, checkLogin)
}

function* checkLogin(action) {
    const state: ClientState = yield select()
    const loginState = state.eyezon.login

    if(
        loginState.status !== 'done'
    ) {
        history.replace(nav.login.pattern)
    }
}