export interface MenuData {
  linkType: number
  name: string
  code: string
  uri?: string | undefined
  url?: string | undefined
  isShow?: boolean
  show?: boolean
  children?: MenuData[]
  openKeys?: string
  icon: string
}

// export interface MenuToTopMenu {
//   menu: MenuData
//   top: MenuData
// }
