/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

// import styles from './style.module.less'
// import noraml from '../../../assets/images/categroy-icon/tongguo.png'
// import lowRisk from '../../../assets/images/categroy-icon/difengxian.png'
// import highRisk from '../../../assets/images/categroy-icon/gaofengxian.png'
import BigEventTable from './bigEventTable'
import BoundaryTable from './boundaryTable'
import SecondTitle from '../SecondTitle'
import { router } from 'src/router'
import styles from './style.module.less'

const BigEventManage = (props: any) => {
  const handleRouter = () => {
    router.replace(`/bigEventManage/bigEventList`)
  }
  return (
    <>
      <div className={styles.titleContent}>
        <SecondTitle title='大事件'></SecondTitle>
         <a style={{ float: 'right', color: '#47BA71', fontSize: 12, fontWeight: 'noraml' }} onClick={handleRouter}>
          查看全部大事件
        </a>
      </div>
      
      <BigEventTable formData={props.formData}  list={props.bigEventData} level={props.level} />
      <SecondTitle title='边界线'></SecondTitle>
      <BoundaryTable formData={props.formData} list={props.boundaryData} level={props.level} />
    </>
  )
}

export default BigEventManage
