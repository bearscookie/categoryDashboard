/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { Modal, Table, Input } from 'antd'
import { getBigEventForAdd } from 'src/services/BigEventManage'

import styles from './style.module.less'

const SelectEventModal = (props: any) => {
  const [list, setList] = useState<any[]>()
  const [selectedBigEvent, setSelectedBigEvent] = useState<any>()
  const [customBigEvent, setCustomBigEvent] = useState<any[]>()
  const onInputCustom = (e: any, record: any) => {
    const newVal = record
    newVal.bigEvent = e.target.value
    setCustomBigEvent(newVal)
  }
  const columns: any = [
    {
      title: '大事件领域',
      dataIndex: 'region',
      render: (text: any) => <div className={styles.rgnr}>{text}</div>,
    },
    {
      title: '建议大事件',
      dataIndex: 'bigEvent',
      render: (text: any, record: any) => {
        if (record.region === '自定义') {
          return (
            <div>
              <Input
                defaultValue={customBigEvent}
                onChange={event => onInputCustom(event, record)}
                style={{ width: 350, marginLeft: 10 }}
              />
            </div>
          )
        }
        if (props.categoryRole === '尝新' && record.newRole === '1') {
          return <div className={styles.rgbg}>{text}</div>
        }
        if (props.categoryRole === '目的地(待打造)' && record.pending === '1') {
          return <div className={styles.rgbg}>{text}</div>
        }
        if (props.categoryRole === '引流' && record.drainage === '1') {
          return <div className={styles.rgbg}>{text}</div>
        }
        if (props.categoryRole === '小众专业' && record.small === '1') {
          return <div className={styles.rgbg}>{text}</div>
        }
        if (props.categoryRole === '目的地(现存)' && record.target === '1') {
          return <div className={styles.rgbg}>{text}</div>
        }
        return <div className={styles.rgnr}>{text}</div>
      },
    },
    {
      title: '推荐',
      dataIndex: 'rec',
      render: (text: any, record: any) => {
        if (props.categoryRole === '尝新' && record.newRole === '1') {
          return <div className={styles.rgbg}>尝新品类推荐</div>
        }
        if (props.categoryRole === '目的地(待打造)' && record.pending === '1') {
          return <div className={styles.rgbg}>目的地(待打造)品类推荐</div>
        }
        if (props.categoryRole === '引流' && record.drainage === '1') {
          return <div className={styles.rgbg}>引流品类推荐</div>
        }
        if (props.categoryRole === '小众专业' && record.small === '1') {
          return <div className={styles.rgbg}>小众专业品类推荐</div>
        }
        if (props.categoryRole === '目的地(现存)' && record.target === '1') {
          return <div className={styles.rgbg}>目的地(现存)品类推荐</div>
        }
        return ''
      },
    },
  ]

  const getAllBigEvent = async () => {
    const res = await getBigEventForAdd()
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setList(res.data.data)
    }
  }

  useEffect(() => {
    getAllBigEvent()
  }, [])

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedBigEvent(selectedRows[0])
    },
  }

  const handleOk = () => {
    if (selectedBigEvent.region === '自定义') {
      setSelectedBigEvent(customBigEvent)
    }
    props.handleOk(selectedBigEvent)
  }

  return (
    <>
      <Modal
        className={styles.selectModal}
        title="大事件选择"
        width={884}
        open={props.visible}
        onOk={handleOk}
        onCancel={props.handleCancel}
      >
        <div style={{ maxHeight: 500, overflow: 'auto', padding: '0 5px' }}>
          <Table
            bordered
            rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
            className={styles.bigEventTable}
            pagination={false}
            // @ts-ignore
            rowKey={(record: any, index) => index}
            columns={columns}
            dataSource={list || []}
          />
        </div>
      </Modal>
    </>
  )
}

export default SelectEventModal
