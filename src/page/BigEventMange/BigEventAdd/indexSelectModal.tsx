/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal, Radio, Select, Space, Steps, Table } from 'antd'
import { getBigEventForAdd } from 'src/services/BigEventManage'

import styles from './style.module.less'

const IndexSelectModal = (props: any) => {
  const [raidoValue, setRaidoValue] = useState(1)

  let selectValue = ''

  let inputValue = ''

  const handleRadioChange = (e: any) => {
    setRaidoValue(e.target.value)
  }

  const handleSelectChange = (val: any) => {
    selectValue = val
  }

  const handleInputChange = (e: any) => {
    inputValue = e.target.value
  }

  const onOk = () => {
    if (raidoValue === 1) {
      props.handleOk(props?.selectedBigEvent?.index)
    }
    if (raidoValue === 2) {
      if (!selectValue) {
        message.error('请选择自选指标')
        return
      }
      props.handleOk(selectValue)
    }
    if (raidoValue === 3) {
      if (!inputValue) {
        message.error('请输入自定义指标')
        return
      }
      props.handleOk(inputValue)
    }
  }

  return (
    <>
      <Modal
        className={styles.selectModal}
        title="指标选择"
        width={884}
        open={props.visible}
        onOk={onOk}
        onCancel={props.handleCancel}
      >
        <div style={{ marginTop: 30 }}>
          <Radio.Group defaultValue={raidoValue} style={{ width: '100%' }} onChange={handleRadioChange}>
            <Space direction="vertical" style={{ width: '100%', display: 'block' }}>
              <Radio value={1} style={{ marginTop: 20 }}>
                <div>优先指标推荐</div>
              </Radio>
              <div style={{ marginTop: 10 }}>
                <Input disabled value={props?.selectedBigEvent?.index} style={{ width: 750 }} />
              </div>
              <Radio value={2} style={{ marginTop: 20 }}>
                <div>自选指标</div>
              </Radio>
              <div style={{ marginTop: 10 }}>
                <Select
                  onChange={handleSelectChange}
                  placeholder="搜索或下拉自选指标"
                  style={{ width: 750 }}
                  options={[
                    {
                      value: 'KA 独家商品 SKU数',
                      label: 'KA 独家商品 SKU数',
                    },
                    {
                      value: '自有品牌 SKU数',
                      label: '自有品牌 SKU数',
                    },
                    {
                      value: '中腰部品牌GMV占比',
                      label: '中腰部品牌GMV占比',
                    },
                    {
                      value: '新品GMV占比',
                      label: '新品GMV占比',
                    },
                    {
                      value: '新品SKU占比',
                      label: '新品SKU占比',
                    },
                  ]}
                />
              </div>
              <Radio value={3} style={{ marginTop: 20 }}>
                自定义指标
              </Radio>
              <Input
                onChange={handleInputChange}
                style={{ width: 750, marginTop: 10 }}
                placeholder="输入追踪大事件的自定义指标"
              />
            </Space>
          </Radio.Group>
        </div>
      </Modal>
    </>
  )
}

export default IndexSelectModal
