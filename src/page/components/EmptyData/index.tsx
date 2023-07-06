import React from 'react'
import noData from 'src/assets/images/categroy-icon/noData.png'

const EmptyData = () => (
  <div className="allNoData">
    <img src={noData} alt="" />
    <p>暂无数据</p>
  </div>
)
export default EmptyData
