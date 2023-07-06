/** *处理大事件进度异常BigBoss数 */
import React from 'react'
import styles from './style.module.less'
const FirstCategoryColumn = ({ text }) => {
  if (text !== '' && text !== null) {
    return text.split(',').map(item => <span className={styles.categoryTab}>{item}</span>)
  }
  return <span></span>
}
export default FirstCategoryColumn