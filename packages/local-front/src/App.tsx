import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, history  } from '@sha/router'
import { HistoryContext, useSubscribe } from './contexts'
import DesktopRoot from './components/DesktopRoot'

const App = ({store}) => {
    return (
        <Provider store={store}>
            <HistoryContext.Provider value={history}>
                <ConnectedRouter history={useSubscribe(HistoryContext)}>
                    <DesktopRoot />
                </ConnectedRouter>
            </HistoryContext.Provider>
        </Provider>
    )
}

export default App
