import React, { useState } from 'react'
import { Table,Tooltip, Descriptions } from 'antd'
import BigEventModal from 'page/Dashborad/Modal/BigEvent'

import FirstCategoryColumn from '../FirstCatgoryColumn'

import styles from './style.module.less'
const renderContent = () => (
    <p style={{color:'#d3002c'}}>未完成目标</p>
  )
const BigEventTable = (props: any) => {
  const { list = [], level } = props

  const [visbile, setVisbile] = useState<boolean>()

  const [clickRecord, setClickRecord] = useState<any>()

  const handleClick = (text, record) => {
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
          width: 120,
        },
        {
          title: '负责一级品类',
          dataIndex: 'categoryName',
          key: 'categoryName',
          width: 120,
          render: text => <FirstCategoryColumn text={text} />,
        },
        {
          title: 'C-2负责人',
          dataIndex: 'c2User',
          key: 'c2User',
          width: 110,
        },
        {
          title: 'Big Boss数量',
          dataIndex: 'bigBossNum',
          key: 'bigBossNum',
          width: 80,
          render: (text: any) => text || 0,
        },
        {
          title: '大事件总数',
          dataIndex: 'bigEventTotal',
          key: 'bigEventTotal',
          width: 70,
        },
        {
          title: '进度异常大事件数',
          dataIndex: 'exceptionEventNum',
          key: 'exceptionEventNum',
          width: 70,
          render: (text: any, record: any) => (
            <div
              onClick={() => {
                handleClick(text, record)
              }}
            >
              <p className={text == null || text == '正常' ? styles.normal : styles.abnormality}>
                <b />
                <span>{(text && `${text}件`) || '正常'}</span>
              </p>
            </div>
          ),
        },
        {
          title: '进度异常大事件BigBoss',
          dataIndex: 'exceptionEventBigBoss',
          key: 'exceptionEventBigBoss',
          width: 70,
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
          width: 150,
          render: text => <FirstCategoryColumn text={text} />,
        },
        {
          title: 'Big Boss',
          dataIndex: 'bigBossNum',
          key: 'bigBossNum',
           width: 100,
        },
        {
          title: '品类角色',
          dataIndex: 'categoryRole',
          key: 'categoryRole',
          width: 100,
        },
        {
          title: '大事件',
          dataIndex: 'content',
          key: 'content',
          width: 120,
          render: (text: any, record: any) => {
            return (
              <Tooltip title={text}>
                <p className='bigDec'>{text}</p>
              </Tooltip>
            )
          },
        },
        {
          title: '大事件描述',
          dataIndex: 'description',
          key: 'description',
          width: 120,
           render: (text: any, record: any) => {
            return (
              <Tooltip title={text}>
                <p className='bigDec'>{text}</p>
              </Tooltip>
            )
      }
        },
        {
          title: '指标追踪',
          children: [
            {
              title: '指标',
              dataIndex: 'index',
              key: 'index',
               width: 80,
            },
            {
              title: '适用范围',
              dataIndex: 'mode',
              key: 'mode',
               width: 100,
            },
            {
              title: '现状',
              dataIndex: 'current',
              key: 'current',
              width: 70,
                render: (text: any, record: any) => {
                  return (
                    Number(text) < Number(record.target) ?
                   (<Tooltip title={renderContent()}  overlayClassName={styles.tooltipDesc}>
                      <p className={Number(text) < Number(record.target) ? 'abnormalStyle' : 'normalStyle'}>{text}</p>
                      </Tooltip>)
                      : <span>{ text}</span>
                )
              }
            },
            {
              title: '目标',
              dataIndex: 'target',
              key: 'target',
               width: 70,
            },
            {
              title: '参考值-去年同期',
              dataIndex: 'lastyear',
              key: 'lastyear',
               width: 160,
            },
            {
              title: '参考值-上月',
              dataIndex: 'lastmonth',
              key: 'lastmonth',
               width: 120,
            },
          ],
        },
        {
          title: '进展状态',
          dataIndex: 'status',
          key: 'status',
           width: 100,
        },
        {
          title: '风险项',
          dataIndex: 'riskItem',
          key: 'riskItem',
          width: 100,
        },
        {
          title: '风险对应方案',
          dataIndex: 'riskSolution',
          key: 'riskSolution',
          width: 150,
        },
        {
          title: '开始时间',
          dataIndex: 'begindate',
          key: 'begindate',
          width: 130,
           render: (text: any) => {
            return text && text.split(' ')[0]
          }
        },
        {
          title: '结束时间',
          dataIndex: 'enddate',
          key: 'enddate',
          width: 130,
          render: (text: any) => {
            return text && text.split(' ')[0]
          }
        },
        {
          title: '批注',
          dataIndex: 'commentNum',
          key: 'commentNum',
          width: 100,
        },
      ]
    }
  }

  return (
    <>
      <Table bordered dataSource={list} scroll={{ x: 2000,y:500 }} columns={getColumns()} pagination={false} />
      {visbile && (
        <BigEventModal
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
export default BigEventTable
