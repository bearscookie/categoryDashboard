/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Table, Tooltip } from 'antd'
import { CategoryItemType, NewItemType } from 'src/const'
// import { percentFormat } from 'tool/format'
import { router } from 'src/router'
import {
  fixedFormats,
  fixedThousandToFormats,
  millionThousandToFormats,
  percentFormats,
  tenThousandToFormats,
} from 'tool/dataFomat'

import CategoryTableItem from '../CategoryTableItem'
import NewTableItem from '../NewTableItem'

import styles from './style.module.less'

const KPIHealthDiagnosisTable = (props: any) => {
  const { formData, level, hierarchy } = props
  const { list, maxData } = props

  const getLevel = () => {
    switch (props.level) {
      case 1:
        return '二级品类'
      case 2:
        return '三级品类'
      default:
        return '一级品类'
    }
  }

  const handleRouter = (record: any) => {
    if (record.categoryName === '汇总') {
      return
    }
    const searchParams = Object.fromEntries(new URL(decodeURIComponent(window.location.href)).searchParams)
    if (level === 0) {
      router.push(
        `/firstClass?dateType=${searchParams?.dateType}&dateValue=${searchParams?.dateValue}&mode=${searchParams?.mode}&firstCategoryId=${record?.categoryName}&secondCategoryId=全部&firstCategoryName=${record?.categoryName}`,
      )
    }
    if (level === 1) {
      router.push(
        `/reclassify?dateType=${searchParams?.dateType}&dateValue=${searchParams?.dateValue}&mode=${searchParams?.mode}&firstCategoryId=${searchParams?.firstCategoryId}&secondCategoryId=${record?.categoryName}&firstCategoryName=${searchParams?.firstCategoryName}&dateValues=1685548800000&secondCategoryName=${record?.categoryName}`,
      )
    }
  }

  // const percentFormatFilterValue = (value: any, unit = true) =>
  //   // 同比
  //   value !== null && value !== '0.00' ? percentFormat(Number(value), 2, unit) : '0.00%'

  const columns: any = [
    {
      title: getLevel(),
      dataIndex: 'categoryName',
      width: 200,
      key: 'categoryName',
      // fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer', width: 100, display: 'inline-block' }}
          onClick={() => {
            handleRouter(record)
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: '流量转化',
      children: [
        {
          title: 'UV（万）',
          dataIndex: 'gmvUV',
          key: 'gmvUV',
          sorter: (a: any, b: any) => a.gmvUV - b.gmvUV,
          width: 80,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                value={tenThousandToFormats(text)}
                percentage={percentFormats(text / maxData?.gmvUVMax)}
                record={record}
                nameFailed="UV"
                columnName="gmvUV"
                formData={formData}
                categoryLevel={hierarchy}
                // // unit="%"
                decimal={0}
                detailData={[
                  {
                    label: '一级品类',
                    value: record.categoryName,
                  },
                  {
                    label: 'UV(万)',
                    value: tenThousandToFormats(record.gmvUV),
                  },
                  {
                    label: '同比',
                    // value: record.gmvUVYOY ? `${percentFormat(record.gmvUVYOY, 2)}` : '0.00%',
                    value: percentFormats(record.gmvUVYOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvUVYOY',
          key: 'gmvUVYOY',
          width: 100,
          sorter: (a: any, b: any) => a.gmvUVYOY - b.gmvUVYOY,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '转化率',
          dataIndex: 'gmvConverRatio',
          key: 'gmvConverRatio',
          sorter: (a: any, b: any) => a.gmvConverRatio - b.gmvConverRatio,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={text ? percentFormatFilterValue(Number(text), false) : 0}
                // value={text ? percentFormatFilterValue(Number(text), false) : 0}
                // standardValue={
                //   maxData?.gmvConverRatioMax ? percentFormatFilterValue(maxData.gmvConverRatioMax, false) : 0
                // }
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvConverRatioMax)}
                record={record}
                nameFailed="转化率"
                columnName="gmvConverRatio"
                formData={formData}
                categoryLevel={hierarchy}
                // unit="%"
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '转化率',
                    value: percentFormats(record.gmvConverRatio, '%'),
                  },
                  {
                    label: '同比',
                    value: percentFormats(record.gmvConverRatioYOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvConverRatioYOY',
          key: 'gmvConverRatioYOY',
          sorter: (a: any, b: any) => a.gmvConverRatioYOY - b.gmvConverRatioYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '客单价',
          dataIndex: 'gmvGuestPrice',
          key: 'gmvGuestPrice',
          sorter: (a: any, b: any) => a.gmvGuestPrice - b.gmvGuestPrice,
          // width: 100,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={text ? decimalFormat(Number(text), 2, false) : '0.00'}
                // standardValue={maxData?.gmvGuestPriceMax ? decimalFormat(Number(maxData.gmvGuestPriceMax)) : 0}
                value={fixedThousandToFormats(text)}
                percentage={percentFormats(text / maxData?.gmvGuestPriceMax)}
                record={record}
                nameFailed="客单价"
                columnName="gmvGuestPrice"
                categoryLevel={hierarchy}
                // // unit="%"
                formData={formData}
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '客单价',
                    value: fixedThousandToFormats(record.gmvGuestPrice),
                  },
                  {
                    label: '同比',
                    // value: record.gmvConverRatioYOY ? percentFormatFilterValue(record.gmvGuestYOY) : '0.00%',
                    value: percentFormats(record.gmvGuestYOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuestYOY',
          key: 'gmvGuestYOY',
          sorter: (a: any, b: any) => a.gmvGuestPriceYoY - b.gmvGuestPriceYoY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
    {
      title: '新老客',
      children: [
        {
          title: '新客GMV占比',
          dataIndex: 'gmvNewGuestRatio',
          key: 'gmvNewGuestRatio',
          sorter: (a: any, b: any) => a.gmvNewGuestRatio - b.gmvNewGuestRatio,
          // width: 140,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={percentFormatFilterValue(Number(text), false)}
                // standardValue={percentFormatFilterValue(maxData?.gmvNewGuestMax, false)}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvNewGuestMax)}
                record={record}
                nameFailed="新客GMV占比"
                columnName="gmvNewGuestRatio"
                formData={formData}
                categoryLevel={hierarchy}
                unit="%"
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '新客GMV占比',
                    value: `${percentFormats(Number(record.gmvNewGuestRatio))}`,
                  },
                  {
                    label: '同比',
                    value: percentFormats(text, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvNewGuestYOY',
          key: 'gmvNewGuestYOY',
          sorter: (a: any, b: any) => a.gmvNewGuestYOY - b.gmvNewGuestYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '老客GMV占比',
          dataIndex: 'gmvOldGuestRatio',
          key: 'gmvOldGuestRatio',
          sorter: (a: any, b: any) => a.gmvOldGuestRatio - b.gmvOldGuestRatio,
          // width: 130,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={text ? percentFormatFilterValue(Number(text), false) : 0}
                // standardValue={maxData?.gmvOldGuestMax ? percentFormatFilterValue(maxData.gmvOldGuestMax, false) : 0}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvOldGuestMax)}
                record={record}
                nameFailed="老客GMV占比"
                columnName="gmvOldGuestRatio"
                formData={formData}
                categoryLevel={hierarchy}
                unit="%"
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '老客GMV占比',
                    // value: `${percentFormatFilterValue(Number(record.gmvOldGuestRatio))}`,
                    value: `${percentFormats(Number(record.gmvOldGuestRatio))}`,
                  },
                  {
                    label: '同比',
                    // value: record.gmvOldGuestYOY ? percentFormatFilterValue(record.gmvOldGuestYOY) : '0.00%',
                    value: percentFormats(text, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvOldGuestYOY',
          key: 'gmvOldGuestYOY',
          sorter: (a: any, b: any) => a.gmvOldGuestYOY - b.gmvOldGuestYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
    {
      title: '连带分析',
      children: [
        {
          title: '连带件数',
          dataIndex: 'gmvRelatedRatio',
          key: 'gmvRelatedRatio',
          sorter: (a: any, b: any) => a.gmvRelatedRatio - b.gmvRelatedRatio,
          // width: 140,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={Number(text)}
                // standardValue={Number(maxData?.gmvRelatedMax)}
                value={fixedFormats(text)}
                percentage={percentFormats(text / maxData?.gmvRelatedMax)}
                record={record}
                nameFailed="连带件数"
                columnName="gmvRelatedRatio"
                formData={formData}
                categoryLevel={hierarchy}
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '连带件数',
                    value: fixedFormats(text),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '连带新客30天GMV（百万）',
          dataIndex: 'gmvRelatedclv',
          key: 'gmvRelatedclv',
          sorter: (a: any, b: any) => a.gmvRelatedclv - b.gmvRelatedclv,
          // width: 130,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={text ? Number(formatMoneyByTenMillon(Number(text))) : 0}
                // standardValue={maxData?.gmvOldGuestMax ? formatMoneyByTenMillon(maxData.gmvRelatedClv, false) : 0}
                value={millionThousandToFormats(text)}
                percentage={percentFormats(text / maxData?.gmvRelatedClv)}
                record={record}
                nameFailed="连带新客30天GMV"
                columnName="gmvRelatedclv"
                formData={formData}
                categoryLevel={hierarchy}
                // unit="%"
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '连带新客30天GMV（百万）',
                    // value: `${formatByTrd(Number(formatMoneyByTenMillon(Number(record.gmvRelatedclv))))}`,
                    value: millionThousandToFormats(text),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: 'TOP3连带品类',
          dataIndex: 'gmvRelatedTop3',
          width: 100,
          key: 'gmvRelatedTop3',
          // fixed: 'left',
          render: (text: any) => (
            <Tooltip title={text}>
              <span className={styles.topName}>{text}</span>
            </Tooltip>
          ),
        },
      ],
    },

    {
      title: '客群',
      children: [
        {
          title: '极度忠诚度用户GMV占比',
          dataIndex: 'gmvTrueRatio',
          key: 'gmvTrueRatio',
          width: 200,
          sorter: (a: any, b: any) => a.gmvTrueRatio - b.gmvTrueRatio,
          // width: 210,
          render: (text: any, record: any) => (
            <div style={{ width: 140 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={percentFormatFilterValue(Number(text), false)}
                // standardValue={percentFormatFilterValue(maxData?.gmvTrueMax, false)}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvTrueMax)}
                record={record}
                nameFailed="忠诚度用户GMV占比"
                columnName="gmvTrueRatio"
                formData={formData}
                categoryLevel={hierarchy}
                unit="%"
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '忠诚度用户GMV占比',
                    value: percentFormats(text, '%'),
                  },
                  {
                    label: '同比',
                    // value: record.gmvTrueRatio ? percentFormatFilterValue(record.gmvTrueYOY) : '0.00%',
                    value: percentFormats(record.gmvTrueYOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvTrueYOY',
          key: 'gmvTrueYOY',
          sorter: (a: any, b: any) => a.gmvTrueYOY - b.gmvTrueYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '核心用户GMV占比',
          dataIndex: 'gmvCoreGuestRatio',
          key: 'gmvCoreGuestRatio',
          sorter: (a: any, b: any) => a.gmvCoreGuestRatio - b.gmvCoreGuestRatio,
          // width: 160,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={percentFormatFilterValue(Number(text), false)}
                // standardValue={percentFormatFilterValue(maxData?.gmvCoreGuestMax, false)}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvCoreGuestMax)}
                // unit="%"
                record={record}
                nameFailed="核心用户GMV占比"
                columnName="gmvCoreGuestRatio"
                formData={formData}
                categoryLevel={hierarchy}
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '核心用户GMV占比',
                    // value: `${percentFormatFilterValue(Number(record.gmvCoreGuestRatio))}`,
                    value: percentFormats(text, '%'),
                  },
                  {
                    label: '同比',
                    // value: record.gmvCoreGuestYOY ? percentFormatFilterValue(record.gmvCoreGuestYOY) : '0.00%',
                    value: percentFormats(record.gmvCoreGuestYOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvCoreGuestYOY',
          key: 'gmvCoreGuestYOY',
          sorter: (a: any, b: any) => a.gmvCoreGuestYOY - b.gmvCoreGuestYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '成长用户GMV占比',
          dataIndex: 'gmvGuest4Ratio',
          key: 'gmvGuest4Ratio',
          sorter: (a: any, b: any) => a.gmvGuest4Ratio - b.gmvGuest4Ratio,
          // width: 170,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={percentFormatFilterValue(Number(text), false)}
                // standardValue={percentFormatFilterValue(maxData?.gmvGuest4Max, false)}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvGuest4Max)}
                // unit="%"
                record={record}
                nameFailed="成长用户GMV占比"
                columnName="gmvGuest4Ratio"
                categoryLevel={hierarchy}
                formData={formData}
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '成长用户GMV占比',
                    value: percentFormats(text, '%'),
                    // value: `${percentFormatFilterValue(Number(record.gmvGuest4Ratio))}`,
                  },
                  {
                    label: '同比',
                    // value: record.gmvGuest4YOY ? percentFormatFilterValue(record.gmvGuest4YOY) : '0.00%',
                    value: percentFormats(record.gmvGuest4YOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuest4YOY',
          key: 'gmvGuest4YOY',
          width: 100,
          sorter: (a: any, b: any) => a.gmvGuest4YOY - b.gmvGuest4YOY,
          // width: 80,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '衰退用户GMV占比',
          dataIndex: 'gmvGuest5Ratio',
          key: 'gmvGuest5Ratio',
          sorter: (a: any, b: any) => a.gmvGuest5Ratio - b.gmvGuest5Ratio,
          // width: 170,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={percentFormatFilterValue(Number(text), false)}
                // standardValue={percentFormatFilterValue(maxData?.gmvGuest5Max, false)}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvGuest5Max)}
                record={record}
                nameFailed="衰退用户GMV占比"
                columnName="gmvGuest5Ratio"
                categoryLevel={hierarchy}
                unit="%"
                formData={formData}
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '衰退用户GMV占比',
                    // value: `${percentFormatFilterValue(Number(record.gmvGuest5Ratio))}`,
                    value: percentFormats(text, '%'),
                  },
                  {
                    label: '同比',
                    // value: record.gmvGuest5YOY ? percentFormatFilterValue(record.gmvGuest5YOY) : '0.00%',
                    value: percentFormats(record.gmvGuest5YOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuest5YOY',
          key: 'gmvGuest5YOY',
          width: 100,
          sorter: (a: any, b: any) => a.gmvGuest5YOY - b.gmvGuest5YOY,
          // width: 90,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={CategoryItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '潜在广义新用户GMV占比',
          dataIndex: 'gmvGuest6Ratio',
          key: 'gmvGuest6Ratio',
          sorter: (a: any, b: any) => a.gmvGuest6Ratio - b.gmvGuest6Ratio,
          width: 200,
          render: (text: any, record: any) => (
            <div style={{ width: 140 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={percentFormatFilterValue(Number(text), false)}
                // standardValue={percentFormatFilterValue(maxData?.gmvGuest6Max, false)}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvGuest6Max)}
                record={record}
                nameFailed="潜在广义新用户GMV占比"
                columnName="gmvGuest6Ratio"
                categoryLevel={hierarchy}
                formData={formData}
                // unit="%"
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: '广义新用户GMV占比',
                    // value: `${percentFormatFilterValue(Number(record.gmvGuest6Ratio))}`,
                    value: percentFormats(text, '%'),
                  },
                  {
                    label: '同比',
                    // value: record.gmvGuest6YOY ? percentFormatFilterValue(record.gmvGuest6YOY) : '0.00%',
                    value: percentFormats(record.gmvGuest6YOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuest6YOY',
          key: 'gmvGuest6YOY',
          width: 100,
          sorter: (a: any, b: any) => a.gmvGuest6YOY - b.gmvGuest6YOY,
          // width: 90,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              {/* <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text)} /> */}
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
    {
      title: '品牌集中度',
      children: [
        {
          title: 'TOP5品牌占比',
          dataIndex: 'gmvTop5BrandRatio',
          key: 'gmvTop5BrandRatio',
          sorter: (a: any, b: any) => a.gmvTop5BrandRatio - b.gmvTop5BrandRatio,
          // width: 140,
          render: (text: any, record: any) => (
            <div style={{ width: 130 }}>
              <NewTableItem
                type={NewItemType.process}
                // value={percentFormatFilterValue(Number(text), false)}
                // standardValue={percentFormatFilterValue(maxData?.gmvTop5BrandMax, false)}
                value={percentFormats(text, '%')}
                percentage={percentFormats(text / maxData?.gmvTop5BrandMax)}
                record={record}
                nameFailed="TOP5品牌占比"
                columnName="gmvTop5BrandRatio"
                formData={formData}
                categoryLevel={hierarchy}
                unit="%"
                detailData={[
                  {
                    label: getLevel(),
                    value: record.categoryName,
                  },
                  {
                    label: 'TOP5品牌占比',
                    // value: `${percentFormatFilterValue(Number(record.gmvTop5BrandRatio))}`,
                    value: percentFormats(text, '%'),
                  },
                  {
                    label: '同比',
                    // value: record.gmvTrueRatio ? percentFormatFilterValue(record.gmvTop5BrandYOY) : '0.00%',
                    value: percentFormats(record.gmvGuest6YOY, '%'),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvTop5BrandYOY',
          key: 'gmvTop5BrandYOY',
          width: 100,
          sorter: (a: any, b: any) => a.gmvTop5BrandYOY - b.gmvTop5BrandYOY,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              {/* <NewTableItem type={NewItemType.text} value={percentFormatFilterValue(text)} /> */}
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
  ]

  return <Table bordered scroll={{ x: 1800 }} dataSource={list} columns={columns} pagination={false} />
}
export default KPIHealthDiagnosisTable
