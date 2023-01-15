# bin/bash

# 打包
npm run build

# 压缩
cd ./build
zip -r ./dist.zip ./*

# 创建目录
ssh root@119.3.156.101 'cd /web/demo/ && mkdir -p toothpick/boss'

# 上传
scp -r ./dist.zip root@119.3.156.101:/web/demo/toothpick/boss

# 解压
ssh root@119.3.156.101 'cd /web/demo/toothpick/boss && unzip -o dist.zip'
