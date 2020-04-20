import * as fsa from '@sha/fsa'
import { append, equals, reject } from 'ramda'
import { combineReducers } from 'redux'

export type UIState = ReturnType<typeof reducer>

const factory = fsa.actionCreatorFactory('ui')

const actions = {
    busy: factory<any>('busy'),
    unbusy: factory<any>('unbusy'),
}

const busyReducers = (state: any[] = [], action: fsa.FactoryAnyAction): any[] => {
    if (actions.busy.isType(action))
        return append(action.payload, state)

    if (actions.unbusy.isType(action))
        // @ts-ignore
        return  reject(equals(action.payload), state)

    return state
}

const reducer = combineReducers({
    busy: busyReducers,
})


export const uiDuck = {
    actions,
    reducer,
    isBusy: (state: {ui: UIState}) =>
        state.ui.busy.length > 0
}
