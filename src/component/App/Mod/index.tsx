import React from 'react'

interface Props {
  children: React.ReactNode
}

export const PageMod = (props: Props) => (
  <div className="page-mod">
    <div className="wrap-mod">{props.children}</div>
  </div>
)

export const WrapMod = (props: Props) => <div className="wrap-mod">{props.children}</div>

export const MainMod = (props: Props) => <div className="main-mod">{props.children}</div>
