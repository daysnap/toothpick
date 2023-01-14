# bin/bash

# 打包
npm run build

# 压缩
cd ./dist
zip -r ./dist.zip ./*

pwd

# 创建目录
ssh root@119.3.156.101 'cd /web/demo/ && mkdir -p toothpick/user'

# 上传
scp -r ./dist.zip root@119.3.156.101:/web/demo/toothpick/user

# 解压
ssh root@119.3.156.101 'cd /web/demo/toothpick/user && unzip -o dist.zip'
