import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'

import CategoryCard from '../CategoryCard'
import MagjorEventsTable from '../../Dashborad/MagjorEventsTable'
import styles from './style.module.less'
import { getListByStatus } from '../../../services/Dashboard/Supermarket'
import moment from 'moment'

const CategoryEventList = ({ list, formData }: any) => {
  const [visible, setVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const ClickTag = async (value, categoryName, categoryId) => {
    const rq = {
      dateValue: moment().format('YYYY-MM'),
      mode: '自营',
      status: value,
      firstCategoryId: categoryId,
      secondCategoryId: '',
      secondCategoryName: '',
      ...formData,
      firstCategoryName: categoryName || formData.firstCategoryName,
    }
    let data = await getListByStatus(rq)
    setTableData(data.data.data)
    setVisible(true)
  }
  return (
    <div className={styles.list}>
      {Array.isArray(list) &&
        list.map((item: any, i: number) => (
          <div className={styles.item} key={i}>
            <CategoryCard {...item} ClickTag={ClickTag} formData={formData} />
          </div>
        ))}
      <>
        <Modal
          title={<span>大事件明细</span>}
          centered
          width={850}
          open={visible}
          onCancel={() => {
            setVisible(false)
          }}
          footer={null}
          maskClosable
        >
          <>
            <div style={{ maxHeight: 440, overflow: 'auto' }}>
              <MagjorEventsTable list={tableData} />
            </div>
          </>
        </Modal>
      </>
    </div>
  )
}
export default CategoryEventList
