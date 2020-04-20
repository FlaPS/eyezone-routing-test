import * as fsa from '@sha/fsa'
import {combineReducers} from 'redux'
const factory = fsa.actionCreatorFactory('eyezon')

const actions = {
    login: factory.async<{login: string, password: string}, boolean>('login'),
}

const reducer = combineReducers({
    login: actions.login.asyncReducer,
})

export type EyezonState = ReturnType<typeof reducer>

export default {
    reducer,
    actions,
    factory,
}