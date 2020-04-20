import React from 'react'
import {ConnectedRouter, Switch} from '@sha/router'
import {HistoryContext, useSubscribe} from '../contexts'
import {Card, Spin} from 'antd'
import {useSelector} from 'react-redux'
import uiDuck from 'local-iso/src/ducks/uiDuck'
import routes from './routes'
import { Layout, Menu, Breadcrumb } from 'antd'
import 'antd/dist/antd.css'
import AppMenu from './AppMenu'

const { Header, Content, Footer } = Layout

export default () => {

    const isBusy = useSelector(uiDuck.isBusy)

    return  <Spin spinning={isBusy}>
                <Layout>
                    <Header>
                        <AppMenu history={useSubscribe(HistoryContext)}/>
                    </Header>
                    <Content>
                        <ConnectedRouter history={useSubscribe(HistoryContext)}>
                            <Card>
                                <Switch>
                                    {routes}
                                </Switch>
                            </Card>
                        </ConnectedRouter>
                    </Content>
                </Layout>
            </Spin>
}