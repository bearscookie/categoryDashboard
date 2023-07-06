import { relative } from 'path'

import React, { useEffect, useState } from 'react'
import { Button, Modal, Select } from 'antd'
// import { getCategoryanalysisDetail } from 'src/services/CategoriesDashboard'

import GMVChatBar from '../GMVChatBar'

import styles from './style.module.less'

const IndicatorDetailsModal = (props: any) => {
  const { detailVisible, handleClose, modalData, formData, categoryLevel, nameFailed } = props

  const [resData, setResData] = useState<any[]>([])

  const [chartsData, setChartsData] = useState<any[]>([])
  const [chartsDataDefult, setChartsDataDefult] = useState<any[]>([])
  const [dimension, setDimension] = useState<any>([])

  console.log('modalData::::', modalData)
  // const searchParam = new URL(location.href).searchParams
  // const mode = searchParam.get('mode');
  // const dateType = searchParam.get('dateType');
  // const dateValue = searchParam.get('dateValue')
  // const firstCategoryId = searchParam.get('firstCategoryId')
  // const firstCategoryName = searchParam.get('firstCategoryName')
  // const secondCategoryId = searchParam.get('secondCategoryId')
  // const secondCategoryName = searchParam.get('secondCategoryName'
  const getData = async () => {
    let filterParam = {}
    console.log(categoryLevel, 23232)
    let categoryNameFilter = modalData.record.categoryName !== '汇总' ? modalData.record.categoryName : 'ALL'
    if (categoryLevel == 0) {
      filterParam = {
        ...formData,
        firstCategoryName: categoryNameFilter,
        secondCategoryName: '',
        thirdCategoryName: '',
      }
    } else if (categoryLevel == 1) {
      filterParam = {
        ...formData,
        secondCategoryName: categoryNameFilter,
        thirdCategoryName: '',
      }
    } else if (categoryLevel == 2) {
      filterParam = {
        ...formData,
        thirdCategoryName: categoryNameFilter,
      }
    }

  // console.log(searchParam.get('mode'))
    // const res = await getCategoryanalysisDetail({
    //   categoryId: modalData?.record?.categoryId,
    //   categoryName: modalData?.record?.categoryName,
    //   categoryLevel: categoryLevel,
    //   columnName: modalData?.columnName,
    //   ...filterParam,
    //   // mode,
    //   // dateType,
    //   // dateValue,
    //   // firstCategoryId,
    //   // firstCategoryName,
    //   // secondCategoryId,
    //   // secondCategoryName,
    //   // categoryRole
    // })
    // console.log('.record?:::', res)
    // if (res.data && res.data?.code == 200 && res?.data?.data) {
    //   setResData(res?.data?.data)
    //   setChartsData(res.data?.data)
    //   setChartsDataDefult(res.data?.data[0]?.dimensionData)
    //   const arr = res.data.data.map((ele: any, index: any) => ({
    //     value: ele.dimension,
    //     label: ele.dimension,
    //     index,
    //   }))
    //   setDimension(JSON.parse(JSON.stringify(arr)) || [])
    // }
  }
  useEffect(() => {
    getData()
  }, [])
  const setChartsDataMethod = (value, option) => {
     console.log(chartsData,option)
    setChartsDataDefult(chartsData[option.index].dimensionData)
   
  }
  console.log('chartsData:::', chartsData)
  console.log('dimension', dimension)
  return (
    <>
      <Modal
        title="指标详情"
        footer={null}
        centered
        width={700}
        open={detailVisible}
        onOk={handleClose}
        onCancel={handleClose}
        maskClosable
      >
        <div className={styles.GMVDetail}>
          <div className={styles.topGmvDetail}>
            <p className={styles.gmvDetailTitle}>
              <span>{modalData.categoryLevel == 1 ? '一级品类' : '二级品类'}:</span>
              <b>{modalData?.record?.categoryName}</b>
            </p>
            <div>
              <span style={{ position: 'relative', left: '20px' }}>{modalData.nameFailed}</span>
              {dimension && !!dimension.length && (
                <>
                  <span className={styles.subTag}>分</span>
                <Select
                  style={{ width: 120 }}
                  defaultValue={dimension.length && dimension[0] ? dimension[0].value : undefined}
                  onChange={(value, index) => {
                    setChartsDataMethod(value, index)
                  }}
                  size="small"
                  options={dimension}
                />
                </>
                
              )}
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            {chartsData && (
              <GMVChatBar
                id="main2"
                nameFailed={modalData.nameFailed}
                chartsWidth="100%"
                isGmvDetail
                turnoverTrend={chartsDataDefult}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default IndicatorDetailsModal
