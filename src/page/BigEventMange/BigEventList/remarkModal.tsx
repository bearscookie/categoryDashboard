import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal, Steps } from 'antd'
import { addBigEventComment, getBigEventComment } from 'src/services/BigEventManage'

import styles from './style.module.less'

const RemarkModal = (props: any) => {
  const [remark, setRemark] = useState<any>()

  const [list, setList] = useState<any[]>([])

  const handleChange = (val: any) => {
    setRemark(val.target.value)
  }

  console.log('props?.clickRecord:::', props?.clickRecord)
  // 更新批注
  const handleOk = async () => {
    const res = await addBigEventComment({
      comment: remark,
      id: props?.clickRecord?.id,
      operator: '马小免',
    })
    if (res && res.data && res.data.code === 200) {
      props.handleOk()
      message.success('批注更新成功')
    }
  }

  const getRemarkList = async () => {
    const res = await getBigEventComment({
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
              <span>批注内容</span>
              <span>{ele.comment}</span>
            </div>
          ),
        }))
        setList(li)
      }
    }
  }

  useEffect(() => {
    getRemarkList()
  }, [])

  return (
    <>
      <Modal
        width={884}
        title="大事件批注"
        open={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <div style={{ maxHeight: 500, overflow: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <Input.TextArea
              className={styles.remarkTextrea}
              style={{ height: 194 }}
              maxLength={500}
              placeholder="输入批注内容，及时给予大事件反馈"
              onChange={handleChange}
              autoSize={false}
            />
            <div className={styles.remarkBtns}>
              <Button style={{ marginRight: 20 }} className={styles.cancel} onClick={props.handleCancel}>
                取消
              </Button>
              <Button type="primary" onClick={handleOk} className={styles.publish} disabled={!remark?.length}>
                发布
              </Button>
            </div>
          </div>
          {Boolean(list?.length) && (
            <>
              <div className={styles.remarkTitle}>批注记录</div>
              <div className={styles.setpContent}>
                <Steps progressDot current={1} direction="vertical" items={list} />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default RemarkModal
