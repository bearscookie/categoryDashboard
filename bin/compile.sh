# 复制待部署的静态资源，直接放到$BUILD下面
cp -r dist/ $BUILD/
# 创建$BUILD/bin/目录
mkdir -p $BUILD/bin/
# 复制bin/start.sh stop.sh到$BUILD
cp bin/start.sh $BUILD/bin/
# cp bin/stop.sh $BUILD/bin/

# 如果有nginx文件，则可以复制到$BUILD
cp nginx.conf $BUILD

# 将你需要的文件、脚本copy到$BUILD后，我们会将$BUILD目录下内容打包成zip格式