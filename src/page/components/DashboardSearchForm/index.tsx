/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Select } from 'antd'
import { router } from 'src/router'
import * as commonApi from 'src/services/Common'
import dayjs from 'dayjs'

import styles from './style.module.less'
import { getMonthList, getWeekList } from './utils'

const { Option } = Select

function jsontoQuery(params: any) {
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')
  return queryString
}

const DashboardSearchForm = (props: any) => {
  const defaultValue = {
    // dateType: '月报',
    // dateValue: dayjs().format('YYYY-MM'),
    // mode: '自营',
    // firstCategoryId: '全部',
    // secondCategoryId: '全部',
    beginDate: '2023-05-01',
    endDate: '2023-05-31',
    firstDepartment: '生鲜业务部',
    secondDepartment: '豆制品组',
  }

  const [form] = Form.useForm()

  const { pathname } = window.location
  // const searchParams = Object.fromEntries(new URL(decodeURIComponent(window.location.href)).searchParams)

  const [monthList, setMonthList] = useState<any[]>([])

  const [weekList, setWeekList] = useState<any[]>([])

  const [dateRange, setDateRange] = useState<string>()

  const [dateParam, setDateParam] = useState<any>()

  const [firstData, setFirstData] = useState<any>([])

  const [secondData, setSecondData] = useState<any[]>([])

  // const onHandleChange = (v: any, t: any, k: any) => {
  //   const vl: any = form.getFieldsValue()
  //   const formt = vl?.dateType === '日报' ? 'YYYY-MM-DD' : 'YYYY-MM'
  //   let dateValue = dayjs(vl.dateValues).format(formt)
  //   let dateValues = dayjs(vl.dateValues)
  //   if (k === 'dateType' && v === '日报') {
  //     dateValue = dayjs().subtract(1, 'day').format(formt)
  //     dateValues = dayjs().subtract(1, 'day')
  //     form.setFieldsValue({
  //       dateValues,
  //     })
  //   }
  //   if (k === 'dateType' && v === '月报') {
  //     dateValue = dayjs(vl.dateValues).format(formt)
  //     dateValues = dayjs(vl.dateValues)
  //     form.setFieldsValue({
  //       dateValues,
  //     })
  //   }
  //   const formData = {
  //     ...searchParams,
  //     ...vl,
  //     dateValue,
  //     dateValues,
  //   }
  //   if (pathname === '/categoriesAllView') {
  //     router.replace(`/categoriesAllView?${jsontoQuery(formData)}`)
  //   }
  //   if (pathname === '/firstClass') {
  //     router.replace(`/firstClass?${jsontoQuery(formData)}`)
  //   }
  //   if (pathname === '/reclassify') {
  //     router.replace(`/reclassify?${jsontoQuery(formData)}`)
  //   }
  //   setTimeout(() => {
  //     props.onChange(formData)
  //   }, 300)
  // }

  const onfirstFirstDepartmentChange = async (val: any, record: any) => {
    console.log('valllllll::::', val)
    if (val === '全部') {
      const emitParam = { ...dateParam, parentName: '' }
      handleSearchData(emitParam)
      router.replace(`/dashborard/firstDepartment`)
    } else {
      const emitParam = { ...dateParam, parentName: val }
      handleSearchData(emitParam)
      router.replace(`/dashborard/firstDepartment`)
    }

    // if (val === '全部') {
    //   if (pathname !== '/categoriesAllView') {
    // const s = {
    //   ...searchParams,
    //   secondCategoryName: '全部',
    //   firstCategoryName: '全部',
    //   secondCategoryId: '全部',
    //   firstCategoryId: '全部',
    //   dateValues: dayjs(searchParams.dateValue),
    // }
    // router.replace(`/categoriesAllView?${jsontoQuery(s)}`)
    // }
    // } else if (pathname !== '/firstClass') {
    // const s = {
    //   ...searchParams,
    //   firstCategoryName: record.name,
    //   firstCategoryId: val,
    //   dateValues: dayjs(searchParams.dateValue),
    // }
    // router.push(`/firstClass?${jsontoQuery(s)}`)
    // } else {
    // 获取二级分类
    // const res = await queryCategories(2, val, { ...searchParams, dateValues: dayjs(searchParams.dateValue) })
    // setSecondData(res)
    // const formData = {
    //   ...searchParams,
    //   firstCategoryId: val,
    //   dateValues: dayjs(searchParams.dateValue),
    //   secondCategoryId: '全部',
    //   secondCategoryName: '全部',
    //   firstCategoryName: record.name,
    // }
    // router.push(`/firstClass?${jsontoQuery(formData)}`)
    // handleChangeData(formData)
    // }
  }

  const onSecondtCategoryChange = async (val: any, record: any) => {
    // if (val !== '全部') {
    //   if (pathname !== '/reclassify') {
    //     const s = {
    //       ...searchParams,
    //       secondCategoryName: record.name,
    //       secondCategoryId: val,
    //       firstCategoryId: String(searchParams?.firstCategoryId),
    //       dateValues: dayjs(searchParams.dateValue),
    //     }
    //     router.replace(`/reclassify?${jsontoQuery(s)}`)
    //   } else {
    //     const s = {
    //       ...searchParams,
    //       secondCategoryName: record.name,
    //       secondCategoryId: val,
    //       firstCategoryId: String(searchParams?.firstCategoryId),
    //       dateValues: dayjs(searchParams.dateValue),
    //     }
    //     router.replace(`/reclassify?${jsontoQuery(s)}`)
    //     handleChangeData(s)
    //   }
    // } else if (pathname !== '/firstClass') {
    //   const s = {
    //     ...searchParams,
    //     secondCategoryName: '全部',
    //     secondCategoryId: '全部',
    //     firstCategoryId: String(searchParams?.firstCategoryId),
    //     dateValues: dayjs(searchParams.dateValue),
    //   }
    //   router.replace(`/firstClass?${jsontoQuery(s)}`)
    // }
  }

  // const showSecond = pathname !== '/categoriesAllView'

  // const getDisableDate = (current: any) => current && current >= dayjs().subtract(-1)

  const handleChangeData = (formData: any) => {
    // form.setFieldsValue(formData)
    // const f = { ...formData }
    // if (f.firstCategoryId === '全部') {
    //   f.firstCategoryId = ''
    // }
    // if (f.secondCategoryId === '全部') {
    //   f.secondCategoryId = ''
    // }
    // props.onChange(f)
  }

  // 获取品类
  // const queryCategories = async (level: number, parentCategoryName?: string, formData: any) => {
  // console.log('searchParams')
  // const res = await commonApi.getdepartment({ level, parentCategoryName, ...formData })
  // if (res && res.data && res.data.code === 200 && res.data.data) {
  //   const rs = res.data.data?.map((ele: any) => {
  //     ele.id = ele.name
  //     return ele
  //   })
  //   rs.unshift({ id: '全部', name: '全部' })
  //   return rs
  // }
  // return false
  // }

  // const initData = async () => {
  // console.log('路由发生变化--------->>>>', pathname)
  // const res = await queryCategories(1, null, { ...defaultValue, dateValues: dayjs() })
  // setFirstData(res)
  // if (pathname === '/categoriesAllView') {
  //   if (!searchParams?.firstCategoryId) {
  //     const firstCategoryName = res?.find((ele: any) => `${ele.id}` == `${defaultValue.firstCategoryId}`)?.name
  //     const formData = {
  //       ...defaultValue,
  //       firstCategoryName,
  //       dateValues: dayjs(),
  //     }
  //     handleChangeData(formData)
  //     router.replace(`/categoriesAllView?${jsontoQuery(formData)}`)
  //   } else {
  //     const formData = {
  //       ...searchParams,
  //       dateValues: dayjs(searchParams?.dateValue),
  //       firstCategoryId: String(searchParams.firstCategoryId),
  //     }
  //     handleChangeData(formData)
  //   }
  // }
  // if (pathname === '/firstClass') {
  //   if (searchParams?.firstCategoryId) {
  //     const res = await queryCategories(2, searchParams?.firstCategoryName, {
  //       ...searchParams,
  //       dateValues: dayjs(searchParams.dateValue),
  //     })
  //     const secondCategoryName = res?.find((ele: any) => `${ele.id}` == `${defaultValue.secondCategoryId}`)?.name
  //     setSecondData(res)
  //     const formData = {
  //       ...searchParams,
  //       firstCategoryId: String(searchParams.firstCategoryId),
  //       dateValues: dayjs(searchParams.dateValue),
  //       secondCategoryId: '全部',
  //       secondCategoryName,
  //     }
  //     handleChangeData(formData)
  //   } else {
  //     const res = await queryCategories(1, null, { ...defaultValue, dateValues: dayjs() })
  //     // const firseyCategoryName = res[1].name,
  //     setFirstData(res)
  //     const res2 = await queryCategories(2, res[1]?.name, { ...defaultValue, dateValues: dayjs() })
  //     // const secondCategoryName = res2?.find((ele: any) => `${ele.id}` == `${defaultValue.secondCategoryId}`)?.name
  //     setSecondData(res2)
  //     const formData = {
  //       ...defaultValue,
  //       firstCategoryId: res[1].id,
  //       firstCategoryName: res[1]?.name,
  //       dateValues: dayjs(),
  //       secondCategoryId: '全部',
  //       secondCategoryName: '全部',
  //     }
  //     router.replace(`/firstClass?${jsontoQuery(formData)}`)
  //     handleChangeData(formData)
  //   }
  // }
  // if (pathname === '/reclassify') {
  //   console.log(789999111, searchParams.dateValue)
  //   if (searchParams?.firstCategoryId) {
  //     const res = await queryCategories(2, searchParams?.firstCategoryName, {
  //       ...searchParams,
  //       dateValues: dayjs(searchParams.dateValue),
  //     })
  //     setSecondData(res)
  //     const formData = {
  //       ...searchParams,
  //       firstCategoryId: String(searchParams.firstCategoryId),
  //       secondCategoryId: String(searchParams.secondCategoryId),
  //       dateValues: dayjs(searchParams.dateValue),
  //     }
  //     handleChangeData(formData)
  //   } else {
  //     const res = await queryCategories(1, null, { ...defaultValue, dateValues: dayjs() })
  //     setFirstData(res)
  //     const res2 = await queryCategories(2, res[1]?.name, { ...defaultValue, dateValues: dayjs() })
  //     // const secondCategoryName = res2?.find((ele: any) => `${ele.id}` == `${defaultValue.secondCategoryId}`)?.name
  //     setSecondData(res2)
  //     const formData = {
  //       ...defaultValue,
  //       firstCategoryId: res[1].id,
  //       firstCategoryName: res[1]?.name,
  //       dateValues: dayjs(),
  //       secondCategoryId: res2[1]?.id || res2[0]?.id,
  //       secondCategoryName: res2[1]?.name || res2[0]?.name,
  //     }
  //     router.replace(`/reclassify?${jsontoQuery(formData)}`)
  //     handleChangeData(formData)
  //   }
  // }
  // }

  const handleRest = () => {
    // if (pathname === '/categoriesAllView') {
    //   const fd = {
    //     ...defaultValue,
    //     dateValues: dayjs(),
    //   }
    //   handleChangeData({ ...fd })
    //   router.replace(`/categoriesAllView?${jsontoQuery(fd)}`)
    // }
    // if (pathname === '/firstClass') {
    //   const fd = {
    //     ...defaultValue,
    //     dateValues: dayjs(),
    //     firstCategoryId: firstData[1].id,
    //     firstCategoryName: firstData[1]?.name,
    //     secondCategoryId: '全部',
    //     secondCategoryName: '全部',
    //   }
    //   handleChangeData({ ...fd })
    //   router.replace(`/firstClass?${jsontoQuery(fd)}`)
    // }
    // if (pathname === '/firstClass') {
    //   const fd = {
    //     ...defaultValue,
    //     dateValues: dayjs(),
    //     firstCategoryId: firstData[1].id,
    //     firstCategoryName: firstData[1]?.name,
    //     secondCategoryId: '全部',
    //     secondCategoryName: '全部',
    //   }
    //   handleChangeData({ ...fd })
    //   router.replace(`/firstClass?${jsontoQuery(fd)}`)
    // }
    // if (pathname === '/reclassify') {
    //   const fd = {
    //     ...defaultValue,
    //     dateValues: dayjs(),
    //     firstCategoryId: firstData[1].id,
    //     firstCategoryName: firstData[1]?.name,
    //     secondCategoryId: secondData[1]?.id || secondData[0]?.id,
    //     secondCategoryName: secondData[1]?.name || secondData[0]?.name,
    //   }
    //   handleChangeData({ ...fd })
    //   router.replace(`/reclassify?${jsontoQuery(fd)}`)
    // }
  }

  const getFirstDepartment = async () => {
    const res = await commonApi.getdepartment(dateParam)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      const rs = res.data.data?.map((ele: any) => {
        ele.id = ele.name
        return ele
      })
      rs.unshift({ id: '全部', name: '全部' })
      setFirstData(rs)
      const emitParam = { ...dateParam }
      form.setFieldValue('firstDepartment', '全部')
      form.setFieldValue('secondDepartment', '全部')
      // handleSearchData(emitParam, pathname)
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

  const initData = () => {
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

  const handleSearchData = (param: any) => {
    props.emitSearchParam(param)
    // router.replace(`${pathnames}?${jsontoQuery(param)}`)
  }

  useEffect(() => {
    getFirstDepartment()
  }, [dateParam])

  useEffect(() => {
    console.log('初始化来了来了')
    initData()
  }, [])

  return (
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
          onChange={onfirstFirstDepartmentChange}
          className={styles.select}
          options={firstData}
          style={{ width: 140 }}
        />
      </Form.Item>
      <Form.Item label="二级部门" name="secondDepartment">
        <Select
          fieldNames={{ value: 'id', label: 'name' }}
          onChange={onSecondtCategoryChange}
          className={styles.select}
          style={{ width: 140 }}
          options={secondData && secondData.length ? secondData : [{ id: '全部', name: '全部' }]}
        />
      </Form.Item>
      <Button type="primary" onClick={handleRest}>
        重置
      </Button>
    </Form>
  )
}
export default DashboardSearchForm
