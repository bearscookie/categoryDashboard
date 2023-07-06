import { first } from 'lodash'
import moment from 'moment'

// const td = moment('2024-01-09')
const td = moment()

/**
 * 获取指定周周一和周日日期
 */
const getLastWeek = (i: number) => {
  let weekOfDay = parseInt(moment(td).format('E')) //计算今天是这周第几天
  let last_monday = moment(td).subtract(weekOfDay + 7 * i - 1, 'days')
  let last_sunday = moment(td).subtract(weekOfDay + 7 * (i - 1), 'days') //周日日期
  return [last_monday, last_sunday]
}

/**
 *获取倒推12个月数据
 */
const lastMonthArr = (data: any) => {
  const dataArr = []
  const date = new Date(data)
  //   const year = data.getFullYear()
  date.setMonth(date.getMonth() + 1, 1) //获取到当前月份,设置月份
  for (let i = 0; i < 12; i++) {
    date.setMonth(date.getMonth() - 1) //每次循环一次 月份值减1
    let m: any = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    dataArr.push(date.getFullYear() + '-' + m)
  }

  console.log(dataArr)
  return dataArr
}

/**
 * 获取每个月周日的数组
 * @returns
 */
const sundayListEachMonth = (mth: any) => {
  // 获取当前日期
  const currentDate = moment(mth)

  // 获取当前月份
  const currentMonth = currentDate.month()

  // 设置起始日期为当前月份的1号
  const startDate = moment(currentDate).startOf('month')

  // 设置结束日期为当前月份的最后一天
  const endDate = moment(currentDate).endOf('month')

  // 存储每个周日的日期数组
  const sundaysArray = []

  // 迭代从起始日期到结束日期，找到每个周日的日期
  let currentDay = moment(startDate).startOf('day')
  while (currentDay.isSameOrBefore(endDate)) {
    if (currentDay.day() === 0) {
      // 0 代表周日
      sundaysArray.push(moment(currentDay))
    }
    currentDay.add(1, 'day')
  }

  //   console.log(
  //     '??????????///',
  //     sundaysArray.map(date => date.format('YYYY-MM-DD')),
  //   )
  return sundaysArray.reverse()
}

export const getMonthList = () => {
  // 获取今天的日期减去一天
  //   const yesterday = moment().subtract(1, 'days')
  const lastSunday = getLastWeek(1)[1]
  console.log('lastSunday:::', moment(lastSunday).format('YYYY-MM-DD'))
  // 判断上一个周日 和 昨天比 如果上一个月
  //   const m1 = yesterday.format('M')
  //   const m2 = lastSunday.format('M')
  const monthArr = lastMonthArr(lastSunday)
  const res = monthArr.map(ele => {
    return { value: ele, label: ele }
  })
  return res
}

export const getWeekList = (mth: any) => {
  console.log('mth:::', mth)
  //   const yesterday = moment().subtract(1, 'days')
  const lastSunday = getLastWeek(1)[1]
  //   const ld = yesterday.format('DD')
  //   const sd = lastSunday.format('DD')
  const res = sundayListEachMonth(mth)
  console.log('res:::1', res)
  // 获取第一项的 日期
  const first = res[0]
  let weekList: any = []
  console.log('1121', moment(first).format('YYYY-MM-DD'))
  console.log('1121', moment(lastSunday).format('YYYY-MM-DD'))

  // 如果最后一个周日在当前月
  if (moment(first).startOf('month').format('YYYY-MM-DD') === moment(td).startOf('month').format('YYYY-MM-DD')) {
    // console.log('1w232ass在挡球按月')
    // console.log('lastSunday:::', moment(lastSunday).format('YYYY-MM-DD'))
    // weekList = res.filter(ele => {
    //   return {
    //     value: `${moment(ele).startOf('month').format('YYYY-MM-DD')},${moment(ele).format('YYYY-MM-DD')}`,
    //     label: `${moment(ele).startOf('month').format('MMDD')}-${moment(ele).format('MMDD')}`,
    //   }
    // })
    res.forEach(ele => {
    //   console.log('232323sdds', moment(ele).format('x'))
      if (moment(ele).format('x') <= moment(td).subtract(-1).format('X')) {
        weekList.push({
          value: `${moment(ele).startOf('month').format('YYYY-MM-DD')},${moment(ele).format('YYYY-MM-DD')}`,
          label: `${moment(ele).startOf('month').format('MMDD')}-${moment(ele).format('MMDD')}`,
        })
      }
    })
  } else {
    if (moment(res[0]).format('YYYY-MM-DD') === moment(lastSunday).format('YYYY-MM-DD')) {
      weekList = res.map(ele => {
        return {
          value: `${moment(ele).startOf('month').format('YYYY-MM-DD')},${moment(ele).format('YYYY-MM-DD')}`,
          label: `${moment(ele).startOf('month').format('MMDD')}-${moment(ele).format('MMDD')}`,
        }
      })
    } else {
      weekList = res.map(ele => {
        return {
          value: `${moment(ele).startOf('month').format('YYYY-MM-DD')},${moment(ele).format('YYYY-MM-DD')}`,
          label: `${moment(ele).startOf('month').format('MMDD')}-${moment(ele).format('MMDD')}`,
        }
      })
      // 判断最后一天是否是月底
      const lastMonthDay = moment(first).endOf('month').format('YYYY-MM-DD')
      if (lastMonthDay !== moment(first).format('YYYY-MM-DD')) {
        console.log(888888888888)
        weekList.unshift({
          value: `${moment(first).startOf('month').format('YYYY-MM-DD')},${moment(first)
            .endOf('month')
            .format('YYYY-MM-DD')}`,
          label: `${moment(first).startOf('month').format('MMDD')}-${moment(first).endOf('month').format('MMDD')}`,
        })
      }
    }
  }

  console.log('weekList::::', weekList)
  return weekList
}

export const getDefaultWeek = () => {}
