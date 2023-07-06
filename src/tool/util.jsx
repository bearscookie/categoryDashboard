/** *处理大事件进度异常BigBoss数 */
import React from 'react'

export default bigBossAbnormal = text => {
  if (!text) {
    return <span>正常</span>
  }
  const list = text.split(',').map(item => <span>{item}</span>)
  return list
}
