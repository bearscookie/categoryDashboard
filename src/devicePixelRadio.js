export const DevicePixelRatio = {
  // 获取系统类型
  getSystem() {
    const agent = navigator.userAgent.toLowerCase()
    // 现只针对windows处理，并排除火狐浏览器
    if (agent.indexOf('windows') >= 0 && agent.indexOf('firefox') < 0) {
      return true
    }
    return false
  },

  // 校正浏览器缩放比例
  correct() {
    // 页面devicePixelRatio（设备像素比例）变化后，计算页面body标签zoom修改其大小，来抵消devicePixelRatio带来的变化。
    document.getElementsByTagName('body')[0].style.zoom = 1 / window.devicePixelRatio
  },

  // 修正echart鼠标错位
  correctEchart() {
    const canvas = Array.from(document.getElementsByTagName('canvas'))
    console.log(canvas, 23232)
    if (DevicePixelRatio.getSystem()) {
      if (canvas) {
        canvas.forEach(i => {
          i.style.zoom = window.devicePixelRatio
          i.style.transform = `scale(${1 / window.devicePixelRatio})`
          i.style.transformOrigin = '0%0%'
          i.style.width = `${window.devicePixelRatio * 100}%`
        })
      }
    }
  },

  // 初始化页面比例
  init() {
    if (DevicePixelRatio.getSystem()) {
      // 判断设备，目前只在windows系统下校正浏览器缩放比例
      // 初始化页面校正浏览器缩放比例
      DevicePixelRatio.correct()
      DevicePixelRatio.correctEchart()
    }
  },
}
