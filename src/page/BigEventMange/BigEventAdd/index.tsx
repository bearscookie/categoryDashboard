/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, DatePicker, Form, Input, InputNumber, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import noData from 'src/assets/images/categroy-icon/noData.png'
import { router } from 'src/router'
import { getdepartment } from 'src/services/Common'
import dayjs from 'dayjs'
import {
  addBigEvent,
  getBigEvent,
  getDraftByBigBoss,
  getReferValue,
  getSecondCategory,
  updateBigEvent,
} from 'src/services/BigEventManage'

import styles from './style.module.less'
import SelectEventModal from './selectEventModal'
import IndexSelectModal from './indexSelectModal'

const bigBoss = '马小兔'

const BigEventAdd = () => {
  const [form] = Form.useForm()

  const queryObj = Object.fromEntries(new URL(decodeURIComponent(window.location.href)).searchParams)

  const [isEdit, setIsEdit] = useState<boolean>(Boolean(queryObj.id))

  const [firstDepartment, setFirstDeartment] = useState<any[]>([])

  const [secondDeartment, setSecondDeartment] = useState<any[]>([])

  const [secondCategory, setSecondCategory] = useState<any[]>([])

  const [eventModalVisble, setEventModalVisible] = useState<boolean>(false)

  const [indexModalVisble, setIndexModalVisble] = useState<boolean>(false)

  const [editId, setEditId] = useState(queryObj.id)

  const [selectedBigEvent, setSelectedBigEvent] = useState<any>()

  const [editData, setEditData] = useState<any>()

  const [referValue, setReferValue] = useState<any>()

  const [categoryRole, setCategoryRole] = useState<any>()

  const [categoryFuture, setCategoryFuture] = useState<any>()

  console.log('queryObj:::', queryObj)

  // 获取一级部门
  const getFirstDepartment = async () => {
    const res = await getdepartment({
      parentName: '',
      bigBoss,
      endDate: '',
      beginDate: '',
    })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setFirstDeartment(res.data.data)
    }
  }

  // 获取二级部门信息
  const handleFirstChange = async (e: any) => {
    const res = await getdepartment({
      parentName: e,
      bigBoss,
      endDate: '',
      beginDate: '',
    })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setSecondDeartment(res.data.data)
    }
  }

  // 获取二级品类
  const handleSecondDepartChange = async (e: any) => {
    const res = await getSecondCategory({
      secondDepartment: e,
      firstDepartment: form.getFieldValue('firstDepartment'),
      bigBoss,
    })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setSecondCategory(res.data.data)
    }
  }

  // 获取品类角色
  const handleSecondCategoryChange = async (e: any, option: any) => {
    form.setFieldValue('categoryRole', option.categoryRole)
    setCategoryRole(option.categoryRole)
    setCategoryFuture(option.feature)
  }

  // 获取草稿
  const queryDraftByBigBoss = async () => {
    const res = await getDraftByBigBoss({ bigBoss })
    if (res && res.data?.code === 200 && res?.data?.data) {
      if (res?.data?.data?.id) {
        setIsEdit(true)
        setEditId(res?.data?.data?.id)
      }
      form.setFieldsValue(res?.data.data)
    }
  }

  // 获取参考值
  const queryReferValue = async () => {
    const res = await getReferValue({})
    if (res && res.data?.code === 200 && res?.data?.data) {
      setReferValue(res.data.data)
    }
  }

  // 获取是否是推荐
  const getIsRecommend = () => {
    if (!selectedBigEvent) {
      return '否'
    }
    if (categoryRole === '尝新' && selectedBigEvent.newRole === '1') {
      return '是'
    }
    if (categoryRole === '目的地(待打造)' && selectedBigEvent.pending === '1') {
      return '是'
    }
    if (categoryRole === '引流' && selectedBigEvent.drainage === '1') {
      return '是'
    }
    if (categoryRole === '小众专业' && selectedBigEvent.small === '1') {
      return '是'
    }
    if (categoryRole === '目的地(现存)' && selectedBigEvent.target === '1') {
      return '是'
    }
    return '否'
  }

  // 提交
  const handleSubmit = (isSubmit: number) => {
    form
      .validateFields()
      .then(async vals => {
        const param = {
          ...vals,
          isSubmit,
          endDate: vals.date[1].format('YYYY-MM'),
          beginDate: vals.date[0].format('YYYY-MM'),
          lastYear: referValue?.lastYear,
          lastMonth: referValue?.lastMonth,
          bigBoss,
          isRecommend: getIsRecommend(),
        }
        delete param.date
        const fun = isEdit ? updateBigEvent : addBigEvent
        if (isEdit) {
          param.id = editId
        }
        const res = await fun(param)
        if (res && res.data && res.data.code === 200) {
          message.success(isEdit ? '修改成功' : '添加成功')
          router.push('/bigEventManage/bigEventList')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const getCategoryFuture = () => {
    if (categoryFuture) {
      const returnArr = []
      const arr = categoryFuture.split('\n')
      if (arr[0]) {
        const tx = arr[0].split('：')?.[0]
        returnArr.push(tx)
      }
      if (arr[1]) {
        const cl = arr[1].split('：')?.[1]
        returnArr.push(cl)
      }
      console.log('returnArr:::', returnArr)
      return returnArr
    }
    return []
  }

  useEffect(() => {
    if (isEdit) {
      queryObj.date = [dayjs(queryObj.beginDate, 'YYYY-MM'), dayjs(queryObj.endDate, 'YYYY-MM')]
      const ob: any = { ...queryObj }
      Object.keys(ob).forEach(key => {
        if (ob[key] === 'null') {
          ob[key] = null
        }
        // setEditData(ob)
        // if (ob.beginDate && ob.endDate) {
        //   ob.date = [moment(ob.beginDate), moment(ob.endDate)]
        // }
        form.setFieldsValue(ob)
      })
    } else {
      queryDraftByBigBoss()
    }
    getFirstDepartment()
    queryReferValue()
  }, [])

  return (
    <>
      <div className={styles.addsWrap}>
        <Form form={form}>
          <div className={styles.topWrap}>
            <div className={styles.departInfo}>
              <div className={styles.titleInfo}>
                <span>部门信息</span>
              </div>
              <div className={styles.formWrap}>
                <div className={styles.selectWrap}>
                  <div>一级部门</div>
                  <div>
                    <Form.Item name="firstDepartment" rules={[{ required: true, message: '请选择一级部门' }]}>
                      <Select
                        fieldNames={{ value: 'name', label: 'name' }}
                        style={{ width: '100%' }}
                        onChange={handleFirstChange}
                        options={firstDepartment}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.selectWrap}>
                  <div>二级部门</div>
                  <div>
                    <Form.Item name="secondDepartment" rules={[{ required: true, message: '请选择二级部门' }]}>
                      <Select
                        fieldNames={{ value: 'name', label: 'name' }}
                        style={{ width: '100%' }}
                        onChange={handleSecondDepartChange}
                        options={secondDeartment}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.selectWrap}>
                  <div>Big Boss</div>
                  <div>{bigBoss}</div>
                </div>
              </div>
            </div>
            <div className={styles.categoryInfo}>
              <div className={styles.titleInfo}>
                <span>品类信息</span>
              </div>
              <div className={styles.formWrap}>
                <div className={styles.selectWrap}>
                  <div>二级品类</div>
                  <div>
                    <Form.Item name="categoryName" rules={[{ required: true, message: '请选择二级品类' }]}>
                      <Select
                        fieldNames={{ value: 'secondCategory', label: 'secondCategory' }}
                        style={{ width: '100%' }}
                        onChange={handleSecondCategoryChange}
                        options={secondCategory}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.selectWrap}>
                  <div>品类角色</div>
                  <div>
                    <Form.Item name="categoryRole">
                      {categoryRole && (
                        <div>
                          <span className={styles.categoryRole}>{categoryRole}</span>
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.selectWrap}>
                  <div>品类特征</div>
                  <div>
                    <Form.Item name="categoryFuture">
                      {!!getCategoryFuture()?.length && (
                        <div>
                          <div className={styles.categoryFuture}>
                            <span>品类特性</span>
                            <span>{getCategoryFuture()?.[0]}</span>
                          </div>
                          <div className={styles.categoryFuture}>
                            <span>核心策略</span>
                            <span>{getCategoryFuture()?.[1]}</span>
                          </div>
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottomWrap}>
            <div className={styles.titleInfo}>
              <span>大事件信息</span>
            </div>
            <div>
              {/* 大事件 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>
                    大事件
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="content" rules={[{ required: true, message: '请选择大事件' }]}>
                      <Input
                        onClick={() => {
                          setEventModalVisible(true)
                        }}
                        style={{ width: 'calc(100% - 20px)' }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>
                  优先选择品类角色推荐策略，选择非推荐策略时，大事件追踪页面将呈现对应标识
                </div>
              </div>
              {/* 大事件描述 */}
              <div className={styles.itemList} style={{ height: 200 }}>
                <div className={styles.leftWrap}>
                  <div style={{ paddingTop: 70 }}>
                    大事件描述
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="description" rules={[{ required: true, message: '请输入大事件描述' }]}>
                      <Input.TextArea
                        placeholder="请输入大事件描述"
                        style={{ width: 'calc(100% - 20px)', height: '180px' }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap} style={{ paddingTop: 80 }}>
                  大事件是指该二级品类重点事项，需要按照大事件追踪流程和规范填写，示例：XXXX
                  <a href="#">查看填写规范</a>
                </div>
              </div>
              {/* 起止时间 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>
                    起止时间
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="date" rules={[{ required: true, message: '请选择时间' }]}>
                      <DatePicker.RangePicker picker="month" style={{ width: 'calc(100% - 20px)' }} />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>设置大事件的开始和结束月份</div>
              </div>
              {/* 指标 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>
                    指标
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="index" rules={[{ required: true, message: '请选择指标' }]}>
                      <Input
                        onClick={() => {
                          setIndexModalVisble(true)
                        }}
                        style={{ width: 'calc(100% - 20px)' }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>
                  可选择品类角色优先推荐指标，也可从健康度指标选择其他自选指标，或输入自定义指标
                </div>
              </div>
              {/* 适用范围 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>
                    适用范围
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="mode" rules={[{ required: true, message: '请选择适用范围' }]}>
                      <Select
                        style={{ width: 'calc(100% - 20px)' }}
                        options={[
                          { value: '整体', label: '整体' },
                          { value: '自营', label: '自营' },
                          { value: 'POP', label: 'POP' },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>
                  {/* 可选择品类角色优先推荐指标，也可从健康度指标选择其他自选指标，或输入自定义指标 */}
                </div>
              </div>
              {/* 完成标准 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>
                    完成标准
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="completeStandard" rules={[{ required: true, message: '请选择完成标准' }]}>
                      <Select
                        style={{ width: 'calc(100% - 20px)' }}
                        options={[
                          { value: '大于等于目标值', label: '大于等于目标值' },
                          { value: '小于等于目标值', label: '小于等于目标值' },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>
                  {/* 可选择品类角色优先推荐指标，也可从健康度指标选择其他自选指标，或输入自定义指标 */}
                </div>
              </div>
              {/* 目标类型 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>
                    目标类型
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="targetType" rules={[{ required: true, message: '请选择目标类型' }]}>
                      <Select
                        style={{ width: 'calc(100% - 20px)' }}
                        options={[
                          { value: '指标数值', label: '指标数值' },
                          { value: '同比', label: '同比' },
                          { value: '环比', label: '环比' },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>
                  {/* 可选择品类角色优先推荐指标，也可从健康度指标选择其他自选指标，或输入自定义指标 */}
                </div>
              </div>
              {/* 目标值 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>
                    目标值
                    <span className={styles.required}>*</span>
                  </div>
                  <div>
                    <Form.Item name="targetValue" rules={[{ required: true, message: '请输入目标值' }]}>
                      <InputNumber placeholder="请输入目标值" style={{ width: 'calc(100% - 20px)' }} />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>目标值为大事件结束时需要达到的目标</div>
              </div>
              {/* 参考值 */}
              <div className={styles.itemList}>
                <div className={styles.leftWrap}>
                  <div>参考值</div>
                  <div>
                    <Form.Item rules={[{ required: true, message: '请选择参考值' }]}>
                      <Input value={`去年同期${referValue?.lastMonth || '无'}`} disabled style={{ width: 185 }} />
                      <Input value={`上月${referValue?.lastYear || '无'}`} disabled style={{ marginLeft: 10, width: 185 }} />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rightWrap}>默认以当前月份为基准，对比去年同期和上月的指标数值</div>
              </div>
            </div>
          </div>
          {eventModalVisble && (
            <SelectEventModal
              handleCancel={() => {
                setEventModalVisible(false)
              }}
              categoryRole={categoryRole}
              handleOk={(data: any) => {
                setEventModalVisible(false)
                setSelectedBigEvent(data)
                form.setFieldValue('content', data?.bigEvent)
                form.setFieldValue('index', data?.index)
              }}
              visible={eventModalVisble}
              customBigEvent={bigEvent?.region && data?.bigEvent }
            />
          )}
          {indexModalVisble && (
            <IndexSelectModal
              selectedBigEvent={selectedBigEvent}
              handleCancel={() => {
                setIndexModalVisble(false)
              }}
              handleOk={val => {
                form.setFieldValue('index', val)
                setIndexModalVisble(false)
              }}
              visible={indexModalVisble}
            />
          )}
        </Form>
      </div>
      <div className={styles.optBtns}>
        <Button
          style={{ marginRight: 16 }}
          onClick={() => {
            router.push('/bigEventManage/bigEventList')
          }}
        >
          返回列表
        </Button>
        <Button
          style={{ marginRight: 16 }}
          onClick={() => {
            handleSubmit(0)
          }}
        >
          保存草稿
        </Button>
        <Button
          type="primary"
          onClick={() => {
            handleSubmit(1)
          }}
          className={styles.submit}
        >
          提交
        </Button>
      </div>
    </>
  )
}
export default BigEventAdd
