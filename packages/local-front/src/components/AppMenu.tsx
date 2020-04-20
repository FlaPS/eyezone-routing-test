import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, BarsOutlined, HomeOutlined, } from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {ClientState} from 'local-iso/src/configureClientStore'
import {push} from '@sha/router'
import * as RR from 'connected-react-router'
const { SubMenu } = Menu


export default ({history}) => {

    const dispatch = useDispatch()

    const location = useSelector((state: ClientState) => state.router.location)

    const loggedIn = useSelector((state: ClientState) => state.eyezon.login.status === 'done')
    const handleItemClick = e =>
        history.push(e.key)

    return <Menu onClick={handleItemClick} selectedKeys={[location ? location.pathname : undefined]} mode="horizontal">
                <Menu.Item key="/">
                    <HomeOutlined />
                    Home
                </Menu.Item>
                <Menu.Item key="/news">
                    <BarsOutlined />
                    News
                </Menu.Item>
                <Menu.Item key={'/profile'}>
                    <UserOutlined />
                    Profile {loggedIn ? ' LoggedIn !' : null}
                </Menu.Item>
            </Menu>
}