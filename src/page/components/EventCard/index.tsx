import React, { useEffect, useState } from 'react'
import styles from './style.module.less'
import { progressType } from 'src/const'

const EventCard = (props: any) => {
  const { type, clickTagFirst } = props

  const getTypeText = (type: progressType) => {
    let txt: string = '进度正常'
    if (type === progressType.noraml) {
      txt = '进度正常'
    }
    if (type === progressType.lowRisk) {
      txt = '低风险'
    }
    if (type === progressType.highRisk) {
      txt = '高风险'
    }

    return txt
  }
  const clickTagValue = () => {
    let types = 1
    switch (type) {
      case 'noraml':
         types = '正常'
        break;
      case 'lowRisk':
        types = '低风险'
        break;
      case 'highRisk':
        types = '高风险'
        break;
    }
    clickTagFirst(types)
  }
  return (
    <div onClick={()=>{clickTagValue()}} className={`${styles.card} ${styles[type]}`}>
      <div className={styles.amount}>{props.value || 0}</div>
      <div className={styles.status}>{getTypeText(type)}</div>
    </div>
  )
}
export default EventCard
