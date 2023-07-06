# 如果需要将你的文件复制到指定目录
# cp -r ./dist /export/App/ #使用相对路径     cp -r /export/App/resource /export/Data/ # 使用绝对路径

# # 如果需要替换nginx文件
# rm -rf /opt/nginx/conf/domains/portal.conf
# cp ../nginx.conf /opt/nginx/conf/domains/ # 使用相对目录   cp /export/App/nginx.conf /export/servers/nginx/conf/

# # 如果使用到nginx需要启动nginx，不要reload，因为nginx默认是不启动的，需要使用sudo执行
# # 注：首先创建client_body文件
# mkdir -p /dev/shm/nginx_temp/client_body
# sudo /opt/nginx/sbin/nginx -c /opt/nginx/conf/nginx.conf

#!/usr/bin/env bash
cp -r dist /export/App/ #使用相对路径 
# cp -r /export/App/nginx/domains/* /export/servers/nginx/conf/domains

mkdir -p /dev/shm/nginx_temp/client_body
sudo /export/servers/nginx/sbin/nginx -c /export/servers/nginx/conf/nginx.conf

#!/bin/bash
source /etc/profile
#npm start

# install rsync
sudo yum install rsync -y
echo "$(rsync -daenon --version)"