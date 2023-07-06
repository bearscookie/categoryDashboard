/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import { relative } from 'path'

import { Button, Descriptions, Progress, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { CategoryItemType } from 'src/const'
import {
  formatMoneyByTenMillon,
  decimalFormat,
  formatMoneyByTrdDecimal,
  formatByTrd,
  formatMoneyByTrd,
} from 'tool/format'

import IndicatorDetailsModal from '../IndicatorDetails'

import styles from './style.module.less'

const NewTableItem = ({
  type,
  value,
  standardValue,
  unit,
  detailData,
  height,
  negative,
  min,
  max,
  k,
  percentage,
  decimal = 2,
  nameFailed,
  formData,
  categoryLevel,
  ...rest
}: any) => {
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const [modalData, setModalData] = useState<any>({})
  const handleDetail = () => {
    setDetailVisible(true)
    setModalData({ ...rest, nameFailed })
  }
  // const formatPercent = percent => {
  //   if (decimal == 0) {
  //     if (unit) {
  //       return `${parseInt(formatMoneyByTrdDecimal(percent)) || 0}${unit}`
  //     }
  //     if (value !== 0 && value !== '0.00') {
  //       return parseInt(formatMoneyByTrdDecimal(value))
  //     }
  //     return '0'
  //   }
  //   if (unit) {
  //     return `${formatMoneyByTrdDecimal(percent) || '0.00'}${unit}`
  //   }
  //   if (value != 0 && value !== '0.00' && value !== null) {
  //     return formatMoneyByTrdDecimal(value)
  //   }
  //   return '0.00'
  // }
  const renderContent = () => (
    <div>
      <Descriptions column={1}>
        {detailData &&
          detailData.map((ele: any) => {
            // console.log('ele.value:::', ele.value)
            // eslint-disable-next-line radix
            if (ele.label === '同比' && parseInt(ele.value) < 0) {
              return (
                <Descriptions.Item label={ele.label}>
                  <span className={styles.isNormal}>{ele.value}</span>
                </Descriptions.Item>
              )
            }
            if (ele.label === '是否达标' && ele.value === '未达标') {
              return (
                <Descriptions.Item label={ele.label}>
                  <span className={styles.isNormal}>{ele.value}</span>
                </Descriptions.Item>
              )
            }
            return (
              <Descriptions.Item label={ele.label}>
                <span>{ele.value}</span>
              </Descriptions.Item>
            )
          })}
      </Descriptions>
    </div>
  )

  if ([CategoryItemType.processRange].includes(type)) {
    const left = min / standardValue || 0
    const width = (max - min) / standardValue || 0
    return (
      <div
        className={`${styles.tableProgress} ${styles[type]}  ${styles.processRange} ${styles[`height${height}`]} ${
          value < min || value > max || value < 0 ? styles.negative : ''
        }`}
      >
        <Tooltip overlayClassName={styles.tooltipDesc} arrow={false} placement="bottomRight" title={renderContent}>
          {/* <div onClick={handleDetail} style={{ cursor: 'pointer' }}> */}
          <div style={{ cursor: 'pointer' }}>
            <Progress
              strokeColor={Number(value) < 0 ? '#d5133b' : '#47ba71'}
              className={styles.processHeight}
              // @ts-ignore
              // percent={
              //   standardValue && standardValue !== 0 ? decimalFormat(Math.abs(value / standardValue) * 100) : '0.00'
              // }
              // format={percent =>
              //   nameFailed == 'UV' || nameFailed == 'SKU数量'
              //     ? formatMoneyByTrd(Number(value))
              //     : unit
              //     ? `${formatByTrd(Number(value))} ${unit}`
              //     : formatByTrd(Number(value))
              // }

              format={() => value}
              percent={Number(percentage)}
              size="small"
            />
          </div>
        </Tooltip>
        {detailVisible && (
          <IndicatorDetailsModal
            modalData={modalData}
            detailVisible={detailVisible}
            formData={formData}
            nameFailed={nameFailed}
            categoryLevel={categoryLevel}
            handleClose={() => {
              setDetailVisible(false)
            }}
          />
        )}
      </div>
    )
  }

  if ([CategoryItemType.process].includes(type)) {
    // console.log('percentage:::', percentage)
    return (
      <div
        className={`${styles.tableProgress} ${styles[type]} ${styles[`height${height}`]} ${
          negative == true ? styles.negative : ''
        }`}
      >
        {detailData ? (
          <Tooltip overlayClassName={styles.tooltipDesc} arrow={false} placement="bottomRight" title={renderContent}>
            <div style={{ cursor: 'pointer', position: 'relative', top: '-1px' }}>
              <Progress
                strokeColor={Number(value) < 0 ? '#d5133b' : '#47ba71'}
                className={styles.processHeight}
                // @ts-ignore
                // percent={
                //   standardValue && standardValue !== 0 ? decimalFormat(Math.abs(value / standardValue) * 100) : '0.00'
                // }
                percent={Number(percentage)}
                format={() => value}
                // format={percent =>
                //   nameFailed == 'UV'
                //     ? formatMoneyByTrd(Number(value))
                //     : unit
                //     ? `${formatByTrd(Number(value))} ${unit}`
                //     : formatByTrd(Number(value))
                // }
                size="small"
              />
            </div>
          </Tooltip>
        ) : (
          <Progress
            strokeColor="#47ba71"
            className={styles.processHeight}
            // @ts-ignore
            // percent={decimalFormat((value / standardValue) * 100) || '0.00'}
            // format={percent => (unit ? `${percent || 0}${unit}` : value || 0)}
            format={() => value}
            percent={Number(percentage)}
            size="small"
            showInfo={false}
          />
        )}
        {detailVisible && (
          <IndicatorDetailsModal
            modalData={modalData}
            formData={formData}
            nameFailed={nameFailed}
            categoryLevel={categoryLevel}
            detailVisible={detailVisible}
            handleClose={() => {
              setDetailVisible(false)
            }}
          />
        )}
      </div>
    )
  }

  if ([CategoryItemType.circle].includes(type)) {
    return (
      <div className={`${styles.tableProgress} ${styles[type]}`}>
        <Progress
          strokeColor="#47ba71"
          className={styles.processHeight}
          // @ts-ignore
          percent={decimalFormat((value / standardValue) * 100, 2) || '0.00'}
          type={CategoryItemType.circle}
          format={percent => (unit ? `${percent || '0.00'}${unit}` : value || '0.00')}
          size={15}
        />
        <span style={{ marginLeft: 5 }}>
          {/* @ts-ignore */}
          {decimalFormat((value / standardValue || 0) * 100) || '0.00'}
          {unit}
        </span>
      </div>
    )
  }

  if ([CategoryItemType.text].includes(type)) {
    return (
      <>
        <span className={parseInt(value) >= 0 ? styles.more : styles.less}>
          {value || 0}
          {/* {unit || '%'} */}
        </span>
      </>
    )
  }
  return value
}
export default NewTableItem
