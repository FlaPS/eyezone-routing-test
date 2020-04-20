import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, BarsOutlined, HomeOutlined, } from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {ClientState} from 'local-iso/src/configureClientStore'


export default ({history}) => {
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
                <Menu.Item key={loggedIn ? '/profile' : '/login'}>
                    <UserOutlined />
                    Profile {loggedIn ? ' LoggedIn !' : null}
                </Menu.Item>
            </Menu>
}