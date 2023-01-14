# toothpick


## pnpm 管理

```bash

# 给项目安装依赖
pnpm install lint-staged -w -D

# 给子项目安装依赖
pnpm install typescript --filter @daysnap/toothpick-sdk

# 给所有项目安装依赖
pnpm install socket.io -r

# 子项目依赖
pnpm install @daysnap/toothpick-sdk --filter @daysnap/toothpick-playground -S

```


```bash
nginx -t -c /etc/nginx/nginx.conf

netstat -nap | grep 80

kill -9 <pid>

pm2 start npm --watch --name <taskname> -- run start

yum -y install nodejs

yum remove nodejs npm -y

curl --silent --location https://rpm.nodesource.com/setup_16.13.0 | sudo bash -


pm2 log [project]
```


```js
// https://juejin.cn/post/7005849295693807624
// https://babeljs.io/docs/en/configuration

```

```bash
# https://www.hhyit.com/archives/4226
# centos8 在 CentOS 8 中安装软件出现 “错误：为仓库 ‘appstream’ 下载元数据失败” 的解决办法
sed -i -e "s|mirrorlist=|#mirrorlist=|g" /etc/yum.repos.d/CentOS-*
sed -i -e "s|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g" /etc/yum.repos.d/CentOS-*
```



