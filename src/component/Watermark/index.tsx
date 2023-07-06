import * as React from 'react'

import s from './style.module.less'

interface IProps {
  text: string
}

export const Watermark: React.FC<IProps> = ({ text }) => {
  // const [base64, setBase64] = React.useState('')

  const base64 = React.useMemo(() => {
    const canvas = document.createElement('canvas')
    const size = 200
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext('2d')!
    ctx.font = '18px serif'
    ctx.fillStyle = 'rgba(51,51,51,0.15)'
    ctx.translate(size / 1, size / 4)
    ctx.rotate((30 * Math.PI) / 180)
    ctx.fillText(text, (size / 2) * -1, size / 4)

    return canvas.toDataURL()
  }, [text])

  const style = {
    backgroundImage: `url(${base64})`,
  }

  return <div className={s.box} style={style} />
}

export default Watermark
