import type { MenuData } from 'component/App/Menu/type'

// /iframe/channelAnalysis -> channelAnalysis
const getSplitUri = (uri: string | undefined) => {
  if (!uri) return ''
  const uris = uri?.split('/')
  const splitUri = uris[uris.length - 1] || uri
  return splitUri
}

/**
 *
 * @param menus 菜单
 * @param selected
 * @returns 有权限的菜单集合
 */
export const getAuthUrlByMenu = (menus: any) => {
  const uriList: string[] = []
  menus.forEach((item: MenuData) => {
    if (item?.uri) {
      const uri = getSplitUri(item?.uri)
      uriList.push(uri)
    }

    if (item.children) {
      item.children.forEach((node: MenuData) => {
        if (node?.uri) {
          const uri = getSplitUri(node?.uri)
          uriList.push(uri)
        }
        if (node.children) {
          node.children.forEach((leaf: MenuData) => {
            const uri = getSplitUri(leaf?.uri)
            uriList.push(uri)
          })
        }
      })
    }
  })
  return uriList
}
