import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import * as echarts from 'echarts'
import {
  formatMoneyByTrdDecimal,
  formatMoneyByTenMillon,
  percentFormat,
  formatByTrd,
  decimalFormat,
} from 'tool/format'
import {millionFormats} from 'tool/dataFomat'
import { Descriptions } from 'antd'
import { setZoom } from 'tool/util'
import styles from './style.module.less'
import { DevicePixelRatio } from 'src/devicePixelRadio'

// 引入饼状图需要的模块

const GMVChatLine = (props: any) => {
  const [yoyData, setYoyData] = useState<any>({})
  const { unit } = props
  const renderContent = value => {
    const title = value[0].seriesName // Title
    const lastYearValue = value[1].value
    const dataValues = props.gmvTrend[value[0].dataIndex]
    return `<p style="color:#fff;font-size:16px">${value[0].axisValueLabel}</p>
            <p style='marginTop:10px'><span style="color:#fff">${title} (${unit})：</span>
             <span style="color:#47ba71">${value[0].value ? formatByTrd(Number(value[0].value)) : 0.0}</span></p>
            <p style='marginTop:15px'><span style="color:#fff;">去年同期(${unit})：</span><span style="color:#47ba71">${
      formatByTrd(Number(lastYearValue)) || 0.0
    }</span></p>
           ${setYoyContentHT(dataValues)}`
  }
  const setYoyContentHT = (dataValues) => {
    const { title } = props
    const {value, lastyear} = dataValues
    if (title === '现金流天数') {
      if ((Number(value) - Number(lastyear)) < 0) {
        return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#d3002c">
          ${formatByTrd(Number(decimalFormat(Number(value) - Number(lastyear))))}天
        </span></p>`
      }
      return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#47ba71">
       ${formatByTrd(Number(decimalFormat(Number(value) - Number(lastyear))))}天
      </span></p>`
    }
    if (dataValues.yoy < 0) {
      return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#d3002c">${
        dataValues.yoy ? percentFormat(dataValues.yoy) : '0%'
      }</span></p>`
    }

    return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#47ba71">${
      dataValues.yoy ? percentFormat(dataValues.yoy) : '0%'
    }</span></p>`
  }
  const filterConversion = data => {
    const { title } = props
    if (title == 'GMV' || title == '贡献利润' || title == '前台毛利') {
      console.log(data)
      return data ? Number(millionFormats(Number(data))) : 0
    }
    if (title == '现金流天数') {
      return data ? decimalFormat(Number(data)) : 0
    }
    return data ? percentFormat(Number(data), 2, false) : 0
  }
  const GMVEcharts = () => {
    const { firstClass, title, dataValue } = props
    const gmvChartData = props.gmvTrend
    if (gmvChartData) {
      let yAxisMonth = []
      console.log(gmvChartData)
       yAxisMonth = gmvChartData.map(item => item.date)
      const gmvArr = gmvChartData.map(item => {
        if (item.gmv) {
          return filterConversion(Number(item.gmv))
        }
        if (item.profit) {
          return filterConversion(Number(item.profit))
        }
        return filterConversion(Number(item.value))
      })
      const lastYearArr = gmvChartData.map(item => filterConversion(item.lastyear))
      console.log(lastYearArr)
      const yoyData = gmvChartData.map(item => item.yoy)
      setYoyData(yoyData)
      const myChart = echarts.init(document.getElementById('main'))
      myChart.resize({})
      myChart.setOption({
        title: {
          text: `${title} 趋势分析 ${unit && `(${unit})`}`,
          textStyle: {
            color: `rgba(0,0,0,0.8)`, // 修改标题文字颜色为红色
            fontSize: 14, // 修改标题文字大小为20px
          },
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,1);',
          axisPointer: {
          type: 'line',
          snap: true
          },
          borderColor: 'rgba(0,0,0,1);',
          formatter(param) {
            return renderContent(param)
          },
        },
        grid: {
          top: '35%',
          left: '10%',
          right: '0%',
          bottom: '10%',
        },
        legend: {
          right: 20, // 设置图例距离右边界的距离
          top: 0, // 设置图例距离上边界的距离
          itemWidth: 20, // 设置图例标记（点）的宽度
          itemHeight: 10, // 设置图例标记（点）的高度
          itemGap: 10, // 设置图例项之间的间距
        },

        xAxis: {
          data: yAxisMonth,
          axisTick: { show: false },
          // axisPointer: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: {
            // rotate: -10,
            interval: 0,
            textStyle: '#999',
            fontSize: '12',
          },
          label: {
            show: false,
            color: '#999999',
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: {
            // rotate: -10,
            interval: 0,
            textStyle: '#999',
            fontSize: '12',
          },
          label: {
            show: false,
            color: '#999999',
          },
        },
        series: [
          {
            name: title || 'GMV',
            data: gmvArr,
            type: 'line',
            lineStyle: {
              color: '#47BA71',
            },
            itemStyle: {
              normal: {
                color: '#47BA71',
                label: {
                  show: true, // 开启显示
                  formatter(param) {
                    return `${formatMoneyByTrdDecimal(Number(param.value))} ${unit}`
                  },
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#888',
                    fontSize: '0.8rem',
                  },
                },
              },
            },
            markLine: {
              symbol: 'none',
              data: dataValue?.max &&
                dataValue?.min && [
                  {
                    yAxis: dataValue.max, // 辅助线的值
                    label: {
                      show: true,
                      formatter: '上限',
                    },
                    lineStyle: {
                      color: '#D4D4D4',
                    },
                  },
                  {
                    yAxis: dataValue.min, // 辅助线的值
                    label: {
                      show: true,
                      formatter: '下限',
                    },
                    lineStyle: {
                      color: '#D4D4D4',
                    },
                  },
                ],
            },
          },
          {
            name: '去年同期',
            data: lastYearArr,
            type: 'line',
            lineStyle: {
              color: '#888',
            },
            itemStyle: {
              normal: {
                color: '#888888',
                label: {
                  show: false, // 开启显示
                  formatter(param) {
                    return `${formatMoneyByTrdDecimal(Number(param.value))} ${unit}`
                  },
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#888888',
                    fontSize: '0.8rem',
                  },
                },
              },
            },
          },
        ],
      })
       DevicePixelRatio.correctEchart()
    }
  }
  // const setTab = (value: any) => {
  //   console.log(value)
  //   setTabValue(value)
  // }
  useEffect(() => {
    GMVEcharts()
  }, [props.gmvTrend])
  return (
    <div className={styles.chartsContent} style={{ width: props.chartsWidth }}>
      <div className={styles.tbChat}>
        <b className={styles.secondB}>{yoyData.length > 0 && '同比:'}</b>
        <p>
          {yoyData.length > 0 &&
            yoyData.map((item, index) => (
              <span style={{ color: Number(item) > 0 ? '#47BA71' : '#D40933', width: `${100 / yoyData.length}%` }}>
                <b>
                  {props.title === '现金流天数' ? `${parseInt(Number(item))}天` : `${parseInt(Number(item * 100))}%`}
                </b>
              </span>
            ))}
        </p>
      </div>

      <div id="main" className={styles.chartMain} />
    </div>
  )
}
export default GMVChatLine
