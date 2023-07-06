/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import CategoriesDashboard from 'page/Dashborad/Supermarket'
import FirstClass from 'page/Dashborad/FirstDepartment'
import Reclassify from 'page/Dashborad/SecondDepartment'
import { useEffect, useState } from 'react'
import { Button, Form, Select, Spin } from 'antd'
import { router } from 'src/router'
import * as commonApi from 'src/services/Common'
import { getMonthList, getWeekList } from 'tool/dateUtils'

import styles from './style.module.less'

const BigEventForm = (props: any) => {
  const [searchParams, setSearchParams] = useState<any>()

  const { pathname } = window.location

  const [form] = Form.useForm()

  const queryObj = Object.fromEntries(new URL(decodeURIComponent(window.location.href)).searchParams)

  const [monthList, setMonthList] = useState<any[]>([])

  const [weekList, setWeekList] = useState<any[]>([])

  const [dateParam, setDateParam] = useState<any>()

  const [firstData, setFirstData] = useState<any>([])

  const [secondData, setSecondData] = useState<any[]>([])

  const [spin, setSpin] = useState(false)

  const onFirstDepartmentChange = async (val: any, record: any) => {
    if (val === 'ALL') {
      const emitParam = { ...dateParam, firstDepartment: '', secondDepartment: '' }
      setSecondData([])
      form.setFieldValue('secondDepartment', 'ALL')
      handleSearchData(emitParam)
    } else {
      const emitParam = { ...dateParam, firstDepartment: val, secondDepartment: '' }
      handleSearchData(emitParam)
      getSecondDepartment(val)
    }
  }

  const onSecondDepartmentChange = async (val: any, record: any) => {
    if (val === 'ALL') {
      const emitParam = { ...dateParam, firstDepartment: form.getFieldValue('firstDepartment'), secondDepartment: '' }
      handleSearchData(emitParam)
    } else {
      const emitParam = { ...dateParam, firstDepartment: form.getFieldValue('firstDepartment'), secondDepartment: val }
      handleSearchData(emitParam)
    }
  }

  const handleRest = () => {
    initMonthWeekData()
    form.setFieldValue('firstDepartment', 'ALL')
    form.setFieldValue('secondDepartment', 'ALL')
  }

  // 获取一级部门
  const getFirstDepartment = async () => {
    const res = await commonApi.getdepartment(dateParam)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      const rs = res.data.data?.map((ele: any) => {
        ele.id = ele.name
        return ele
      })
      rs.unshift({ id: 'ALL', name: '全部' })
      setFirstData(rs)
      const emitParam = { ...dateParam, firstDepartment: '', secondDepartment: '' }
      form.setFieldValue('firstDepartment', 'ALL')
      form.setFieldValue('secondDepartment', 'ALL')
      handleSearchData(emitParam)
      return rs
    }
    return false
  }

  // 获取二级部门
  const getSecondDepartment = async (val: any) => {
    const res = await commonApi.getdepartment({
      ...dateParam,
      parentName: val,
    })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      const rs = res.data.data?.map((ele: any) => {
        ele.id = ele.name
        return ele
      })
      rs.unshift({ id: 'ALL', name: '全部' })
      setSecondData(rs)
      const emitParam = { ...dateParam, firstDepartment: val, secondDepartment: '' }
      form.setFieldValue('secondDepartment', 'ALL')
      handleSearchData(emitParam)
      return rs
    }
    return false
  }

  // 月份变化
  const handleMonthChange = (value: string) => {
    const wk = getWeekList(value)
    setWeekList(wk)
    form.setFieldValue('week', wk?.[0]?.value)
    const dattArr = wk?.[0]?.value.split(',')
    setDateParam({
      beginDate: dattArr[0],
      endDate: dattArr[1],
      parentName: '',
    })
  }

  // 日期范围变化
  const onWeekChange = (value: string) => {
    const dattArr = value.split(',')
    setDateParam({
      beginDate: dattArr[0],
      endDate: dattArr[1],
      parentName: '',
    })
  }

  // 初始化月份数据
  const initMonthWeekData = () => {
    setMonthList(getMonthList())
    form.setFieldValue('month', getMonthList()[0].value)
    const wk = getWeekList(getMonthList()[0]?.value)
    setWeekList(wk)
    form.setFieldValue('week', wk?.[0]?.value)
    const dattArr = wk?.[0]?.value.split(',')
    setDateParam({
      beginDate: dattArr[0],
      endDate: dattArr[1],
      parentName: '',
    })
  }

  const initData = () => {
    initMonthWeekData()
  }

  const handleSearchData = (param: any) => {
    const rq = { ...param }
    try {
      delete rq.parentName
    } catch (error) {}
    // setSearchParams(rq)
    props.emitSearch(param)
  }

  const handleAdd = () => {
    router.push('/bigEventManage/bigEventAdd')
  }

  const handleStatusChange = (val: any) => {
    // setProcessSatus(val)
    props.emitSearch({
      ...dateParam,
      firstDepartment: form.getFieldValue('firstDepartment'),
      secondDepartment: form.getFieldValue('secondDepartment'),
      status: form.getFieldValue('status'),
    })
    props.emitStatus(val)
  }

  useEffect(() => {
    getFirstDepartment()
  }, [dateParam])

  useEffect(() => {
    form.setFieldValue('status', '进行中')
    initData()
  }, [])

  return (
    <>
      {spin && <Spin tip="数据加载中..." spinning={spin} className="spinContent" />}
      <div style={{ padding: 16 }}>
        <Form className={styles.form} form={form} name="horizontal_login" layout="inline">
          <Form.Item label="月份" name="month">
            <Select onChange={handleMonthChange} className={styles.select} options={monthList} style={{ width: 140 }} />
          </Form.Item>
          <Form.Item label="月份" name="week" noStyle>
            <Select onChange={onWeekChange} className={styles.select} options={weekList} style={{ width: 140 }} />
          </Form.Item>
          <div style={{ marginLeft: 20 }} />
          <Form.Item label="一级部门" name="firstDepartment">
            <Select
              fieldNames={{ value: 'id', label: 'name' }}
              onChange={onFirstDepartmentChange}
              className={styles.select}
              options={firstData}
              style={{ width: 140 }}
            />
          </Form.Item>
          <Form.Item label="二级部门" name="secondDepartment">
            <Select
              fieldNames={{ value: 'id', label: 'name' }}
              onChange={onSecondDepartmentChange}
              className={styles.select}
              style={{ width: 140 }}
              options={secondData && secondData.length ? secondData : [{ id: 'ALL', name: '全部' }]}
            />
          </Form.Item>
          <Form.Item label="进展状态" name="status">
            <Select
              // fieldNames={{ value: 'id', label: 'name' }}
              onChange={handleStatusChange}
              className={styles.select}
              style={{ width: 140 }}
              options={[
                {
                  value: '进行中',
                  label: '进行中',
                },
                {
                  value: '已删除',
                  label: '已删除',
                },
                {
                  value: '已完成',
                  label: '已完成',
                },
              ]}
            />
          </Form.Item>
          <Button onClick={handleRest} className={styles.reset}>
            重置
          </Button>
          <Button type="primary" style={{ marginLeft: 20 }} onClick={handleAdd} className={styles.luru}>
            录入大事件
          </Button>
        </Form>
      </div>
    </>
  )
}
export default BigEventForm
