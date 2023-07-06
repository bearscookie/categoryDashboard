/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import noData from 'src/assets/images/categroy-icon/noData.png'
import { Button, message, Modal, Table, Tooltip } from 'antd'
import { deleteBigEvent, getBigEventStatusNum, getBigEventsList } from 'src/services/BigEventManage'
import { router } from 'src/router'

import FirstCategoryColumn from '../../components/FirstCatgoryColumn'

import styles from './style.module.less'
import BigEventForm from './form'
import RemarkModal from './remarkModal'
import UpdateProgressModal from './updateProgressModal'
import { millionFormats, thousandToFormats } from 'tool/dataFomat'

const renderContent = () => <p style={{ color: '#d3002c' }}>未完成目标</p>
const BigEventList = () => {
  const [spin, setSpin] = useState<boolean>(true)
  const [bigEventList, setBigEventList] = useState<any[]>([])

  const [formData, setFormData] = useState<any>()

  const [type, setType] = useState('进行中')

  const [processStaus, setProcessSatus] = useState<any>('进行中')

  const [total, setTotal] = useState<number>()

  const [count, setCount] = useState<any>({})

  const [remarkVisbile, setRemarkVisbile] = useState<boolean>()

  const [updateProgress, setUpdateProgress] = useState<boolean>()

  const [clickRecord, setClickRecord] = useState<any>()

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '确认',
      content: '确认删除该大事件?',
      onOk: async () => {
        const res = await deleteBigEvent({
          id: record.id,
        })
        if (res) {
          message.success('删除成功')
          queryBigEventList({ ...formData })
        }
      },
    })
  }

  const handleModify = (record: any) => {
    const params = Object.entries(record).length ? `?${new URLSearchParams(record)}` : ''
    router.push(`/bigEventManage/bigEventAdd${params}`)
  }

  const addRemark = (record: any) => {
    setRemarkVisbile(true)
    setClickRecord(record)
  }

  const columns: any = [
    {
      title: '二级部门',
      dataIndex: 'secondDepartment',
      key: 'secondDepartment',
      width: 150,
      fixed: 'left',
    },
    {
      title: '负责二级品类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200,
      render: (text: any) => <FirstCategoryColumn text={text} />,
    },
    {
      title: '品类角色',
      dataIndex: 'categoryRole',
      key: 'categoryRole',
      width: 150,
    },
    {
      title: '大事件',
      dataIndex: 'content',
      key: 'content',
      width: 300,
      render: (text: any) => (
        <Tooltip title={text}>
          <p className={styles.bigDec}>{text}</p>
        </Tooltip>
      ),
    },
    {
      title: '大事件描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (text: any) => (
        <Tooltip title={text}>
          <p className={styles.bigDec}>{text}</p>
        </Tooltip>
      ),
    },
    {
      title: '指标',
      dataIndex: 'index',
      key: 'index',
      width: 200,
    },
    {
      title: '适用范围',
      dataIndex: 'mode',
      key: 'mode',
      width: 200,
    },
    {
      title: '现状',
      dataIndex: 'current',
      key: 'current',
      width: 200,
      render: (text: any, record: any) =>
        Number(text) < Number(record.target) ? (
          <Tooltip title={renderContent()} overlayClassName={styles.tooltipDesc}>
            <p className={Number(text) < Number(record.target) ? 'abnormalStyle' : 'normalStyle'}>{text}</p>
          </Tooltip>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: '目标 （百万）',
      dataIndex: 'target',
      key: 'target',
      width: 200,
      render: text => millionFormats(text),
    },
    {
      title: '参考值-去年同期 （百万）',
      dataIndex: 'lastYear',
      key: 'lastYear',
      width: 200,
      render: text => millionFormats(text),
    },
    {
      title: '参考值-上月 （百万）',
      dataIndex: 'lastMonth',
      key: 'lastMonth',
      width: 200,
      render: text => millionFormats(text),
    },
    {
      title: '进展状态',
      dataIndex: 'status',
      key: 'status',
      width: 200,
    },
    {
      title: '风险项',
      dataIndex: 'riskItem',
      key: 'riskItem',
      width: 200,
    },
    {
      title: '风险应对方案',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      title: '开始日期',
      dataIndex: 'riskSolution',
      key: 'riskSolution',
      width: 200,
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 200,
    },
    {
      title: '大事件负责人',
      dataIndex: 'principal',
      key: 'principal',
      width: 200,
    },
    {
      title: '批注',
      dataIndex: 'commentNum',
      key: 'commentNum',
      fixed: 'right',
      width: 80,
      render: (text: string, record: any) => (
        <span
          className="curp"
          onClick={() => {
            addRemark(record)
          }}
        >
          {text || 0}
        </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      fixed: 'right',
      width: 260,
      render: (text: any, record: any) => (
        <>
          <div style={{ width: 260 }}>
            <Button
              onClick={() => {
                handleModify(record)
              }}
              style={{ marginRight: 10 }}
              className={styles.eidtBtn}
            >
              修改
            </Button>
            <Button
              style={{ marginRight: 10 }}
              className={styles.updateBtn}
              onClick={() => {
                setUpdateProgress(true)
                setClickRecord(record)
              }}
            >
              更新进展
            </Button>
            <Button
              className={styles.deleteBtn}
              onClick={() => {
                handleDelete(record)
              }}
            >
              删除
            </Button>
          </div>
        </>
      ),
    },
  ]

  const handleTypeChange = (t: string) => {
    setType(t)
    queryBigEventList({
      ...formData,
      status: t,
    })
  }

  const queryBigEventList = async (rq: any) => {
    setSpin(true)

    const param = { ...rq }
    try {
      delete param.parentName
      if (param.firstDepartment === '') {
        param.firstDepartment = 'ALL'
      }
      if (param.secondDepartment === '') {
        param.secondDepartment = 'ALL'
      }
      if (!param.status) {
        param.status = '进行中'
      }
    } catch (error) {}

    const res = await getBigEventsList({
      ...param,
    })
    setFormData(param)
    if (res && res.data && res.data.code === 200 && res.data.rows) {
      setBigEventList(JSON.parse(JSON.stringify(res.data.rows)))
      setTotal(res.data.total)
      setSpin(false)
    }

    const countRes = await getBigEventStatusNum({
      ...param,
      status: '进行中',
    })
    if (countRes && countRes.data && countRes.data.code === 200 && countRes.data.data) {
      setCount(countRes.data.data)
    }
  }

  const handleSearch = (val: any) => {
    queryBigEventList({ pageNum: 1, pageSize: 10, ...val })
  }

  const handlePageChange = (pgInfo: any) => {
    queryBigEventList({
      ...formData,
      pageNum: pgInfo.current,
      pageSize: pgInfo.pageSize,
    })
  }

  return (
    <>
      <div style={{ padding: 20 }}>
        <BigEventForm
          emitSearch={handleSearch}
          emitStatus={(val: string) => {
            setProcessSatus(val)
          }}
        />
        <div style={{ marginTop: 20 }}>
          {processStaus === '进行中' && (
            <div className={styles.tabWrap}>
              <span
                className={type === '进行中' ? styles.active : ''}
                onClick={() => {
                  handleTypeChange('进行中')
                }}
              >
                全部 ({count.progress || 0})
              </span>
              <span
                className={type === '高风险' ? styles.active : ''}
                onClick={() => {
                  handleTypeChange('高风险')
                }}
              >
                高风险 ({count.high || 0})
              </span>
              <span
                className={type === '低风险' ? styles.active : ''}
                onClick={() => {
                  handleTypeChange('低风险')
                }}
              >
                低风险 ({count.low || 0})
              </span>
              <span
                className={type === '进度正常' ? styles.active : ''}
                onClick={() => {
                  handleTypeChange('进度正常')
                }}
              >
                进度正常 ({count.normal || 0})
              </span>
              <span
                className={type === '暂无进展' ? styles.active : ''}
                onClick={() => {
                  handleTypeChange('暂无进展')
                }}
              >
                暂无进展 ({count.not || 0})
              </span>
            </div>
          )}
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            onChange={handlePageChange}
            pagination={{ total }}
            scroll={{ x: 800 }}
            dataSource={bigEventList}
            columns={columns}
            bordered
          />
        </div>
      </div>
      {remarkVisbile && (
        <RemarkModal
          handleCancel={() => {
            setRemarkVisbile(false)
          }}
          clickRecord={clickRecord}
          handleOk={() => {
            setRemarkVisbile(false)
            queryBigEventList({ ...formData })
          }}
          visible={remarkVisbile}
        />
      )}
      {updateProgress && (
        <UpdateProgressModal
          handleCancel={() => {
            setUpdateProgress(false)
          }}
          clickRecord={clickRecord}
          handleOk={() => {
            setUpdateProgress(false)
            queryBigEventList({ ...formData })
          }}
          visible={updateProgress}
        />
      )}
    </>
  )
}
export default BigEventList
