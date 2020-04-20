import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {configureClientStore} from 'local-iso/src'
import {eyezonSaga} from 'local-iso/src/sagas'

const div = document.getElementById('root') as HTMLDivElement

const store = configureClientStore()
store.runSaga(eyezonSaga)

window['redux'] = store

ReactDOM.render(
    React.createElement(App, {store}),
    div
)


