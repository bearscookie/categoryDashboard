import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import * as echarts from 'echarts'
import CategoryTableItem from 'page/components/CategoryTableItem'
import GMVChatLine from 'page/components/GMVChatLine'
import GMVChatBar from 'page/components/GMVChatBar'
import { formatMoneyByTrdDecimal, formatMoneyByTenMillon,percentFormat } from 'tool/format'

import styles from './style.module.less'
import * as store from './store'
// 引入饼状图需要的模块

const CategoryGMVChat = observer((props: any) => {
  const [data, setData] = useState<any>({})
  const [yoyData, setYoyData] = useState<any>([])
  const [tabValue, setTabValue] = useState<any>(1)
  const setTab = (value: any) => {
    setTabValue(value)
  }
  const fetchData = async () => {
    const { dateType, dateValue, mode } = props.formData
    if (dateType && dateValue && mode) {
      const data = await store.requestData.request({ dateType, dateValue, mode })
      // const yoyArr = props.gmvTrend.map(item => item.yoy)
      setData(data)
      // console.log(yoyData)
    }
  }
  const chartsContent = () => {
    if (tabValue == 1) {
      if (props?.gmvTrend?.length > 0) {
        return <GMVChatLine isProfit={tabValue == 2} unit={'百万'} title="GMV" gmvTrend={props.gmvTrend} chartsWidth="58%" />
      }
      return (
        <div className={styles.noDateContent}>
          <p>
            <span>暂无数据</span>
          </p>
        </div>
      )
    }
    if (tabValue == 2) {
      if (props?.profitTrend?.length > 0) {
        return <GMVChatLine isProfit={tabValue == 2} title="贡献利润" unit={'百万'} gmvTrend={props.gmvTrend} chartsWidth="58%" />
      }
      return (
        <div className={styles.noDateContent}>
          <p>
            <span>暂无数据</span>
          </p>
        </div>
      )
    }
    if (props?.turnoverTrend?.length > 0) {
      return <GMVChatBar id="main1" chartsWidth="58%" turnoverTrend={props.turnoverTrend} />
    }
    return (
      <div className={styles.noDateContent}>
        <p>
          <span>暂无数据</span>
        </p>
      </div>
    )
  }
  useEffect(() => {
    fetchData()
  }, [props.formData])

  return (
    <div className={styles.mainContent}>
      <ul>
        <li onClick={() => setTab(1)} className={tabValue == 1 ? styles.chooseTabStyle : ''}>
          <div className={styles.contentProgress}>
            <p className={styles.pecentTitle}>
              {/* @ts-ignore */}
              <b
                className={
                  Math.round((Number(data.gmv) / Number(data.gmvGoal)) * 100) < props.processDate ? styles.mintus : ''
                }
              >
                {data.gmv !== null ? Math.round((Number(data.gmv) / Number(data.gmvGoal)) * 100) : 0}
              </b>
              <span>%</span>
            </p>
            <div className={styles.GMVContent}>
              <p>
                <span>
                  <b className={styles.subChildTitle}>GMV：</b>
                  <b className={styles.subTextH}>{data.gmv !== null ? formatMoneyByTrdDecimal(formatMoneyByTenMillon(Number(data.gmv))) : 0}百万</b>
                </span>
                <span>
                  同比：
                  <b
                    className={
                      data.gmvYOY !== null && data.gmvYOY < 0
                        ? `${styles.isNormalData} ${styles.subTextL}`
                        : styles.subTextL
                    }
                  >
                    {data.gmvYOY ? percentFormat(data.gmvYOY,2,false) : 0}%
                  </b>{' '}
                </span>
              </p>
              <p>
                <span>
                  <b className={styles.subChildTitle}>目标：</b>
                  <b className="mb">{data.gmvGoal ? formatMoneyByTrdDecimal(formatMoneyByTenMillon(Number(data.gmvGoal))) : 0}百万</b>
                </span>
              </p>
            </div>
          </div>
          <CategoryTableItem
            type="process"
            negative={Math.round((Number(data.gmv) / Number(data.gmvGoal)) * 100) < props.processDate}
            value={data.gmv}
            standardValue={data.gmvGoal}
            unit="%"
            height={5}
          />
        </li>
        <li onClick={() => setTab(2)} className={tabValue == 2 ? styles.chooseTabStyle : ''}>
          <div className={styles.contentProgress}>
            <p className={styles.pecentTitle}>
              {/* @ts-ignore */}
              <b
                className={
                  Math.round((Number(data.profit) / Number(data.profitGoal)) * 100) < props.processDate
                    ? styles.mintus
                    : ''
                }
              >
                {data.profitGoal !== null ? Math.round((Number(data.profit) / Number(data.profitGoal)) * 100) : 0}
              </b>
              <span>%</span>
            </p>
            <div className={styles.GMVContent}>
              <p>
                <span>
                  <b className={styles.subChildTitle}>贡献利润：</b>
                  <b className={styles.subTextH}>{formatMoneyByTrdDecimal(formatMoneyByTenMillon(Number(data.profit)))}百万</b>
                </span>
                <span>
                  同比：
                  <b
                    className={
                      data.profitYOY !== null && data.profitYOY < 0
                        ? `${styles.isNormalData} ${styles.subTextL}`
                        : styles.subTextL
                    }
                  >
                    {data.profitYOY ? percentFormat(data.profitYOY,2,false) : 0}%
                  </b>
                </span>
              </p>
              <p>
                <span>
                  <b className={styles.subChildTitle}>目标值：</b>
                  <b className="mb">
                    {data.formatMoneyByTenMillon ? formatMoneyByTrdDecimal(formatMoneyByTenMillon(Number(data.formatMoneyByTenMillon))) : 0}百万
                  </b>
                </span>
              </p>
            </div>
          </div>
          {/* @ts-ignore */}
          <CategoryTableItem
            type="process"
            negative={!(parseInt((Number(data.profit) / Number(data.profitGoal)) * 100) > props.processDate)}
            value={data.profit}
            standardValue={data.profitGoal}
            unit="%"
            height={5}
          />
        </li>
        <li onClick={() => setTab(3)} className={tabValue == 3 ? styles.chooseTabStyle : ''}>
          <div className={styles.contentProgress}>
            <p className={styles.pecentTitle}>
              <b style={{ color: parseInt(data.turnoverDays) - parseInt(data.turnoverDaysGoal ? data.turnoverDaysGoal : 0) < 0 ? '#D3002C' : '' }}>
                {data.turnoverDays !== null && data.turnoverDaysGoal !== null
                  ? parseInt(data.turnoverDays) - parseInt(data.turnoverDaysGoal)
                  : 0}
              </b>
              <span>天</span>
            </p>
            <div className={styles.GMVContent}>
              <p>
                <span>
                  <b style={{ width: '90px' }} className={styles.subChildTitle}>
                    现金流天数：
                  </b>
                  <b className={styles.subTextH}>{data.turnoverDays ? parseInt(data.turnoverDays) : 0}天</b>
                </span>
              </p>
              <p>
                <span>
                  <b style={{ width: '90px' }} className={styles.subChildTitle}>
                    {' '}
                    目标天数：
                  </b>
                  <b className="mb">{data.turnoverDaysGoal ? parseInt(data.turnoverDaysGoal) : 0}天</b>
                </span>
              </p>
            </div>
          </div>
          <CategoryTableItem
            type="process"
            className={styles.processHeight}
            value={data.turnoverDays ? Math.abs(parseInt(data.turnoverDays)) : 0}
            standardValue={parseInt(data.turnoverDaysGoal)}
            unit="%"
            height={5}
            negative
          />
        </li>
      </ul>
      {/* {tabValue == 1 || tabValue == 2 ? (
        <GMVChatLine
          isProfit={tabValue == 2}
          title={tabValue == 2 ? '贡献利润' : 'GMV'}
          gmvTrend={tabValue == 1 ? props.gmvTrend : props.profitTrend}
          chartsWidth="58%"
        />
      ) : (
        <GMVChatBar id="main1" chartsWidth="58%" turnoverTrend={props.turnoverTrend} />
      )} */}
      {chartsContent()}
      {/* <GMVChatBar chartsWidth="50%" turnoverTrend={props.turnoverTrend} /> */}
      {/* <GMVChatLine gmvTrend={props.gmvTrend} chartsWidth="50%" /> */}
      {/* <div className={styles.chartsContent}>
        <p>
          <span />
        </p>
        <div id="main" className={styles.chartMain} />
      </div> */}
    </div>
  )
})
export default CategoryGMVChat
