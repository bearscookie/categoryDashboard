/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { Modal } from 'antd'

import descIcon from '../../assets/images/categroy-icon/gailan.png'

import styles from './style.module.less'

const Desc = () => {
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false)
    }, 3000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const descList = [
    {
      key: 'GMV：',
      value:
        '财务口径GMV，商品与服务销售金额，扣减各项基础优惠、优惠券及逆向退货拒收。自营非厂直按出库时间统计，厂直按发货时间统计',
    },
    {
      key: '贡献利润：',
      value:
        '不含税可控综合毛利-可控总费用-预付资金成本+营业外收入支出汇总+投资收益日维度数据，次月20号更新上个月的财报含利润数据',
    },
    {
      key: '现金流天数：',
      value: `<span>
          现金流天数=应付库存周转天数-财务库存周转天数；</br>
          应付周转天数=（日均应付金额*本月天数）/应付成本（仓报价成本）</br>
          财务库存周转天数=财务库存金额/库存成本</br>
        </span>`,
    },
    {
      key: 'UV：',
      value: '访问商品详情页的独立用户数，设备号去重，月维度UV为按天加和计算',
    },
    {
      key: '转化率：',
      value: '成交子订单数／商品详情页面访问UV',
    },
    {
      key: '客单价：',
      value: '成交金额／成交子订单数',
    },
    {
      key: '新客GMV占比：',
      value: '大商超新客GMV／GMV总额,新客首单GMV，月维度时取首单订单的GMV加和',
    },
    {
      key: '老客GMV占比：',
      value: '大商超老客GMV／GMV总额',
    },
    {
      key: 'Top5品牌占比：',
      value: '某一品类层级下，Top5品牌的GMV占比',
    },
    {
      key: '连带件数：',
      value:
        '品类订单连带商品件数：在统计周期内该品类的成交父订单中，平均包含的其他品类的商品件数。 = （含该品类的成交父订单的所有品类商品件数总和 - 成交父订单中该品类的商品件数总和）/含该品类的成交父订单数',
    },
    {
      key: 'To3连带品类：',
      value:
        '品类订单连带TOP X品类（BY 成交金额）：在统计周期内该品类的成交父订单中，包含的同级其他品类的成交金额排名TOP X的品类',
    },
    {
      key: '连带新客30天GMV：',
      value:
        '品类新客CLV：在统计周期内的商超新客，首单含该品类的新客在后续30天的其他品类的单均成交金额。 = 首单含该品类的新客在后续30天内的其他品类的成交金额总和/首单含该品类的商超新客数',
    },
    {
      key: '极度忠诚用户GMV占比：',
      value: '近一年每个月都来购买的用户，且近一年商超消费金额超过2000元',
    },
    {
      key: '核心用户GMV占比：',
      value: '近一年消费金额2000以上',
    },
    {
      key: '成长用户GMV占比：',
      value: '近60天累计消费频次1-3天，且近一年消费金额2000以下',
    },
    {
      key: '衰退用户GMV占比：',
      value: '近60天没有购买过，但270天内有购买过，且近一年消费金额2000以下',
    },
    {
      key: '潜在广义新用户GMV占比：',
      value: '商超历史未购用户和近270天未购用户',
    },
    {
      key: '前台毛利',
      value: `前台毛利(毛利润）=销售总额-进货金额；<br/>
        净利润＝毛利润+其他收入-其他成本`,
    },
    {
      key: '后台毛利',
      value: `供应商返利金额总和`,
    },
    {
      key: '广告费',
      value: `广告毛利`,
    },
    {
      key: '自营存货损失',
      value: `自营模式下存货损失总额`,
    },
    {
      key: '其他毛利',
      value: `如支付宝、微信等付款时的交易手续费`,
    },
    {
      key: '仓配费用',
      value: `细化到品类的仓配费用总额，用以分析净利润情况`,
    },
    {
      key: '其他成本费用',
      value: `客服咨询产生的客服成本费用`,
    },
    {
      key: '在线SKU数',
      value: `在线SKU数取月末最后一天在线或者统计日期在线`,
    },
  ]

  return (
    <>
      <img className={styles.descIcon} src={descIcon} onClick={showModal} alt="" />
      <Modal open={open} title="指标说明" width={900} centered onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className={styles.descList}>
          {descList?.map(ele => (
            <div className={styles.item}>
              <div>{ele.key}</div>
              <div dangerouslySetInnerHTML={{ __html: ele.value }} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Desc
