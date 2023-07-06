import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Steps } from 'antd'
import MagjorEventsTable from 'page/Dashborad/MagjorEventsTable'
import { getBoundaryDetail } from 'src/services/Dashboard/Supermarket'
// import styles from './style.module.less'

const BoundaryModal = (props: any) => {
    const [list, setList] = useState()

    const getDetail = async () => {
      const res = await getBoundaryDetail({
        beginDate: props.formData.beginDate,
        endDate: props.formData.endDate,
        firstDepartment: props?.clickRecord.departmentName,
      })
      if (res && res.data && res.data.code === 200 && res.data.data) {
        setList(res?.data?.data || [])
      }
    }
  
    useEffect(() => {
      getDetail()
    }, [])
  return (
    <>
      <Modal
        width={800}
        title="边界线异常"
        open={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <div style={{ marginTop: 20, marginBottom: 20 }}>一级部门： {props?.clickRecord?.departmentName}</div>
        <MagjorEventsTable list={list}/>
      </Modal>
    </>
  )
}

export default BoundaryModal
