import React, { useEffect, useState } from 'react'
import styles from './style.module.less'
import { Carousel, Modal } from 'antd'
import MagjorEventsTable from '../../Dashborad/MagjorEventsTable'
import { splitArrayIntoChunks } from 'tool/util'

const SecondMajorEvents = ({ bigEventData, summary, formData }: any) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [tableData, setTableData] = useState<boolean>(false)

  console.log('summarysummarysummary:::', summary)
  

  const list = summary?.list || []

  const arr: any = splitArrayIntoChunks(list, 3)

  console.log('arr:::!1', arr)

  const handleClick = (val: number) => {
    setVisible(true)
    const arr = bigEventData.filter((ele: any) => {
      return `${ele.status}` == `${val}`
    })
    console.log('tableData:::', arr)
    setTableData(arr.concat(arr).concat(arr).concat(arr))
  }

  const searchParams = new URL(location.href).searchParams
  const name = searchParams.get('secondCategoryName')

  const getStatus: any = (sts: string) => {
    switch (sts) {
      case '1':
        return {
          name: '进度正常',
          class: styles.normal,
        }
      case '2':
        return {
          name: '低风险',
          class: styles.low,
        }
      case '3':
        return {
          name: '高风险',
          class: styles.high,
        }
      default:
        return {
          name: '进度正常',
          class: styles.normal,
        }
    }
  }

  return (
    <div className={styles.warp}>
      <div className={styles.title}>
        <h3>{name || '全部'}大事件</h3>
        <span>{summary?.date}</span>
      </div>

      <Carousel dotPosition={'left'} autoplay>
        {arr.map((ele: any, index: number) => {
          return (
            <div className={styles.lists} key={index}>
              {ele.map((k: any) => {
                return (
                  <span className={styles.event}>
                    <span></span>
                    <span>
                      {k?.content}
                      {/* {k.first_cat}
                      {index} */}
                    </span>
                    <span className={getStatus(k.status)?.class}>{getStatus(k.status)?.name}</span>
                  </span>
                )
              })}
              {/* <span className={styles.event}>
                <span></span>
                <span>{summary?.lowRiskNum || 0}个二级品类大事件</span>
                <span className={styles.low} onClick={() => handleClick(2)}>
                  低风险
                </span>
              </span>
              <span className={styles.event}>
                <span></span>
                <span>{summary?.highRiskNum || 0}个二级分类大事件</span>
                <span className={styles.high} onClick={() => handleClick(3)}>
                  高风险
                </span>
              </span> */}
            </div>
          )
        })}
      </Carousel>

      {/* <>
        <Modal
          title={<span>大事件明细</span>}
          centered
          width={1000}
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
      </> */}
    </div>
  )
}
export default SecondMajorEvents
