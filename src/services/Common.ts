/**
 * @description 通用请求
 */
import axios from '../tool/http'

/**
 * 获取用户信息
 * @returns Promise
 */
export async function getUserAuth() {
  return axios({
    url: `/api/common/getUserAuth`,
    method: 'get',
    errorTitle: '获取用户信息',
  })
}

export async function getCategories(params: any) {
  return axios({
    url: `/prd/basic/getcategories`,
    method: 'get',
    params,
    errorTitle: '获取数据',
  })
}

/**
 * 获取列表中最大对比值
 */
export async function getAnalysisMaxValue(params: any) {
  return axios({
    url: `/prd/categoryanalysis/getAnalysisMaxValue`,
    method: 'get',
    params,
    errorTitle: '获取列表中最大对比值',
  })
}

/**
 * 品类概览--获取品类角色
 */
export async function getCategoryRole(params: any) {
  return axios({
    url: `/prd/basic/getCategoryRole`,
    method: 'get',
    params,
    errorTitle: '获取品类角色',
  })
}

/**
 * 查询--获取部门
 */
export async function getdepartment(params: any) {
  return axios({
    url: `/prd/basic/getdepartment`,
    method: 'get',
    params,
    errorTitle: '获取部门',
  })
}
