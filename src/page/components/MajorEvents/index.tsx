import React, { useEffect, useState } from 'react'
import styles from './style.module.less'
import { Modal } from 'antd'
import MagjorEventsTable from '../../Dashborad/MagjorEventsTable'
import moment from 'moment'
import {getListByStatus} from '../../../services/Dashboard/Supermarket'
const MajorEvents = ({ bigEventData, summary, formData,hierarchy }: any) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [tableData, setTableData] = useState<boolean>(false)

  console.log('summary:::', formData)
  const handleClick = async(val: number) => {
    setVisible(true)
     const rq = {
      dateValue: moment().format('YYYY-MM'),
      mode: '自营',
      status: val,
      firstCategoryId: '',
      secondCategoryId: '',
      secondCategoryName: '',
      ...formData,
      firstCategoryName: formData.firstCategoryName,
    }
    let data = await getListByStatus(rq)
    // const arr = bigEventData.filter((ele: any) => {
    //   return `${ele.status}` == `${val}`
    // })
    // console.log('tableData:::', arr)
    setTableData(data.data.data)
  }
  const searchParams = new URL(location.href).searchParams

  let name = (formData.secondCategoryName && formData.secondCategoryName !== "全部") ? formData.secondCategoryName : formData.firstCategoryName;
  return (
    <div className={styles.warp}>
      <div className={styles.title}>
        <h3>{ name|| '全部'}大事件</h3>
        <span>{summary?.date}</span>
      </div>
      <div className={styles.lists}>
        <span className={styles.event}>
          <span></span>
          <span>{summary?.normalNum || 0}个二级品类大事件</span>
          <span className={styles.normal} onClick={() => handleClick('正常')}>
            进度正常
          </span>
        </span>
        <span className={styles.event}>
          <span></span>
          <span>{summary?.lowRiskNum || 0}个二级品类大事件</span>
          <span className={styles.low} onClick={() => handleClick('低风险')}>
            低风险
          </span>
        </span>
        <span className={styles.event}>
          <span></span>
          <span>{summary?.highRiskNum || 0}个二级分类大事件</span>
          <span className={styles.high} onClick={() => handleClick('高风险')}>
            高风险
          </span>
        </span>
      </div>
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
export default MajorEvents
