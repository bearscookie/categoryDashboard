/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { Table } from 'antd'
import BoundaryModal from 'page/Dashborad/Modal/Boundary'

import BigBossAbnormal from '../BigBossAbnormal'
import FirstCategoryColumn from '../FirstCatgoryColumn'

import styles from './style.module.less'

const BoundaryTable = (props: any) => {
  const { list = [], level } = props

  const [visbile, setVisbile] = useState<boolean>()

  const [clickRecord, setClickRecord] = useState<any>()

  const handleClick = (text: string, record: any) => {
    if (level !== 0) {
      return
    }
    if (text === '正常') {
      return
    }
    setVisbile(true)
    setClickRecord(record)
  }

  const getColumns = () => {
    if (level === 0) {
      return [
        {
          title: '一级部门',
          dataIndex: 'departmentName',
          key: 'departmentName',
        },
        {
          title: '负责一级品类',
          dataIndex: 'categoryName',
          key: 'categoryName',
           render: text => <FirstCategoryColumn text={text} />,
        },
        {
          title: 'C-2负责人',
          dataIndex: 'c2User',
          key: 'c2User',
        },
        {
          title: 'Big Boss数量',
          dataIndex: 'bigBossNum',
          key: 'bigBossNum',
        },
        {
          title: 'SKU数超出边界线二级品类',
          dataIndex: 'skuExceedSecondCategory',
          key: 'skuExceedSecondCategory',
          render: (text: any, record: any) => (
            <div
              onClick={() => {
                handleClick(text, record)
              }}
            >
              <BigBossAbnormal text={text} />
            </div>
          ),
        },
        {
          title: 'SKU数超出边界线Big Boss',
          dataIndex: 'skuExceedBoundaryBigBoss',
          key: 'skuExceedBoundaryBigBoss',
        },
      ]
    }
    if (level === 1 || level === 2) {
      return [
        {
          title: '二级部门 ',
          dataIndex: 'departmentName',
          key: 'departmentName',
        },
        {
          title: '负责二级品类 ',
          dataIndex: 'departmentName',
          key: 'departmentName',
          render: text => <FirstCategoryColumn text={text} />,
        },
        {
          title: 'Big Boss',
          dataIndex: 'bigBossNum',
          key: 'bigBossNum',
        },
        {
          title: '在线SKU数',
          dataIndex: 'sku',
          key: 'sku',
        },
        {
          title: '同比',
          dataIndex: 'yoy',
          key: 'yoy',
        },
        // TO DO
        {
          title: '是否超出边界线',
          dataIndex: '是否超出边界线',
          key: '是否超出边界线',
          render: (text: any, record: any) => {
        const { sku = 0, skuMax = 0, skuMin = 0 } = record
        if (Number(sku) > Number(skuMax)) {
          return <div className="abnormalStyle">超出上限</div>
        }
        if (Number(sku) < Number(skuMin)) {
          return <div className="abnormalStyle">低于下限</div>
        }
        return <div className="normalStyle">正常</div>
      },
        },
        {
          title: 'SKU数下限',
          dataIndex: 'skuMin',
          key: 'skuMin',
        },
        {
          title: 'SKU数上限',
          dataIndex: 'skuMax',
          key: 'skuMax',
        },
      ]
    }
  }

  return (
    <>
      <Table scroll={{ y: 500 }} bordered dataSource={list} columns={getColumns()} pagination={false} />
      {visbile && (
        <BoundaryModal
          formData={props.formData}
          clickRecord={clickRecord}
          handleCancel={() => {
            setVisbile(false)
          }}
          handleOk={() => {
            setVisbile(false)
          }}
          visible={visbile}
        />
      )}
    </>
  )
}
export default BoundaryTable
