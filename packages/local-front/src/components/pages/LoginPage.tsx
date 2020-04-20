import React from 'react'
import {Form, Input, Button, Checkbox, Alert} from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import {eyezonDuck} from 'local-iso/src'
import {ClientState} from 'local-iso/src/configureClientStore'
import {EyezonLoginPayload} from 'local-iso/src/ducks/eyezonDuck'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default  () => {
    const dispatch = useDispatch()
    const loginState = useSelector((state: ClientState) => state.eyezon.login)

    const onFinish = (values: EyezonLoginPayload) => {
        dispatch(eyezonDuck.actions.login.started(values))
        console.log('Login Form Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Login Form Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="login"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>



            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Alert message={JSON.stringify(loginState)} />
        </Form>
    );
};