import axios from '../../../tool/http'

/**
 * 一级品类页面大接口
 * @param params 参数
 * @returns Promise
 */
export async function getSecondCategoryData(params: Record<string, any>) {
  return axios({
    url: `/prd/categoryanalysis/getSecondCategoryData`,
    method: 'get',
    params,
    errorTitle: '二级品类页面大接口',
  })
}

/**
 * 二级品类页面大事件汇总
 */
export async function getSecondClassEvent(params: Record<string, any>) {
  return axios({
    url: `/prd/categoryevent/getSecondClassEvent`,
    method: 'get',
    params,
    errorTitle: '二级品类页面大事件汇总',
  })
}

/**
 * 二级品类雷达图接口
 */
export async function getRadioMap(params: Record<string, any>) {
  return axios({
    url: `/prd/categoryevent/getRadioMap`,
    method: 'get',
    params,
    errorTitle: '二级品类雷达图接口',
  })
}

/**
 *获取品类概览
 */
export async function getSecondCategoryOverview(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getSecondCategoryOverview`,
    method: 'get',
    params,
    errorTitle: '获取品类概览',
  })
}

/**
 *获取利润拆分
 */
export async function getSecondProfitSplit(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getSecondProfitSplit`,
    method: 'get',
    params,
    errorTitle: '获取利润拆分',
  })
}

/**
 *获取GMV拆分
 */
export async function getSecondGMVSplit(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getSecondGMVSplit`,
    method: 'get',
    params,
    errorTitle: '获取GMV拆分',
  })
}

// /**
//  *获取边界线
//  */
// export async function getSecondBoundary(params: any) {
//   return axios({
//     url: `/prd/categoryanalysis/getSecondBoundary`,
//     method: 'get',
//     params,
//     errorTitle: '获取边界线&大事件',
//   })
// }

/**
 *获取趋势分析
 */
export async function getSecondTrend(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getSecondTrend`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}


/**
 * 获取二级部门追踪小结
 */
export async function getSecondTrace(params: any) {
  return axios({
    url: `/prd/department/getSecondTrace`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}

/**
 * 获取一级&二级部门大事件
 */
export async function getSecondBigEvent(params: any) {
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
export async function getSecondBoundary(params: any) {
  return axios({
    url: `/prd/department/getBoundary`,
    method: 'get',
    params,
    errorTitle: '获取边界线&大事件',
  })
}

