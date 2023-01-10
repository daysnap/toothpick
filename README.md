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
