# bin/bash

# 打包
npm run build

# 压缩
cd ./dist
zip -r ./dist.zip ./*

cp -r ./libs/* ./dist/

# 创建目录
ssh root@119.3.156.101 'cd /web/demo/ && mkdir -p toothpick/sdk'

# 上传
scp -r ./dist.zip root@119.3.156.101:/web/demo/toothpick/sdk

# 解压
ssh root@119.3.156.101 'cd /web/demo/toothpick/sdk && unzip -o dist.zip'
