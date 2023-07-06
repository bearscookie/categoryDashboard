import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import * as echarts from 'echarts'
import { formatMoneyByTenMillon,formatMoneyByTrdDecimal, percentFormat, formatByTrd, formatMoneyBymillion, decimalFormat } from 'tool/format'
import { setZoom } from 'tool/util'
import styles from './style.module.less'
import { DevicePixelRatio} from 'src/devicePixelRadio'
const GMVChatBar = (props: any) => {
  const { nameFailed } = props
  const [yoyData, setYoyData] = useState<any>({})
  const renderContent = value => {
    const title = value[0].seriesName // Title
    const lastYearValue = value[1].value
    const dataValues = props.turnoverTrend[value[0].dataIndex]
    return `<p style="color:#fff;font-size:16px">${value[0].axisValueLabel}</p>
            <p style='marginTop:10px'><span style="color:#fff">${title} (${filterDataOrTitle()})：</span>
             <span style="color:#47ba71">${value[0].value ? formatByTrd(Number(value[0].value)) : 0.0}</span></p>
           ${setYoyContentHT(dataValues)}`
  }
  const setYoyContentHT = (dataValues) => {
    const { nameFailed } = props
    const {value,yoy,lastyear} = dataValues
    if (nameFailed === '现金流天数') {
      if ((Number(value) - Number(lastyear)) < 0) {
        return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#d3002c">
          ${decimalFormat(Number(value) - Number(lastyear))}天
        </span></p>`
      }
      return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#47ba71">
       ${decimalFormat(Number(value) - Number(lastyear))}天
      </span></p>`
    }
    if (yoy < 0) {
      return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#d3002c">${
        yoy ? percentFormat(yoy) : '0%'
      }</span></p>`
    }

    return `<p style='marginTop:15px'><span style="color:#fff;">同比：</span><span style="color:#47ba71">${
      yoy ? percentFormat(yoy) : '0%'
    }</span></p>`
  }
  const filterDataOrTitle = () => {
    // 过滤单位名称
     const { nameFailed } = props
     const title = nameFailed
    if (title == 'GMV' || title == '贡献利润' || title == '连带新客30天GMV') {
      return '百万'
    } else if (title == '现金流天数') {
      return '天'
    } else if (title == 'UV') {
       return 'UV'
    } else if (title.indexOf('占比') !== -1 || title == '转化率') {
      return '%'
    } else {
      return ''
    }
  }
  const filterConversion = (data, isUnit) => {
    const { nameFailed } = props
    const title = nameFailed
    if (title == 'GMV' || title == '贡献利润') {
      return `${data ? formatByTrd(Number(formatMoneyByTenMillon(Number(data)))) : 0} ${isUnit ? '百万' : ''}`
    }
    if (title == '现金流天数') {
      return `${data ? decimalFormat(Number(data)) : 0} ${isUnit ? '天' : ''}`
    }
    if (title == 'UV') {
      return `${data ? formatByTrd(Number(formatMoneyBymillion(Number(data)))) : 0} ${isUnit ? '万' : ''}`
    }
    if (title == 'SKU数量') {
      return data ? formatByTrd(Number(parseInt(Number(data)))) : 0
    }
    if (title == '客单价' || title == '价格指数' || title == '连带件数') {
      return data ? formatByTrd(Number(decimalFormat(Number(data)))) : 0
    }
    return `${data ? percentFormat(Number(data), 2, false) : 0} ${isUnit ? '%' : ''} `

    return decimalFormat(Number(data))
  }

  
   const filterConversionData = (data) => {
    const { nameFailed } = props
    const title = nameFailed
    if (title == 'GMV' || title == '贡献利润') {
      return `${data ? Number(formatMoneyByTenMillon(Number(data))) : 0}`
    }
    if (title == '现金流天数') {
      return `${data ? Number(data).toFixed(2) : 0}`
    }
    if (title == 'UV') {
      return `${data ? Number(formatMoneyBymillion(Number(data))) : 0}`
    }
    if (title == 'SKU数量') {
      return data ? Number(parseInt(Number(data))) : 0
    }
    if (title == '客单价' || title == '价格指数' || title == '连带件数') {
      return data ? Number(decimalFormat(Number(data))) : 0
    }
    return `${data ? percentFormat(Number(data), 2, false) : 0} `

    return decimalFormat(Number(data))
  }

  const tbFilterVal = value => {
     console.log(nameFailed, value)
    return filterConversion(value.data, true)
   
    //   if (nameFailed == '现金流天数') {
    //   return `${data ? decimalFormat(Number(data)) : 0}`
    // }
  }

  const GMVEcharts = () => {
    const gmvChartData = props.turnoverTrend
    if (gmvChartData) {
      let yAxisMonth = []
      let gmvArr = []
      let lastYearArr = []
      if (!props.isGmvDetail) {
        yAxisMonth = gmvChartData.map(item => item.month.split(' ')[0])
        gmvArr = gmvChartData.map(item => Number(item.turnoverDays).toFixed(2))
        lastYearArr = gmvChartData.map(item => Number(item.lastyear).toFixed(2))
      } else {
        yAxisMonth = gmvChartData.map(item => item.xname)
        gmvArr = gmvChartData.map(item => filterConversionData(Number(item.value)))
        lastYearArr = gmvChartData.map(item => {
          if (nameFailed == '现金流天数') {
            return Number(item.yoy).toFixed(2)
          } else {
            return Number(item.yoy*100).toFixed(2)
          }
        })
      }
      const myChart = echarts.init(document.getElementById(props.id))
      myChart.setOption({
        title: {
          // text: !props.isGmvDetail ? '现金流天数 趋势分析（天）' : '',
          textStyle: {
            color: `rgba(0,0,0,0.8)`, // 修改标题文字颜色为红色
            fontSize: 14, // 修改标题文字大小为20px
          },
        },
        grid: {
          top: '15%',
          left: '15%',
          right: '5%',
          bottom: '10%',
        },
        legend: {
          right: 20, // 设置图例距离右边界的距离
          top: 0, // 设置图例距离上边界的距离
          itemWidth: 20, // 设置图例标记（点）的宽度
          itemHeight: 10, // 设置图例标记（点）的高度
          itemGap: 10, // 设置图例项之间的间距
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,1);',
          borderColor: 'rgba(0,0,0,1);',
          formatter(param) {
            return renderContent(param)
          },
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
            textStyle: '#888',
            fontSize: '12',
          },
          label: {
            show: false,
            color: '#888',
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisLabel: {
              // rotate: -10,
              interval: 0,
              textStyle: '#888',
              fontSize: '12',
            },
            label: {
              show: false,
              color: '#888',
            },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisLabel: {
              // rotate: -10,
              interval: 0,
              textStyle: '#888',
              fontSize: '12',
              min: -100,
              max: 100,
            },
            label: {
              show: false,
              color: '#888',
            },
            interval: 5,
          },
        ],
        series: [
          {
            name: props.nameFailed ? props.nameFailed : '现金流天数',
            data: gmvArr,
            type: 'bar',
            lineStyle: {
              color: '#47BA71',
            },
            itemStyle: {
              normal: {
                color: '#47BA71',
                label: {
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  formatter(param) {
                    return `${formatMoneyByTrdDecimal(Number(param.value))} ${filterDataOrTitle()}`
                  },
                  textStyle: {
                    // 数值样式
                    color: '#9999',
                    fontSize: '0.8rem',
                  },
                },
              },
            },
          },
          {
            name: '同比',
            data: lastYearArr,
            type: 'line',
            lineStyle: {
              color: '#d2e7de',
            },
            itemStyle: {
              normal: {
                color: '#d2e7de',
                label: {
                  formatter(param) {
                    return `${formatMoneyByTrdDecimal(Number(param.value))} ${nameFailed == '现金流天数' ? '天' : '%'}`
                  },
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#999',
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
  }, [props])

  return (
    <div className={styles.chartsContent} style={{ width: props.chartsWidth }}>
      <div id={props.id} className={styles.chartMain} />
    </div>
  )
}
export default GMVChatBar
