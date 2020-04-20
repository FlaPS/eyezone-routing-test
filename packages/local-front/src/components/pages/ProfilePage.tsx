import React from 'react'
import { Descriptions, Badge } from 'antd';
import {useSelector} from 'react-redux'
import {ClientState} from 'local-iso/src/configureClientStore'

export default () => {
    const data = useSelector((state: ClientState) => state.eyezon.login.value)
    return <div>
        Profile data: {JSON.stringify(data)}
    </div>
}