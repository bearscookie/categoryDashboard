/** *处理大事件进度异常BigBoss数 */
import React from 'react'
import styles from './style.module.less'
const BigBossAbnormal = ({ text }) => {
  
  if (!text) {
    return  <p className={text == null || text == '正常' ? styles.normal : styles.abnormality}>
      <b />
      <span>正常</span>
      </p>
  }
  const list = text.split(',').map(item => <span>{item}</span>)
  return (<p className={text == null || text == '正常' ? styles.normal : styles.abnormality}>
      <b />
    <span className={styles.abList}>{ list}</span>
      </p>)
}
export default BigBossAbnormal