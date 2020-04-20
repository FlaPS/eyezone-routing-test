import * as FSA from './fsa'
import * as R from 'ramda'
import {DeepPartial} from 'utility-types'

type ID = string
const defaultPreSelector = state => state.app.bootstrap
const createCRUDDuck = <T = any, ID extends keyof T = any>(
    factoryPrefix: string,
    prop: ID,
    defaultProps: DeepPartial<T> = {} as any,
    handleItem?: (state:T, action: any) => T
) => {
    const get: (state: any) => T[] = state => state.app.bootstrap[factoryPrefix]
    const factory = FSA.actionCreatorFactory(factoryPrefix, {persistent: true})
    type PatchBase = {[P in ID]: string}
    const patchCreator = factory<T>('patched', {persistent: true})
    const actions = {
        reseted: factory<T[]>('reseted',  {persistent: false}),
        added: factory<T>('added',  {persistent: true}),
        removed: factory<ID>('removed',  {persistent: true}),
        patched: Object.assign((patch: PatchBase & Partial<T>, original: Partial<T> = {}) => {
                const diff = {
                    [prop]: patch[prop]
                }

                let diffFlag = false
                for (let [key, value] of Object.entries(patch)) {
                    if(!R.equals(patch[key], original[key])) {
                        diff[key] = patch[key]
                        diffFlag = true
                    }
                }

                return diffFlag
                    ? patchCreator({...diff, [prop]: patch[prop] || original[prop]})
                    : undefined
            },
            {
               ...patchCreator
            }
                ),
        updated: factory<T>('updated', {persistent: true}),
    }

    const crud = FSA.reducerWithInitialState([])
        .case(
            actions.reseted,
            (_, payload) => payload,
        )
        .case(
            actions.added,
            (state, payload) => R.prepend(R.mergeDeepRight(defaultProps, payload), state),
        )
        .case(
            actions.removed,
            (state, payload) => R.reject((obj) => obj[prop] === payload, state),
        )
        .case(
            actions.updated,
            (state, payload) => {
                const index = R.findIndex(
                    R.propEq(
                        prop as string | number,
                        payload[prop],
                    ),
                    state)
                const lens = R.lensIndex(
                    index
                )
                return R.set(lens, payload, state)
            }

        )
        .case(
            actions.patched,
            (state, payload) => {
                const index =    R.findIndex(
                    R.propEq(
                        prop as string | number,
                        payload[prop],
                    ),
                    state)
                if(index === -1)
                    return [...state, payload]


                const arr = [...state]
                let element
                const source = state[index]
                try {
                    element  = R.mergeDeepRight(source, payload)
                }
                catch (e) {
                    debugger
                }
                arr[index] = element
                return arr
            }
        )

    const reducer = crud/*(state, action) => {
        state = crud(state, action)

        const id = action.payload[prop]

        handleItem
    }*/

    const selectById =  (id: string) => (state: any) => {
            const array: T[] = get ? get(state) : state

            for (let i = 0; i < array.length; i ++)
            // @ts-ignore
            if (array[i][prop] === id )
                return array[i]

            //throw new Error(factoryPrefix + ' with id '+id + ' not found')
            return undefined
        }

    const selectPropEq = <K extends (keyof T)>(key: K)=> (value: T[K]) => (state: any) => {
            const array: T[] = get ? get(state) : state
            let items: T[] = []
            for (let i = 0; i < array.length; i ++)
            // @ts-ignore
                if (array[i][key] === value )
                    items.push(array[i])

            return items
        }

    return {
        idKey: prop,
        factory,
        actions,
        reducer,
        isValid: (state, action) => {

            if(
                actions.added.isType(action)
            ) {

                const idToAdd = action.payload[prop]
                if (selectById(idToAdd)(state)) {
                    return 'Id ' + idToAdd + ' already exists in ' + factoryPrefix + ' collection'
                }
            }
            return undefined
        },
        optics: {
            selectAll: (state) => {
                const array: T[] = get ? get(state) : state
                return array
            },
            selectById:  (id: string) => (state: any) => {
                const array: T[] = get ? get(state) : state

                for (let i = 0; i < array.length; i ++)
                    // @ts-ignore
                    if (array[i][prop] === id )
                        return array[i]

                //throw new Error(factoryPrefix + ' with id '+id + ' not found')
                return undefined
            },
            selectPropEq,
            selectEq: (query: Partial<T>) => (state: any) => {
                const array: T[] = get ? get(state) : state
                let items: T[] = R.filter(R.whereEq<Partial<T>>(query), array)

                return items
            },
            selectEqOne: (query: Partial<T>) => (state: any) => {
                const array: T[] = get ? get(state) : state
                let items: T[] = R.filter(R.whereEq<Partial<T>>(query), array)

                return items[0]
            },
            select: (query: Record<keyof Partial<T>, any>) => (state: any) => {
                const array: T[] = get ? get(state) : state
                let items: T[] = []
                for (let i = 0; i < array.length; i++){
                    if(R.where<Partial<T>>(query)(array[i]))
                        items.push(array[i])
                }

                return items
            },

        }
    }
}

export default createCRUDDuck
