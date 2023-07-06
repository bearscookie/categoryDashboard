/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, message, Modal, Radio, Steps } from 'antd'
import { getBigEventLog, updateBigEventProgress } from 'src/services/BigEventManage'

import styles from './style.module.less'
import moment from 'moment'

const UpdateProgressModal = (props: any) => {
  const [form] = Form.useForm()
  const { clickRecord } = props

  const [status, setStatus] = useState()

  const [list, setList] = useState<any[]>([])

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(async vals => {
        const param = {
          ...vals,
          endDate: vals.endDate.format('YYYY-MM'),
          id: props?.clickRecord?.id,
          operator: '马小免',
        }
        const res = await updateBigEventProgress(param)
        if (res && res.data && res.data.code === 200) {
          message.success('进展更新成功')
          props.handleOk()
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  // 获取进展状态
  const getProgress = async () => {
    const res = await getBigEventLog({
      id: props?.clickRecord?.id,
    })
    if (res && res.data && res.data.code === 200) {
      if (res && res.data && res.data.code === 200) {
        const li = res.data?.data?.map((ele: any) => ({
          title: (
            <div className={styles.listTop}>
              <span> {ele.operator}</span> <span>{ele.date}</span>
            </div>
          ),
          description: (
            <div className={styles.comment}>
              <div>
                <span>进展状态</span>
                <span>{ele.status}</span>
              </div>
              <div>
                <span>风险项</span>
                <span>{ele.riskItem}</span>
              </div>
              <div>
                <span>风险应对方案</span>
                <span>{ele.riskSolution}</span>
              </div>
            </div>
          ),
        }))
        setList(li)
      }
    }
  }

  const handleChange = e => {
    setStatus(e.target.value)
  }

  useEffect(() => {
    getProgress()
    console.log('clickRecord:::', props.clickRecord)
    form.setFieldsValue({
      endDate: moment(props.clickRecord?.endDate),
    })
  }, [])

  return (
    <>
      <Modal
        width={884}
        title="大事件进展更新"
        open={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <div style={{ maxHeight: 500, overflow: 'auto' }}>
          <Form {...layout} form={form} name="control-hooks" style={{ maxWidth: 600 }}>
            <Form.Item name="大事件" label="大事件">
              {clickRecord?.content}
            </Form.Item>
            <Form.Item name="大事件描述" label="大事件描述">
              {clickRecord?.description}
            </Form.Item>
            <Form.Item name="开始时间" label="开始时间">
              {clickRecord?.beginDate?.slice(0, 7)}
            </Form.Item>
            <Form.Item name="endDate" label="结束时间" rules={[{ required: true }]}>
              <DatePicker picker="month" />
            </Form.Item>
            <Form.Item
              name="status"
              label="进展状态"
              rules={[{ required: true }]}
              extra="进度有风险时，需要填写风险项及应对举措"
            >
              <Radio.Group onChange={handleChange}>
                <Radio value="暂无进展">暂无进展</Radio>
                <Radio value="进度正常">进度正常</Radio>
                <Radio value="低风险">低风险</Radio>
                <Radio value="高风险">高风险</Radio>
                <Radio value="已完成">已完成</Radio>
              </Radio.Group>
            </Form.Item>
            {(status === '低风险' || status === '高风险') && (
              <>
                <Form.Item name="riskItem" label="风险项" rules={[{ required: true }]}>
                  <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="riskSolution" label="风险应对方案" rules={[{ required: true }]}>
                  <Input.TextArea placeholder="请输入" maxLength={500} />
                </Form.Item>
              </>
            )}
          </Form>
          <div className={styles.prBtn}>
            <Button style={{ marginRight: 20 }} className="commonCancel" onClick={props.handleCancel}>
              取消
            </Button>
            <Button type="primary" className="commonOk" htmlType="submit" onClick={handleOk}>
              发布
            </Button>
          </div>
          {Boolean(list.length) && (
            <>
              <div className={styles.remarkTitle}>更新记录</div>
              <div>
                <Steps progressDot current={1} className={styles.setpContent} direction="vertical" items={list} />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default UpdateProgressModal
