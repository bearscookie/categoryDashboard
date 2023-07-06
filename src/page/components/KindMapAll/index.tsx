import React, { useEffect, useState } from 'react'

import GMVChatMap from '../GMVChatMap'
import { Tooltip } from 'antd'
import './style.less'

const TrendAnalysis = (props: any) => {
  console.log(props,'TrendAnalysis')
  useEffect(() => { }, [])
  return (
    <div className="kindAll">
      <p className="kindTitle">
        <span>品类角色</span>
      </p>
      <p className='subKindTitle'>
        <b>{props.formData?.secondCategoryName || '全部'}</b> <span>{props.turnoverTrend[0]?.actualRoleName }</span>
      </p>
      <GMVChatMap turnoverTrend={props.turnoverTrend[0]} categoryName={props.formData.secondCategoryName} chartsWidth="100%" firstClass={1} />
      <div className="tzOrZC">
        <p>
          <b>品类特征：</b>
          <span>{props.turnoverTrend[0]?.feature &&
          props.turnoverTrend[0].feature.split(',').map(item => {
              return (
                <Tooltip title={item}>
                  <span>{item}</span>
                </Tooltip>
              )
              
            })}</span>
          
        </p>
        <p>
          <b>增长举措：</b>
          <span>
            {props.turnoverTrend[0]?.growBrand &&
            props.turnoverTrend[0].growBrand.split(',').map(item => {
              return (
                <Tooltip title={item}>
                  <span>{item}</span>
                </Tooltip>
              )
              
            })}
          </span>
          
        </p>
      </div>
    </div>
  )
}
export default TrendAnalysis
