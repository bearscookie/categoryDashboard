import React, { useEffect, useState } from 'react'
import { formatMoneyByTrdDecimal, formatMoneyByTenMillon, percentFormat } from 'tool/format'
import { millionFormats, millionThousandToFormats, dayFormats,percentFormats } from 'tool/dataFomat'
import { Tooltip } from 'antd'

import styles from './style.module.less'

const TrendCard = (props: any) => {
  const { trendData, widthData, onTabChange, idData, checkId, level, tabKey } = props
  const [newTitle, setNewTitle] = useState('')
  const checkTrendTab = (id: any) => {
    const data = trendData.indexType
    onTabChange(data)
  }
  const filterMoney = (value: any) => formatMoneyByTrdDecimal(Number(formatMoneyByTenMillon(Number(value))))
  useEffect(() => {
    filterDataOrTitle()
  }, [props.trendData])

  const filterDataOrTitle = () => {
    // 过滤单位名称
    const { title } = trendData
    if (title == 'GMV' || title == '贡献利润' || title == '前台毛利') {
      setNewTitle('百万')
    } else if (title == '现金流天数') {
      setNewTitle('天')
    } else {
      setNewTitle('')
    }
  }
  const loseClassName = () => {
    const { title, value, lastyear, yoy } = trendData
    if (title == '现金流天数') {
      if (value - lastyear < 0) {
        return false
      }
      return true
    }
    if (yoy < 0) {
      return false
    }
    return true
  }
  const filterConversion = (data, isUnit) => {
    const { title } = trendData
    if (title == 'GMV' || title == '贡献利润' || title == '前台毛利') {
      return `${millionThousandToFormats(Number(data))} ${isUnit ? '百万' : ''}`
    }
    if (title == '现金流天数') {
      return `${dayFormats(Number(data))} ${isUnit ? '天' : ''}`
    }
  }

  const filterPerent = (data, isUnit) => `${percentFormats(Number(data), false)} ${isUnit ? '%' : ''} `

  const basisData = () => {
    const { title, value, lastyear, yoy } = trendData
    if (title == '现金流天数') {
      return `${Math.abs((value - lastyear).toFixed(2))}天`
    }
    return `${yoy ? percentFormat(yoy, 2, false) : 0}%`
  }
  return (
    <div
      style={{ backgroundColor: idData == checkId ? '#E8F2EE' : '' }}
      onClick={() => {
        checkTrendTab(idData)
      }}
      className={`${styles.trendCard} trend-card-c`}
    >
      <h5>{trendData?.title}</h5>
      <div className={styles.content}>
        <div className={styles.amount}>
          <span>{`${filterConversion(trendData.value)}`}</span>
          <span style={{ marginLeft: '5px' }}>{newTitle}</span>
        </div>
        <div className={styles.result}>
          {(
            <div className={styles.contrast}>
              <span className={styles.subTitle}>同比：</span>
              <span className={loseClassName() ? '' : styles.normalData}>{basisData()}</span>
            </div>
          )}

          {(
            <div>
              <span className={styles.subTitle}>目标完成度：</span>
              {/* @ts-ignore */}
              <span>{trendData.value && trendData.goal ? parseInt((trendData.value / trendData.goal) * 100) : 0}%</span>
            </div>
          )}
          {(
            <div className={styles}>
              <span className={styles.subTitle}>YTD：</span>
              <span>{filterConversion(trendData.ytd, true)}</span>
            </div>
          )}
          {(
            <div className={styles}>
              <span className={styles.subTitle}>YTD同比：</span>
              <span>{filterPerent(trendData.ytdYOY, true)}</span>
            </div>
          )}
          {trendData.title !=='现金流天数' && (
            <div className={styles}>
              <span className={styles.subTitle}>自营占比：</span>
              <span>{filterPerent(trendData.selfown, true)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default TrendCard
