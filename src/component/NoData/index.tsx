/* eslint-disable react/require-default-props */
import React from 'react'

import noSearchData from '../../assets/images/no_search_data.png'
import noData from '../../assets/images/no_data.png'

import styles from './style.module.less'

interface INoData {
  message: string
  isSearch?: boolean
  picSrc?: any
}

/**
 *
 * @param message
 * @param isSearch 是否查询，未查询图片为提示查询，查询后图片是✈️
 * @param picSrc 接收图片传入路径
 * @returns 无数据占位组件
 */
const NoData: React.FC<INoData> = ({ message, isSearch, picSrc }) => (
  <div className={styles.noData}>
    <img src={picSrc || (isSearch ? noSearchData : noData)} alt="占位图" />
    <p>{message || '暂无数据'}</p>
  </div>
)

export default NoData
