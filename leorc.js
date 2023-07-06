module.exports = {
  publisher: {
    options: {
      // 上传 oss 规则
      uploadRule: {
        // 上传文件是否带有发布时的时间戳，默认以 commitId 作为文件区分
        // 如开启则以 commitId_时间戳 作为文件区分
        useTimeStamp: false,
        // 是否替换图片路径
        replaceImgSource: false,
        // 是否替换资源路径
        replaceDepSource: false,
      },
    },
  },
}
