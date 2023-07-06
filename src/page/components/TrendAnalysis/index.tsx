import React, { useEffect, useState } from 'react'

import TrendCard from '../TrendCard'
import GMVChatLine from '../GMVChatLine'
import SecondTitle from '../SecondTitle/index'
// import zuo from '../../../assets/images/categroy-icon/zuo.png'
// import you from '../../../assets/images/categroy-icon/you.png'
import { getKPITrend } from '../../../services/Dashboard/Supermarket'

import styles from './style.module.less'

let timer: any

const TrendAnalysis = (props: any) => {
  const [chartData, setChartData] = useState([])
  const [checkIdData, setCheckIdData] = useState(0)
  const [dataList, setDataList] = useState({ title: 'GMV' })
  const [isShowArrow, setIsShowArrow] = useState<boolean>(false)

  const [unit, setUnit] = useState('百万')
 
  const getKPITrendData = async param => {
    const trendData = await getKPITrend(param)
    setChartData(trendData.data.data)
  }
  const handleChange = value => {
    const params = {
      beginDate: '2023-06-01',
      endDate: '2023-06-30',
      indexType: 1,
      firstDepartment: '',
      secondDepartment: '',
      ...props.formData,
    }
    getKPITrendData(params)
  }

  const checkTabId = index => {
    setDataList(props.trendData[index])
    setUnit(props.trendData[index].title)
    setCheckIdData(index)
  }
   useEffect(() => {
    if (props.trendData.length && props.trendData) {
      setUnit(props.trendData[0]?.title)
      setCheckIdData(0)
      setDataList(props.trendData[0])
      handleChange()
      console.log(props.trendData)
    }
  }, [props?.trendData])
  const getUnit = () => {
    if (unit) {
      if (unit == 'UV') {
        return '万'
      }
      if (unit == '现金流天数') {
        return '天'
      }
      if (unit == '转化率' || unit.indexOf('占比') !== -1) {
        return '%'
      }
      if (unit == '客单价' || unit == '价格指数' || unit == '连带件数' || unit == 'SKU数量') {
        return ''
      }
      return '百万'
    }
  }
  // const goLeft = () => {
  //   const a = document?.getElementById('warp')!
  //   const b = document?.getElementById('scollWrap')!
  //   const c = document.getElementsByClassName('trend-card-c')?.[0]
  //   const ml = parseInt(b?.style?.marginLeft) ? parseInt(b?.style?.marginLeft) : 0
  //   if (b && c) {
  //     const ml = parseInt(b.style.marginLeft)
  //     // @ts-ignore
  //     const r = ml + c.clientWidth > 0 ? 0 : ml + c.clientWidth
  //     b.style.marginLeft = `${r}px`
  //   }
  // }

  // const goRight = () => {
  //   const a = document?.getElementById('warp')!
  //   const b = document?.getElementById('scollWrap')!
  //   const c = document.getElementsByClassName('trend-card-c')?.[0]
  //   const ml = parseInt(b?.style?.marginLeft) ? parseInt(b?.style?.marginLeft) : 0
  //   const all = b?.scrollWidth - a?.offsetWidth
  //   if (b && c) {
  //     // @ts-ignore
  //     const r = ml - c.clientWidth < -all ? -all : ml - c.clientWidth
  //     b.style.marginLeft = `${r}px`
  //   }
  // }

  useEffect(() => {
    // handleResize()
  }, [props.trendData])

  // const handleResize = () => {
  //   if (timer) {
  //     clearTimeout(timer)
  //     timer = null
  //   }
  //   // @ts-ignore
  //   if (document.getElementById('scollWrap')) {
  //     // @ts-ignore
  //     document.getElementById('scollWrap').style.marginLeft = '0px'
  //   }
  //   setTimeout(() => {
  //     const a = document?.getElementById('warp')
  //     const b = document?.getElementById('scollWrap')
  //     if (a && b) {
  //       b.style.marginLeft = 0
  //       setIsShowArrow(b?.scrollWidth > a?.offsetWidth)
  //     }
  //     if (timer) {
  //       clearTimeout(timer)
  //       timer = null
  //     }
  //   }, 1000)
  // }

  // useEffect(() => {
  //   // 监听
  //   window.addEventListener('resize', handleResize)
  //   // 销毁
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  return (
    <div>
      <SecondTitle title='业绩表现'/>
      <div className={styles.trendWarp} id="warp">
        {/* <div
          className={styles.scollWrap}
          id="scollWrap"
        > */}
        {props.trendData.map((item, index) => (
          <div
            style={{ marginRight: '10px' }}
            onClick={() => checkTabId(index)}
          >
            <TrendCard
              onTabChange={handleChange}
              idData={index}
              level={props.level}
              tabKey={props.tabKey}
              checkId={checkIdData}
              widthData={100}
              trendData={item}
            />
          </div>
        ))}
        {/* </div> */}
        {/* <TrendCard /> */}
      </div>
      {!!chartData?.length && (
        <GMVChatLine
          title={dataList?.title}
          unit={getUnit()}
          dataValue={dataList}
          gmvTrend={chartData}
          chartsWidth="100%"
          firstClass={1}
        />
      )}
    </div>
  )
}
export default TrendAnalysis
