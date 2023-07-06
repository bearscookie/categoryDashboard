import axios from '../../tool/http'

/**
 * 获取大事件列表
 */
export async function getBigEventsList(params: any) {
  return axios({
    url: `/prd/bigevent/getBigEvents`,
    method: 'get',
    params,
    errorTitle: '获取大事件列表',
  })
}

/**
 * 新增大事件
 */
export async function addBigEvent(params: any) {
  return axios({
    url: `/prd/bigevent/addBigEvent`,
    method: 'post',
    data: params,
    errorTitle: '新增大事件',
  })
}

/**
 *更新大事件
 * @param params
 * @returns
 */
export async function updateBigEvent(params: any) {
  return axios({
    url: `/prd/bigevent/updateBigEvent`,
    method: 'post',
    data: params,
    errorTitle: '获取边界线&大事件',
  })
}

/**
 * 获取大事件批注
 */
export async function getBigEventComment(params: any) {
  return axios({
    url: `/prd/bigevent/getBigEventComment`,
    method: 'get',
    params,
    errorTitle: '获取大事件批注',
  })
}

/**
 * 删除大事件
 */
export async function deleteBigEvent(params: any) {
  return axios({
    url: `/prd/bigevent/deleteBigEvent`,
    method: 'delete',
    params,
    errorTitle: '删除大事件',
  })
}

/**
 * 获取事件统计
 */
export async function getBigEventStatusNum(params: any) {
  return axios({
    url: `/prd/bigevent/getBigEventStatusNum`,
    method: 'get',
    params,
    errorTitle: '获取事件统计',
  })
}

/**
 * 更新大事件进展
 */
export async function updateBigEventProgress(params: any) {
  return axios({
    url: `/prd/bigevent/updateBigEventProgress`,
    method: 'post',
    data: params,
    errorTitle: '获取大事件批注',
  })
}

/**
 * 更新大事件批注
 */
export async function addBigEventComment(params: any) {
  return axios({
    url: `/prd/bigevent/addBigEventComment`,
    method: 'post',
    data: params,
    errorTitle: '获取大事件批注',
  })
}

/**
 * 根据部门获取二级品类
 */
export async function getSecondCategory(params: any) {
  return axios({
    url: `/prd/department/getSecondCategory`,
    method: 'get',
    params,
    errorTitle: '获取部门',
  })
}

/**
 * 新增大事件--获取大事件
 */
export async function getBigEventForAdd() {
  return axios({
    url: `/prd/bigevent/getBigEventForAdd`,
    method: 'get',
    params: {},
    errorTitle: '获取部门',
  })
}

/**
 * 获取大事件更新记录
 */
export async function getBigEventLog(params: any) {
  return axios({
    url: `/prd/bigevent/getBigEventLog`,
    method: 'get',
    params,
    errorTitle: '获取部门',
  })
}

/**
 *根据bigBoss查询新增草稿
 */
export async function getDraftByBigBoss(params: any) {
  return axios({
    url: `/prd/bigevent/getDraftByBigBoss`,
    method: 'get',
    params,
    errorTitle: '获取部门',
  })
}

/**
 * 获取参考值
 */
export async function getReferValue(params: any) {
  return axios({
    url: `/prd/bigevent/getReferValue`,
    method: 'get',
    params,
    errorTitle: '获取部门',
  })
}
