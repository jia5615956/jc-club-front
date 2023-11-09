import { useState } from 'react'
import { Input, Button, Space } from 'antd'
import LoginQrcode from '@imgs/login_qrcode.jpg'
import req from '@utils/request';

import './index.less'

const loginApiName = '/user/doLogin'

const Login = () => {

    const [validCode, setValidCode] = useState('')
    const changeCode = e => {
        setValidCode(e.target.value)
    }

    const doLogin = () => {
        if (!validCode) return
        req({
            method: 'get',
            url: loginApiName,
            data: { validCode }
        })
    }

    return (<div className="login-box">
        <div className='login-container-inner'>
            <div className='notes'>LeNet-5 诞生
                1998 年 11 月，早期经典卷积神经网络 LeNet-5 诞生。杨立昆、莱昂·伯托等发表经典论文“Gradient-Based Learning Applied to Document Recognition”，文章总结了应用于手写字符识别的各种模型并进行了比对，结果显示卷积神经网络表现超群。</div>
            <div className='qrcode-box'>
                <div className='qrcode-img'>
                    <img src={LoginQrcode} alt="" />
                </div>
                <div className='qrcode-form'>
                    <Space>
                        <Input maxLength={3} placeholder='验证码' onChange={changeCode} value={validCode} />
                        <Button type='primary' ghost onClick={doLogin}>登录</Button>
                    </Space>
                </div>
            </div>
        </div>
    </div>)
}

export default Login