import * as React from 'react'
import { router } from 'src/router'

const checkSamePathname = (e: React.MouseEvent) => {
  const href = (e.target as HTMLAnchorElement).getAttribute('href')
  const { location } = router
  if (href === location.pathname) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }
  return true
}

interface Props extends React.ComponentProps<'a'> {
  to: string
  children: React.ReactNode
}

/**
 * 替换pathname中的site部分
 * */
export const MenuLink: React.FC<Props> = props => {
  const { to, children, ...otherProps } = props
  const href = router.history.createHref({
    pathname: props.to,
  })
  return (
    <a href={href} {...otherProps} onClick={checkSamePathname}>
      {children}
    </a>
  )
}
