/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Table } from 'antd'
import { CategoryItemType, NewItemType } from 'src/const'
import { formatMoneyBymillion, formatMoneyByTrdDecimal, percentFormat } from 'tool/format'
import { router } from 'src/router'

import CategoryTableItem from '../CategoryTableItem'
import NewTableItem from '../NewTableItem'
import { percentFormats, tenThousandFormats, tenThousandToFormats } from 'tool/dataFomat'

const ProfitSplittingTable = (props: any) => {
  const { list, maxData, level, formData, hierarchy } = props
  const getLevel = () => {
    switch (level) {
      case 1:
        return '二级品类'
        break
      case 2:
        return '三级品类'
        break
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

  const percentFormatFilterValue = (value: any, unit = true) =>
    // 同比
    value ? percentFormat(Number(value), 2, unit) : '0.00%'

  const columns: any = [
    {
      title: getLevel(),
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
      fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer' }}
          onClick={() => {
            handleRouter(record)
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: '前台毛利（万元）',
      dataIndex: 'profitSalesProceeds',
      key: 'profitSalesProceeds',
      sorter: (a: any, b: any) => a.profitSalesProceeds - b.profitSalesProceeds,
      width: 200,
      render: (text: any, record: any) => (
        <div style={{ width: 130 }}>
          <NewTableItem
            type={NewItemType.process}
            // value={Number(formatMoneyBymillion(Number(text)))}
            // standardValue={Number(formatMoneyBymillion(Number(maxData?.profitSalesProceedsMax)))}
            value={tenThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.profitSalesProceedsMax)}
            record={record}
            formData={formData}
            nameFailed="前台毛利"
            columnName="profitSalesProceeds"
            categoryLevel={hierarchy}
            detailData={[
              {
                label: getLevel(),
                value: record.categoryName,
              },
              {
                label: '前台毛利（万元）',
                value: tenThousandToFormats(text),
                // value: formatMoneyByTrdDecimal(Number(formatMoneyBymillion(record.profitSalesProceeds))),
              },
              {
                label: '同比',
                // value: percentFormatFilterValue(record.profitSalesProceedsYOY),
                value: percentFormats(record.profitSalesProceedsYOY, '%'),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '同比',
      dataIndex: 'profitSalesProceedsYOY',
      key: 'profitSalesProceedsYOY',
      sorter: (a: any, b: any) => a.profitSalesProceedsYOY - b.profitSalesProceedsYOY,
      width: 100,
      render: (text: any) => (
        <div style={{ width: 60 }}>
          {/* <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text)} /> */}
          <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
        </div>
      ),
    },
    {
      title: '后台毛利（万元）',
      dataIndex: 'profitProductCost',
      key: 'profitProductCost',
      sorter: (a: any, b: any) => a.profitProductCost - b.profitProductCost,
      width: 200,
      render: (text: any, record: any) => (
        <div style={{ width: 130 }}>
          <NewTableItem
            type={NewItemType.process}
            // value={Number(formatMoneyBymillion(Number(text)))}
            // standardValue={maxData?.profitProductCostMax}
            // standardValue={Number(formatMoneyBymillion(Number(maxData?.profitProductCostMax)))}
            value={tenThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.profitProductCostMax)}
            record={record}
            formData={formData}
            nameFailed="后台毛利"
            columnName="profitProductCost"
            categoryLevel={hierarchy}
            detailData={[
              {
                label: getLevel(),
                value: record.categoryName,
              },
              {
                label: '后台毛利(万元)',
                value: tenThousandToFormats(text),
                // value: formatMoneyByTrdDecimal(Number(formatMoneyBymillion(record.profitProductCost))),
              },
              {
                label: '同比',
                // value: percentFormatFilterValue(record.profitProductCostYOY),
                value: percentFormats(record.profitProductCostYOY, '%'),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '同比',
      dataIndex: 'profitProductCostYOY',
      key: 'profitProductCostYOY',
      sorter: (a: any, b: any) => a.profitProductCostYOY - b.profitProductCostYOY,
      width: 100,
      render: (text: any) => (
        <div style={{ width: 60 }}>
          {/* <NewTableItem type={NewItemType.text} value={percentFormatFilterValue(text)} /> */}
          <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
        </div>
      ),
    },
    {
      title: '广告费（万元）',
      dataIndex: 'profitADProceeds',
      key: 'profitADProceeds',
      sorter: (a: any, b: any) => a.profitADProceeds - b.profitADProceeds,
      width: 200,
      render: (text: any, record: any) => (
        <div style={{ width: 130 }}>
          <NewTableItem
            type={NewItemType.process}
            // value={Number(formatMoneyBymillion(Number(text)))}
            // standardValue={Number(formatMoneyBymillion(Number(maxData?.profitADProceedsMax)))}
            value={tenThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.profitADProceedsMax)}
            record={record}
            nameFailed="广告费"
            formData={formData}
            columnName="profitADProceeds"
            categoryLevel={hierarchy}
            // unit="%"
            detailData={[
              {
                label: getLevel(),
                value: record.categoryName,
              },
              {
                label: '广告费（万元）',
                value: tenThousandToFormats(text),
                // value: formatMoneyByTenMillon(record.profitADProceeds),
                // value: formatMoneyByTrdDecimal(Number(formatMoneyBymillion(record.profitADProceeds))),
              },
              {
                label: '同比',
                // value: percentFormatFilterValue(record.profitProductCostYOY),
                value: percentFormats(record.profitADProceedsYOY, '%'),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '同比',
      dataIndex: 'profitADProceedsYOY',
      key: 'profitADProceedsYOY',
      sorter: (a: any, b: any) => a.profitADProceedsYOY - b.profitADProceedsYOY,
      width: 100,
      render: (text: any) => (
        <div style={{ width: 60 }}>
          {/* <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text)} /> */}
          <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
        </div>
      ),
    },
    {
      title: '自营存货损失（万元）',
      dataIndex: 'profitSelfownLost',
      key: 'profitSelfownLost',
      sorter: (a: any, b: any) => a.profitSelfownLost - b.profitSelfownLost,
      width: 230,
      render: (text: any, record: any) => (
        <div style={{ width: 130 }}>
          <NewTableItem
            type={NewItemType.process}
            // value={Number(formatMoneyBymillion(Number(text)))}
            // standardValue={Number(formatMoneyBymillion(Number(maxData?.profitOtherCostMax)))}
            value={tenThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.profitOtherCostMax)}
            record={record}
            formData={formData}
            nameFailed="自营存货损失"
            columnName="profitSelfownLost"
            categoryLevel={hierarchy}
            // unit="%"
            detailData={[
              {
                label: getLevel(),
                value: record.categoryName,
              },
              {
                label: '自营存货损失（万元）',
                value: tenThousandToFormats(text),
                // value: formatMoneyByTrdDecimal(Number(formatMoneyBymillion(record.profitSelfownLost))),
              },
              {
                label: '同比',
                value: percentFormats(record.profitSelfownLostYOY, '%'),
                // value: percentFormatFilterValue(record.profitSelfownLostYOY),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '同比',
      dataIndex: 'profitSelfownLostYOY',
      key: 'profitSelfownLostYOY',
      sorter: (a: any, b: any) => a.profitSelfownLostYOY - b.profitSelfownLostYOY,
      width: 100,
      render: (text: any) => (
        <div style={{ width: 60 }}>
          {/* <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text)} /> */}
          <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
        </div>
      ),
    },

    {
      title: '其他毛利（万元）',
      dataIndex: 'profitProviderRebate',
      key: 'profitProviderRebate',
      sorter: (a: any, b: any) => a.profitProviderRebate - b.profitProviderRebate,
      width: 200,
      render: (text: any, record: any) => (
        <div style={{ width: 130 }}>
          <NewTableItem
            type={NewItemType.process}
            // value={Number(formatMoneyBymillion(Number(text)))}
            // standardValue={Number(formatMoneyBymillion(Number(maxData?.profitProviderRebateMax)))}
            value={tenThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.profitProviderRebateMax)}
            record={record}
            nameFailed="其他毛利"
            formData={formData}
            columnName="profitProviderRebate"
            categoryLevel={hierarchy}
            detailData={[
              {
                label: getLevel(),
                value: record.categoryName,
              },
              {
                label: '其他毛利（万元）',
                value: tenThousandToFormats(text),
                // value: formatMoneyByTrdDecimal(Number(formatMoneyBymillion(record.profitProviderRebate))),
              },
              {
                label: '同比',
                value: percentFormats(record.profitProviderRebateYOY, '%'),
                // value: percentFormatFilterValue(record.profitProviderRebateYOY),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '同比',
      dataIndex: 'profitProviderRebateYOY',
      key: 'profitProviderRebateYOY',
      sorter: (a: any, b: any) => a.profitProviderRebateYOY - b.profitProviderRebateYOY,
      width: 100,
      render: (text: any) => (
        <div style={{ width: 60 }}>
          {/* <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text)} /> */}
          <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
        </div>
      ),
    },
    {
      title: '仓配费用（万元）',
      dataIndex: 'profitStorage',
      key: 'profitStorage',
      sorter: (a: any, b: any) => a.profitStorage - b.profitStorage,
      width: 200,
      render: (text: any, record: any) => (
        <div style={{ width: 130 }}>
          <NewTableItem
            type={NewItemType.process}
            // value={Number(formatMoneyBymillion(Number(text)))}
            // standardValue={Number(formatMoneyBymillion(Number(maxData?.profitStorageMax)))}
            value={tenThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.profitStorageMax)}
            record={record}
            nameFailed="仓配费用"
            columnName="profitStorage"
            formData={formData}
            categoryLevel={hierarchy}
            // unit="%"
            detailData={[
              {
                label: getLevel(),
                value: record.categoryName,
              },
              {
                label: '仓配费用(万元)',
                value: tenThousandToFormats(text),
                // value: formatMoneyByTrdDecimal(Number(formatMoneyBymillion(record.profitStorage))),
              },
              {
                label: '同比',
                value: percentFormats(record.profitStorageYOY, '%'),
                // value: percentFormatFilterValue(record.profitProviderRebateYOY),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '同比',
      dataIndex: 'profitStorageYOY',
      key: 'profitStorageYOY',
      sorter: (a: any, b: any) => a.profitStorageYOY - b.profitStorageYOY,
      width: 100,
      render: (text: any) => (
        <div style={{ width: 60 }}>
          {/* <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text)} /> */}
          <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
        </div>
      ),
    },
    {
      title: '其他成本费用（万元）',
      dataIndex: 'profitOtherCost',
      key: 'profitOtherCost',
      sorter: (a: any, b: any) => a.profitOtherCost - b.profitOtherCost,
      width: 240,
      render: (text: any, record: any) => (
        <div style={{ width: 130 }}>
          <NewTableItem
            type={NewItemType.process}
            // value={Number(formatMoneyBymillion(Number(text)))}
            // standardValue={Number(formatMoneyBymillion(Number(maxData?.profitOtherCostMax)))}
            value={tenThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.profitOtherCostMax)}
            record={record}
            formData={formData}
            nameFailed="其他成本费用"
            columnName="profitOtherCost"
            categoryLevel={hierarchy}
            // unit="%"
            detailData={[
              {
                label: getLevel(),
                value: record.categoryName,
              },
              {
                label: '其他成本费用（万元）',
                value: tenThousandToFormats(text),
                // value: formatMoneyByTrdDecimal(Number(formatMoneyBymillion(record.profitOtherCost))),
              },
              {
                label: '同比',
                // value: percentFormatFilterValue(record.profitOtherCostYOY),
                value: percentFormats(record.profitOtherCostYOY, '%'),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '同比',
      dataIndex: 'profitOtherCostYOY',
      key: 'profitOtherCostYOY',
      sorter: (a: any, b: any) => a.profitOtherCostYOY - b.profitOtherCostYOY,
      width: 100,
      render: (text: any) => (
        <div style={{ width: 60 }}>
          {/* <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text)} /> */}
          <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
        </div>
      ),
    },
  ]

  return <Table bordered dataSource={list} scroll={{ x: 2000, y: 400 }} columns={columns} pagination={false} />
}
export default ProfitSplittingTable
