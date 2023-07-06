import axios from '../../../tool/http'

/**
 * 一级品类页面大接口
 * @param params 参数
 * @returns Promise
 */
export async function getFirstCategoryData(params: Record<string, any>) {
  return axios({
    url: `/prd/categoryanalysis/getFirstCategoryData`,
    method: 'get',
    params,
    errorTitle: '一级品类页面大接口',
  })
}

/**
 * 一级品类页面大事件汇总
 */
export async function getFirstClassEvent(params: Record<string, any>) {
  return axios({
    url: `/prd/categoryevent/getFirstClassEvent`,
    method: 'get',
    params,
    errorTitle: '一级品类页面大事件汇总',
  })
}

/**
 *获取品类概览
 */
export async function getFirstCategoryOverview(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getFirstCategoryOverview`,
    method: 'get',
    params,
    errorTitle: '获取品类概览',
  })
}

/**
 *获取利润拆分
 */
export async function getFirstProfitSplit(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getFirstProfitSplit`,
    method: 'get',
    params,
    errorTitle: '获取利润拆分',
  })
}

/**
 *获取GMV拆分
 */
export async function getFirstGMVSplit(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getFirstGMVSplit`,
    method: 'get',
    params,
    errorTitle: '获取GMV拆分',
  })
}

/**
 *获取边界线
 */
export async function getFirstBoundary(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getFirstBoundary`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}

/**
 *获取大事件
 */
export async function getFirstEvent(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getFirstEvent`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}

/**
 *获取趋势分析
 */
export async function getFirstTrend(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getFirstTrend`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}


/**
 * 获取一级部门追踪小结
 */
export async function getFirstTrace(params: any) {
  return axios({
    url: `/prd/department/getFirstTrace`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}

/**
 * 获取一级&二级部门大事件

 */
 export async function getFirstBigEvent(params: any) {
  return axios({
    url: `/prd/department/getBigEvent`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}

/**
 * 获取一级&二级部门大事件
 */
export async function getFristBoundary(params: any) {
  return axios({
    url: `/prd/department/getBoundary`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}