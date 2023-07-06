import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Spin, Tabs, TabsProps } from 'antd'
import CategorySearchForm from 'page/components/CategorySearchForm'
import {
  getBigEvent,
  getBoundary,
  getGMVSplit,
  getKPI,
  getProfitSplit,
  getTargetTrace,
  getTrace,
  getUser1Split,
  getUser2Split,
} from 'src/services/Dashboard/Supermarket'
import TrendAnalysis from 'page/components/TrendAnalysis'
import EmptyData from 'page/components/EmptyData'
import styles from './style.module.less'
import TrackingTable from 'page/components/TrackingTable'
import BigEventManage from 'page/components/BigEventManage'
import TargetTracking from 'page/components/TargetTracking'
import TargetSplit from 'page/components/TargetSplit'
import { getFirstBigEvent, getFirstTrace, getFristBoundary } from 'src/services/Dashboard/FirstDepartment'
import DashboardSearchForm from 'page/components/DashboardSearchForm'

const FirstClass = observer((props: any) => {
  const [maxData, setMaxData] = useState()
  const [formData, setFormData] = useState<any>({})
  const [spin, setSpin] = useState(false)

  const [qsData, setQsData] = useState<any>([]) // 业绩表现

  const [isEmpty, setIsEmpaty] = useState<boolean>(false)

  // 列表数据值
  const [profitSplitData, setProfitSplitData] = useState<any[]>([])
  const [traceData, setTraceData] = useState<any[]>([])
  const [bigEventData, setBigEventData] = useState<any[]>([])
  const [boundaryData, setBoundaryData] = useState<any[]>([])
  const [allTargetTraceData, setAllTargetTraceData] = useState<any[]>([])
  const [ziyingTargetTraceData, setZiyingTargetTraceData] = useState<any[]>([])
  const [popTargetTraceData, setPopTargetTraceData] = useState<any[]>([])
  const [gmvSplitData, setGmvSplitData] = useState<any[]>([])
  const [user1Data, setUser1Data] = useState<any[]>([])
  const [user2Data, setUser2Data] = useState<any[]>([])

  //获取追踪小结
  const queryTraceData = async (param: any) => {
    const res = await getFirstTrace(param)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setTraceData(res.data.data)
    }
  }

  // 获取大事件
  const queryBigEvent = async (param: any) => {
    const res = await getFirstBigEvent(param)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setBigEventData(res.data.data)
    }
  }

  // 获取边界线
  const queryBoundary = async (param: any) => {
    const res = await getFristBoundary(param)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setBoundaryData(res.data.data)
    }
  }

  // 获取目标追踪全部
  const queryAllTraceDate = async (param: any) => {
    const res = await getTargetTrace({ ...param, mode: 'ALL' })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setPopTargetTraceData(res.data.data?.targetTraceData || [])
    }
  }

  // 获取目标追踪自营
  const queryZiyingTargetTrace = async (param: any) => {
    const res = await getTargetTrace({ ...param, mode: '自营' })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setPopTargetTraceData(res.data.data?.targetTraceData || [])
    }
  }

  // 获取目标追踪POP
  const queryPopTargetTrace = async (param: any) => {
    const res = await getTargetTrace({ ...param, mode: 'POP' })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setPopTargetTraceData(res.data.data?.targetTraceData || [])
    }
  }

  // 获取指标拆解--业绩维度
  const queryGMVSplit = async (param: any) => {
    const res = await getGMVSplit({ ...param, mode: 'POP' })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setGmvSplitData(res.data.data)
    }
  }

  // 获取利润拆分
  const queryProfitSplitData = async (param: any) => {
    const res = await getProfitSplit(param)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setProfitSplitData(res.data.data)
    }
  }

  // 指标拆解--用户维度1
  const queryUser1Data = async (param: any) => {
    const res = await getUser1Split(param)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setUser1Data(res.data.data)
    }
  }

  // 获取业绩表现接口
  const queryKPIData = async (param: any, indexType: any = 1) => {
    const res = await getKPI({ ...param, indexType })
    if (res && res.data && res.data.code === 200 && res.data.data) {
      const { gmvTrend, profitTrend, turnoverTrend, profitFrontTrend } = res.data.data
      if (profitTrend == null) {
        setQsData([
        { ...gmvTrend, title: 'GMV' },
        { ...profitFrontTrend, title: '前台毛利' },
        { ...turnoverTrend, title: '现金流天数' },
      ])
      } else {
         setQsData([
        { ...gmvTrend, title: 'GMV' },
        { ...profitTrend, title: '贡献利润' },
        { ...turnoverTrend, title: '现金流天数' },
      ])
      }
    }
  }

  // 指标拆解--用户维度2
  const queryUser2Data = async (param: any) => {
    const res = await getUser2Split(param)
    if (res && res.data && res.data.code === 200 && res.data.data) {
      setUser2Data(res.data.data)
      // setSpin(false)
      props?.emitSpin(false)
    }
  }

  const getAllData = async (param: any) => {
    if (param.firstCategoryName === '全部') {
      param.firstCategoryName = ''
    }
    // setSpin(true)
    props?.emitSpin(true)
    queryTraceData(param)
    queryKPIData(param)
    queryBigEvent(param)
    queryBoundary(param)
    queryAllTraceDate(param)
    queryZiyingTargetTrace(param)
    queryPopTargetTrace(param)
    queryGMVSplit(param)
    queryProfitSplitData(param)
    queryUser1Data(param)
    queryUser2Data(param)
  }

  const handleChange = (v: any) => {
    Object.keys(v).forEach(k => {
      if (v[k] === undefined) {
        delete v[k]
      }
    })
    getAllData(v)
    setFormData(v)
  }

  useEffect(() => {
    if (props.searchParams) {
      handleChange(props.searchParams)
    }
    console.log('searchParams:::', props.searchParams)
  }, [props.searchParams])

  useEffect(() => {
    document.title = '品类仪表盘'
  }, [])

  const items: TabsProps['items'] = [
    {
      key: '大事件管理',
      label: `大事件管理`,
      children: <BigEventManage formData={formData} bigEventData={bigEventData} boundaryData={boundaryData} level={1} />,
    },
    {
      key: '目标追踪',
      label: `目标追踪`,
      children: (
        <TargetTracking
          popTargetTraceData={popTargetTraceData}
          ziyingTargetTraceData={ziyingTargetTraceData}
          allTargetTraceData={allTargetTraceData}
        />
      ),
    },
    {
      key: '目标拆解',
      label: `目标拆解`,
      children: (
        <TargetSplit
          user1Data={user1Data}
          user2Data={user2Data}
          gmvSplitData={gmvSplitData}
          profitSplitData={profitSplitData}
        />
      ),
    },
  ]

  return (
    <>
      <div className="content">
        {!isEmpty ? (
          <>
            <div className={styles.topWrap}>
              <div>{Boolean(qsData?.length) && <TrendAnalysis formData={formData} trendData={qsData} tabKey={1} />}</div>
              <div>
                <TrackingTable formData={formData} list={traceData} level={1} />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Tabs type="card" items={items} />
            </div>
          </>
        ) : (
          <EmptyData />
        )}
      </div>
    </>
  )
})

export { FirstClass as default }
