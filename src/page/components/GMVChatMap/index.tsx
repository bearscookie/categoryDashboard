import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import * as echarts from 'echarts'
import {setZoom} from 'tool/util'
import { DevicePixelRatio} from 'src/devicePixelRadio'
import styles from './style.module.less'

const GMVChatMap = (props: any) => {
  const renderContent = value => {
    // const title = value[0].seriesName // Title
    // const lastYearValue = value[1].value
    const dataValues = props.turnoverTrend
    return `
            <p style='marginTop:10px'><span style="color:#fff;display:inline-block;width:80px">二级品类：</span>
             <span style="color:#47ba71">${props.categoryName}</span></p>
            <p style='marginTop:15px'>
              <span style="color:#fff;display:inline-block;width:80px">京东心智：</span>
              <span style="color:#47ba71">${Number(dataValues.guestPull).toFixed(2)}</span>
            </p>
             <p style='marginTop:15px'>
              <span style="color:#fff;display:inline-block;width:80px">价格敏感度：</span>
              <span style="color:#47ba71">${Number(dataValues.advantage).toFixed(2)}</span>
            </p>
             <p style='marginTop:15px'>
              <span style="color:#fff;display:inline-block;width:80px">消费者渗透：</span>
              <span style="color:#47ba71">${Number(dataValues.permeateRatio).toFixed(2)}</span>
            </p>
             <p style='marginTop:15px'>
              <span style="color:#fff;display:inline-block;width:80px">商品迭代：</span>
              <span style="color:#47ba71">${Number(dataValues.performance).toFixed(2)}</span>
            </p>
             <p style='marginTop:15px'>
              <span style="color:#fff;display:inline-block;width:80px">市场趋势：</span>
              <span style="color:#47ba71">${Number(dataValues.customerAccept).toFixed(2)}</span>
            </p>
             <p style='marginTop:15px'>
              <span style="color:#fff;display:inline-block;width:80px">差异化需求：</span>
              <span style="color:#47ba71">${Number(dataValues.categoryTrue).toFixed(2)}</span>
            </p>
            `
  }

  const GMVEcharts = () => {
    console.log(props, 'ap')
    const gmvChartData = props.turnoverTrend
    if (gmvChartData) {
      // const { guestPullGoal, advantageGoal, permeateRatioGoal, performanceGoal, customerAcceptGoal, categoryTrueGoal } =
      //   gmvChartData
      const { guestPull, advantage, permeateRatio, performance, customerAccept, categoryTrue } = gmvChartData
      const myChart = echarts.init(document.getElementById('#main'))
      // const consult = [
      //   guestPullGoal,
      //   advantageGoal,
      //   permeateRatioGoal,
      //   performanceGoal,
      //   customerAcceptGoal,
      //   categoryTrueGoal,
      // ].map(item => Number(item))
      const persentNotDay = [guestPull, advantage, permeateRatio, performance, customerAccept, categoryTrue].map(item =>
        Number(item),
      )
      // console.log(consult, 'consult')
      myChart.setOption({
        grid: {
          top: '15%',
          left: '10%',
          right: '5%',
          // bottom: '10%',
        },
        legend: {
          right: 20, // 设置图例距离右边界的距离
          top: 0, // 设置图例距离上边界的距离
          // itemWidth: 20, // 设置图例标记（点）的宽度
          // itemHeight: 10, // 设置图例标记（点）的高度
          // itemGap: 10, // 设置图例项之间的间距
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,1);',
          show: true,
          axisPointer: {
            type: 'shadow',
          },
          borderColor: 'rgba(0,0,0,1);',
          formatter(param) {
            return renderContent(param)
          },
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '京东心智', max: 10 },
            { name: '价格敏感度', max: 10 },
            { name: '消费者渗透', max: 10 },
            { name: '商品迭代', max: 10 },
            { name: '市场趋势', max: 10 },
            { name: '差异化需求', max: 10 },
          ],
          name: {
            textStyle:{color: '#888'}
          }
        },
        series: [
          // {
          //   type: 'radar',
          //   data: [
          //     {
          //       value: consult,
          //       name: '参考标准',
          //       lineStyle: {
          //         color: '#888888',
          //       },
          //       symbol: 'none',
          //       itemStyle: {
          //         normal: {
          //           color: '#888888',
          //           borderWidth: 0,
          //           label: {
          //             show: false, // 开启显示
          //             position: 'top', // 在上方显示
          //             textStyle: {
          //               // 数值样式
          //               color: '#000',
          //               fontSize: '0.5rem',
          //             },
          //           },
          //         },
          //       },
          //     },
          //   ],
          //   // lineStyle: {
          //   //   color: '#d2e7de',
          //   // },
          //   // itemStyle: {
          //   //   normal: {
          //   //     color: '#d2e7de',
          //   //     label: {
          //   //       show: true, // 开启显示
          //   //       position: 'top', // 在上方显示
          //   //       textStyle: {
          //   //         // 数值样式
          //   //         color: '#9999',
          //   //         fontSize: '0.5rem',
          //   //       },
          //   //     },
          //   //   },
          //   // },
          // },
          {
            type: 'radar',
            data: [
              {
                value: persentNotDay,
                name: '当前值',
                lineStyle: {
                  color: '#47BA71',
                },
                areaStyle: {
                  color: 'rgba(71,186,113,0.30)',
                },
                itemStyle: {
                  normal: {
                    color: '#47BA71',
                    label: {
                      show: false, // 开启显示
                      position: 'top', // 在上方显示
                      textStyle: {
                        // 数值样式
                        color: '#000',
                        fontSize: '0.5rem',
                      },
                    },
                  },
                },
              },
            ],
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
  }, [props.turnoverTrend, props.chartsWidth ])

  return (
    <div className={styles.chartsContent} style={{ width: props.chartsWidth }}>
      <div id="#main" className={styles.chartMain}/>
    </div>
  )
}
export default GMVChatMap
