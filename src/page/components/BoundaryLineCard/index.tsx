import React, { useEffect, useState } from 'react'

import styles from './style.module.less'
import { Modal, Table } from 'antd'
import { getBoundaryDetail } from 'src/services/Dashboard/Supermarket'
import {formatMoneyByTrd} from 'tool/format'

const BoundaryLineCard = ({ title, value, categoryId, categoryName, columnName, formData }: any) => {
  const [modalVisible, setModalVisbile] = useState(false)

  const [tableData, setTableData] = useState([])

  const handleClick = async () => {
    if (!value || value < 0) {
      return
    }
    setModalVisbile(true)
    console.log(formData, '234836')
    const res = await getBoundaryDetail({
      categoryId,
      columnName,
      categoryName,
      ...formData,
      firstCategoryName: categoryName,
    })
    if (res.data && res.data?.code == 200 && res?.data?.data) {
      setTableData(res?.data?.data || [])
    }
  }

  const columns = [
    {
      title: '二级品类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 80,
    },
    {
      title: 'SKU数',
      dataIndex: 'columnName',
      key: 'columnName',
      width: 80,
      render: (text: any) => {
        return (
          <span>{formatMoneyByTrd(parseInt(Number(text))) }</span>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (text: any) => {
        return <span className={styles.isNormal}>未达标</span>
      },
    },
    {
      title: '下限',
      dataIndex: 'columnValueMin',
      key: 'columnValueMin',
      width: 70,
      render: (text: any) => {
        return (
          <span>{formatMoneyByTrd(parseInt(Number(text))) }</span>
        )
      }
    },
    {
      title: '上限',
      dataIndex: 'columnValueMax',
      key: 'columnValueMax',
      width: 70,
      render: (text: any) => {
        return (
          <span>{formatMoneyByTrd(parseInt(Number(text))) }</span>
        )
      }
    },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.key}>{title}</div>
      {value == 0 || value == null ? (
        <div className={styles.emptyValue}> </div>
      ) : (
        <div className={styles.value} onClick={handleClick}>
          {value}{' '}
        </div>
      )}

      {modalVisible && (
        <Modal
          width={800}
          visible={modalVisible}
          footer={null}
          maskClosable
          centered
          onCancel={() => {
            setModalVisbile(false)
          }}
        >
          <div>
            <div className={styles.lineO}>未达二级品类拆分</div>
            <div style={{ marginTop: 20 }} className={styles.lineS}>
              <span>最小SKU数不达标</span>
              <span>不达标品类数： {value}</span>
            </div>
            <div>
              <Table scroll={{x: 500}} dataSource={tableData} columns={columns} pagination={false} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
export default BoundaryLineCard
