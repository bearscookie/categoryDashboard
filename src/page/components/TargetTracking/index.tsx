/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

// import styles from './style.module.less'
// import noraml from '../../../assets/images/categroy-icon/tongguo.png'
// import lowRisk from '../../../assets/images/categroy-icon/difengxian.png'
// import highRisk from '../../../assets/images/categroy-icon/gaofengxian.png'
import BigEventTable from './targetTrackingTable'
import SecondTitle from '../SecondTitle'
// import BoundaryTable from './BoundaryTable'

const TargetTracking = (props: any) => {
  console.log('目标追踪===>>>>>>')
  return (
    <>
      <SecondTitle title='整体'></SecondTitle>
      <BigEventTable list={props.allTargetTraceData} />
     <SecondTitle title='自营'></SecondTitle>
      <BigEventTable list={props.ziyingTargetTraceData} />
      <SecondTitle title='POP'></SecondTitle>
      <BigEventTable list={props.popTargetTraceData} />
    </>
  )
}

export default TargetTracking
