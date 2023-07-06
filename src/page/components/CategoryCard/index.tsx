import React, { useEffect, useState } from 'react'
import { progressType } from 'src/const'

import BoundaryLineCard from '../BoundaryLineCard'
import EventCard from '../EventCard'

import styles from './style.module.less'

const CategoryCard = ({
  bigEventHighRiskNum,
  bigEventLowRiskNum,
  bigEventNormalNum,
  categoryId,
  categoryName,
  headNum,
  priceIndexNum,
  secondCategoryNum = 0,
  selfownNum,
  skuNum,
  ClickTag,
  formData
}: any) => {
  const clickTagGetValue = value => {
    ClickTag(value, categoryName, categoryId)
  }
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{categoryName}</div>
        <div className={styles.extra}>
          二级品类个数
          <span className={styles.span}>{secondCategoryNum || 0}</span>
        </div>
      </div>
      {/* <div className={styles.container}>
      <div className={styles.h1}>
        边界线
        <b />
      </div>
      <div className={styles.flex}>
        <BoundaryLineCard title="最小SKU数不达标" value={skuNum || 0} />
        <BoundaryLineCard title="自营比例不达标" value={selfownNum} />
        <BoundaryLineCard title="头部集中度不达标" value={headNum || 0} />
        <BoundaryLineCard title="价格指数不达标" value={priceIndexNum} />
      </div> */}
      <div className={styles.container}>
        <div className={styles.h1}>边界线
          {
            (skuNum !== null || selfownNum !== null || headNum !== null || priceIndexNum !== null) &&
            <span className={styles.bjIcon}></span>
          }
         </div>
        <div className={styles.flex}>
          <BoundaryLineCard
            title="最小SKU数不达标"
            categoryName={categoryName}
            categoryId={categoryId}
            columnName="skuNum"
            value={skuNum || 0}
            formData={formData}
          />
          {/* <BoundaryLineCard
            title="自营比例不达标"
            categoryName={categoryName}
            categoryId={categoryId}
            columnName="selfownNum"
            value={selfownNum}
            formData={formData}
          /> */}
          {/* <BoundaryLineCard
            title="头部集中度不达标"
            categoryName={categoryName}
            categoryId={categoryId}
            columnName="headNum"
            value={headNum || 0}
            formData={formData}
          /> */}
          <BoundaryLineCard
            title="价格指数不达标"
            categoryName={categoryName}
            categoryId={categoryId}
            columnName="priceIndexNum"
            value={priceIndexNum}
            formData={formData}
          />
        </div>
        <div className={styles.h1}>大事件</div>
        <div className={styles.flex}>
          <EventCard clickTagFirst={clickTagGetValue} type={progressType.noraml} value={bigEventNormalNum} />
          <EventCard clickTagFirst={clickTagGetValue} type={progressType.lowRisk} value={bigEventLowRiskNum} />
          <EventCard clickTagFirst={clickTagGetValue} type={progressType.highRisk} value={bigEventHighRiskNum} />
        </div>
      </div>
    </div>
    // </div>
  )
}
export default CategoryCard
