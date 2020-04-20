import { fork } from "redux-saga/effects";
import {loginSaga} from './loginSaga'
import {profileSaga} from './profileSaga'

export function* eyezonSaga() {
    yield fork(loginSaga)
    yield fork(profileSaga)
}