import React, { useEffect, useState } from 'react';
import styles from './style.module.less';

const Title = ({ title }: any) => {
  if(type === 'sub') {
    return (
      <div className={styles.subContainer}>
        {title}
        <span className={styles.subExtra}>{extra}</span>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      {
        tag &&
        <span className={styles.tag}>{tag}</span>}
      {title}
      <span className={styles.extra}>{extra}</span>
    </div>
  )
}
export default Title;