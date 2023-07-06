import { computed, toJS } from 'mobx'
import { mobxSetter, setter } from 'mobx-value'
// import { enumMenu } from 'src/constants/menu'
import { AbnormalStatus } from 'src/component/Abnormal/index'
import { BASE_ROUTE } from 'src/config'
import { router } from 'src/router'

import type { MenuData } from './type'

export const menuList = mobxSetter({
  value: [] as MenuData[],
})

export const selectedKeys = mobxSetter({ value: [] as string[] })

export const getCurUri = (menus: any, selected: any) => {
  let cur: any = null
  const uri: string[] = []

  menus.forEach((item: MenuData) => {
    if (item.uri && item.uri !== '') {
      uri.push(item.uri)
    }
    if (item.uri === selected) {
      cur = item.openKeys
    }
    if (item.children) {
      item.children.forEach((node: MenuData) => {
        if (node.uri && node.uri !== '') {
          uri.push(node.uri)
        }
        if (node.uri && node.uri === selected) {
          cur = node.openKeys
        } else if (node.children) {
          node.children.forEach((leaf: MenuData) => {
            if (leaf.uri && leaf.uri !== '') {
              uri.push(leaf.uri)
            }
            if (leaf.uri && leaf.uri === selected) {
              cur = leaf.openKeys
            }
          })
        }
      })
    }
  })
  // console.log('getCurUri---', toJS(cur), toJS(uri), toJS(selected))

  if (uri.includes(selected)) {
    return {
      cur: cur ? cur.split('@') : [],
      uri,
    }
  }

  return {
    // 路由存在是异常页面 || 默认首页 || 路由不存在
    cur:
      AbnormalStatus.includes(selected.split('/')[1]) ||
      selected === '/' ||
      (cur === null && uri.length > 0 && !uri.includes(selected))
        ? ['/']
        : [],
    uri,
  }
}

/** 动态计算获取当前选中菜单的上级菜单 */
export const computedOpenKeys = computed(() => {
  const menus = menuList.value
  const selected: any = selectedKeys.value
  const defaultOpen: string[] = []

  if (Object.prototype.toString.call(selected) === '[object String]') {
    return getCurUri(menus, selected).cur
  }

  if (Object.prototype.toString.call(selected) === '[object Array]' && selected.length > 0) {
    return getCurUri(menus, selected[0]).cur
  }

  return defaultOpen
})

/**
 * 系统菜单-后台获取
 * 获取菜单已经是权限解析过的，直接展示即可
 * @param list
 */
export function setMenuList(list: MenuData[]) {
  if (list && list.length > 0) {
    const menus: MenuData[] = list.map((item: MenuData) => {
      // item.isShow = true
      item.openKeys = item.code
      if (item.children) {
        item.children = item.children.map((node: MenuData) => {
          // node.isShow = true
          node.openKeys = `${item.code}@${node.code}`
          if (node.children) {
            node.children = node.children.map((leaf: MenuData) => {
              // leaf.isShow = true
              leaf.openKeys = `${item.code}@${node.code}@${leaf.code}`
              return leaf
            })
          }
          return node
        })
      }
      return item
    })
    menuList.set(menus)
  } else {
    menuList.set([])
  }
}

/**
 * 获取有权限的第一个子级菜单
 * 权限限制待开发
 */
export const firstMenuUri = setter({
  value: ``,
})

export const getAuthFirstMenu = () => {
  let firstMenu = ''
  // 是否url跳转，如果/financialreport，firstMenu=/financialreport
  if (router.location.pathname && router.location.pathname !== '/') {
    firstMenu = router.location.pathname
    firstMenuUri.set(firstMenu)
  } else {
    const menus = menuList.value
    const menuItem = menus?.[0] || []
    if (menuItem.children) {
      const menuNode = menuItem?.children?.[0] || []
      if (menuNode.children) {
        const menuLeaf = menuNode?.children?.[0] || []
        firstMenu = menuLeaf?.uri || ''
      } else {
        firstMenu = menuNode?.uri || ''
      }
    } else {
      firstMenu = menuItem?.uri || ''
    }
  }
  firstMenuUri.set(firstMenu)
}
