/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Table } from 'antd'
import SecondTitle from '../SecondTitle/index'
import { getTrackingColumn } from './columns';

const TrackingTable = ({ list,  level = 0, }: any) => {
  const columns = getTrackingColumn(level)
  // @ts-ignore
  return (
    <>
      <SecondTitle title="追踪小结" />
      <div style={{ marginBottom: 10 }}>
        <span style={{ color: '#333' }}>宠物业务部、洁护母婴业务部</span>存在大事件进度预警，提示重点关注、解决问题
      </div>
      <Table style={{fontSize: 14}} bordered scroll={{ x: 800, y: 500 }} dataSource={list} columns={columns} pagination={false} />
    </>
  )
}
export default TrackingTable
