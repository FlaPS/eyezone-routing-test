import * as fsa from '@sha/fsa'
import {combineReducers} from 'redux'
const factory = fsa.actionCreatorFactory('eyezon')

const actions = {
    login: factory.async<EyezonLoginPayload, EyezonLoginResult>('login'),
}

const reducer = combineReducers({
    login: actions.login.asyncReducer,
})

export type EyezonState = ReturnType<typeof reducer>

export type EyezonLoginPayload = {
    login: string
    password: string
}

export type EyezonLoginResult = any

export default {
    reducer,
    actions,
    factory,
}