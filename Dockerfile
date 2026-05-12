# 第一阶段：构建 (保持不变)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install
COPY . .
RUN npm run build

# 第二阶段：运行
FROM nginx:alpine
# 复制问卷平台构建结果
COPY --from=builder /app/dist /usr/share/nginx/html

# 注意：这里我们不需要在 Dockerfile 里 COPY 爱彼迎的文件，
# 因为爱彼迎源码在服务器上，我们通过 docker-compose 的 volumes 实时挂载进去。

# 复制刚才修改好的 nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 声明新的端口（3001 为主站，3002 为爱彼迎）
EXPOSE 3001 3002

CMD ["nginx", "-g", "daemon off;"]