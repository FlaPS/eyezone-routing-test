import { take, put, fork, takeLatest, call } from "redux-saga/effects";
import {eyezonDuck} from '../index'
import {push} from '@sha/router'
import nav from '../nav'
import uiDuck from '../ducks/uiDuck'
import {EyezonLoginPayload, EyezonLoginResult} from '../ducks/eyezonDuck'


export function* loginSaga() {
    yield takeLatest(eyezonDuck.actions.login.started.isType, handleLogin)
    while (true) {
        const loggedIn = yield take(eyezonDuck.actions.login.done.isType)
        yield put(push(nav.profile)())
    }
}

const loginApi = (data: EyezonLoginPayload): Promise<EyezonLoginResult> =>
    fetch('/api/login', {method: 'POST', body: JSON.stringify(data)})
        .then(response => response.json())

function* handleLogin({payload}: ReturnType<typeof eyezonDuck.actions.login.started>) {
    console.log('Login with creds:', payload.login, payload.password)

    yield put(uiDuck.actions.busy('login'))
    try {
        const result = yield call(loginApi, payload)
        if(result.statusCode){
            yield put(eyezonDuck.actions.login.failed({
                params: payload,
                errors: [JSON.stringify(result)]
            }))
        }
        else
            yield put(eyezonDuck.actions.login.done({result, params: payload}))
    } catch(e) {
        yield put(eyezonDuck.actions.login.failed({
            params: payload,
            errors: [JSON.stringify(e)]
        }))
    }

    yield put(uiDuck.actions.unbusy('login'))
}