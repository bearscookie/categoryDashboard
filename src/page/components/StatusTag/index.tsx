import React, { useEffect, useState } from 'react'
import styles from './style.module.less'
import noraml from '../../../assets/images/categroy-icon/tongguo.png'
import lowRisk from '../../../assets/images/categroy-icon/difengxian.png'
import highRisk from '../../../assets/images/categroy-icon/gaofengxian.png'

const StatusTag = ({ value }: any) => {
  const renderStatus = () => {
    if (value == '正常') {
      return (
        <div>
          <img src={noraml} />
          <span>正常</span>
        </div>
      )
    }
    if (value == '低风险') {
      return (
        <div>
          <img src={lowRisk} />
          <span>低风险</span>
        </div>
      )
    }
    if (value == '高风险') {
      return (
        <div>
          <img src={highRisk} />
          <span>高风险</span>
        </div>
      )
    }
    return '正常'
  }

  return <div className={styles.container}>{renderStatus()}</div>
}
export default StatusTag
