# bin/bash

mkdir -p ./dist

# 压缩
zip -r ./dist/dist.zip ./* -x='node_modules/*' -x='dist/*' -x='bin/*'

cd ./dist

# 创建目录
ssh root@119.3.156.101 'cd /webserver/ && mkdir -p toothpick/server'

# 上传
scp -r ./dist.zip root@119.3.156.101:/webserver/toothpick/server

# 解压
ssh root@119.3.156.101 'cd /webserver/toothpick/server && unzip -o dist.zip'

# npm install & start
ssh root@119.3.156.101 'cd /webserver/toothpick/server && npm install && npm run restart'
