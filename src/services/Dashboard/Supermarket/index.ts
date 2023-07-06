import axios from '../../../tool/http'

/**
 *获取业绩表现接口
 */
export async function getKPI(params: any) {
  return axios({
    url: `/prd/dashboard/getKPI`,
    method: 'get',
    params,
    errorTitle: '获取业绩表现',
  })
}

/**
 *获取追踪小结
 */
export async function getTrace(params: any) {
  return axios({
    url: `/prd/dashboard/getTrace`,
    method: 'get',
    params,
    errorTitle: '追踪小结',
  })
}

/**
 *获取大事件
 */
export async function getBigEvent(params: any) {
  return axios({
    url: `/prd/dashboard/getBigEvent`,
    method: 'get',
    params,
    errorTitle: '大事件',
  })
}

/**
 * 获取边界线
 */
export async function getBoundary(params: any) {
  return axios({
    url: `/prd/dashboard/getBoundary`,
    method: 'get',
    params,
    errorTitle: '边界线',
  })
}

/**
 * 获取目标追踪
 */
export async function getTargetTrace(params: any) {
  return axios({
    url: `/prd/dashboard/getTargetTrace`,
    method: 'get',
    params,
    errorTitle: '目标追踪',
  })
}

/**
 * 获取业绩纬度
 */
export async function getGMVSplit(params: any) {
  return axios({
    url: `/prd/dashboard/getGMVSplit`,
    method: 'get',
    params,
    errorTitle: '业绩纬度',
  })
}

/**
 * 指标拆解--利润维度
 * @param params
 * @returns
 */
export async function getProfitSplit(params: any) {
  return axios({
    url: `/prd/dashboard/getProfitSplit`,
    method: 'get',
    params,
    errorTitle: '利润拆分',
  })
}

/**
 * 指标拆解--用户维度1
 */
export async function getUser1Split(params: any) {
  return axios({
    url: `/prd/dashboard/getUser1Split`,
    method: 'get',
    params,
    errorTitle: '利润拆分',
  })
}

/**
 * 指标拆解--用户维度2
 */
export async function getUser2Split(params: any) {
  return axios({
    url: `/prd/dashboard/getUser2Split`,
    method: 'get',
    params,
    errorTitle: '利润拆分',
  })
}

/**
 * 获取业绩表现的趋势分析
 */
export async function getKPITrend(params: any) {
  return axios({
    url: `/prd/dashboard/getKPITrend`,
    method: 'get',
    params,
    errorTitle: '趋势分析',
  })
}

/**
 * 边界线详情
 */
export async function getBoundaryDetail(params: any) {
  return axios({
    url: `/prd/dashboard/getBoundaryDetail`,
    method: 'get',
    params,
    errorTitle: '获取大事件批注',
  })
}


/**
 * 获取目标追踪
 */
export async function getBigEventDetail(params: any) {
  return axios({
    url: `/prd/dashboard/getBigEventDetail`,
    method: 'get',
    params,
    errorTitle: '获取大事件批注',
  })
}
