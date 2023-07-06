/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import GoodsTable from './goods'
import PerformanceTable from './performance'
import ProfitTable from './profit'
import ShopTable from './shop'

// import styles from './style.module.less'
// import noraml from '../../../assets/images/categroy-icon/tongguo.png'
// import lowRisk from '../../../assets/images/categroy-icon/difengxian.png'
// import highRisk from '../../../assets/images/categroy-icon/gaofengxian.png'
import BigEventTable from './TargetTrackingTable'
import User1 from './user1'
import User2 from './user2'
// import BoundaryTable from './BoundaryTable'

const { Option } = Select

const TargetSplit = (props: any) => {
  console.log('目标拆解===>>>>>>')
  return (
    <>
      <div>
        <Select style={{ width: 100, float: 'right' }}>
          <Option value="全部">全部</Option>
          <Option value="自营">自营</Option>
          <Option value="POP">POP</Option>
        </Select>
      </div>
      <h3>业绩维度</h3>
      <PerformanceTable list={props.gmvSplitData} />
      <h3>利润维度</h3>
      <ProfitTable list={props.profitSplitData} />
      <h3>用户维度</h3>
      <User1  list={props.user1Data} />
      <User2  list={props.user2Data} />
      {/* <h3>商品维度</h3>
      <GoodsTable {...props} />
      <h3>店铺维度</h3>
      <ShopTable {...props} /> */}
    </>
  )
}

export default TargetSplit
