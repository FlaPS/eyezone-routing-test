import React from 'react'
import {nav} from 'local-iso/src'
import ProfilePage from './pages/ProfilePage'
import IndexPage from './pages/IndexPage'
import NewsPage from './pages/NewsPage'
import LoginPage from './pages/LoginPage'
import {Route} from '@sha/router'

const routes =  [
    {
        nav: nav.profile,
        label: 'Профиль',
        Component: ProfilePage,
    },
    {
        nav: nav.index,
        label: 'Главная',
        Component: IndexPage,
    },
    {
        nav: nav.login,
        label: 'Логин',
        Component: LoginPage,
    },
    {
        nav: nav.news,
        label: 'Новости',
        Component: NewsPage,
    },
]

export default routes
    .map(({ Component, nav, exact = true }) => (
        <Route

            exact={exact}
            key={nav.pattern}
            path={nav.pattern}
            render={props => (
                // @ts-ignore
                <Component {...props.match.params as any} />
            )}
        />
    ))
