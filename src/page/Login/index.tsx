/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/require-default-props */
import React from 'react'
import { Button, Form, Input, message } from 'antd'

import loginLeft from '../../assets/images/categroy-icon/loginLeft.png'

import styles from './style.module.less'

const correctAP: any = {
  username: 'categoryadmin',
  password: 'bcg123456#',
}

const onFinish = (values: any) => {
  if (values.password === correctAP.password && values.username === correctAP.username) {
    localStorage.setItem('userName', values.username)
    window.location.href = '/dashborard/supermarket'
  } else {
    message.error('账号密码不正确请重新输入')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Login: React.FC<any> = () => (
  <div className={styles.loginContent}>
    <div className={`${styles.section_1} ${styles['flex-row']}`}>
      <div className={`${styles['image-wrapper_1']} ${styles['flex-col']}`}>
        <img className={`${styles.image_1}`} referrerPolicy="no-referrer" src={loginLeft} />
      </div>
      <div className={`${styles.group_3} ${styles['flex-col']}`}>
        <div className={styles.title_desc}>大商超品类仪表盘</div>
        <div className={styles.form_wrap}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            className={styles.form_wrap_c}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="用户名" style={{ marginTop: 0 }} className={styles.userOrPwd} />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="密码" className={styles.userOrPwd} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit" className={styles['submit-btn']}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  </div>
)
export default Login
