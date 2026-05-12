# 第一阶段：构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install
COPY . .
RUN npm run build

# 第二阶段：运行
FROM nginx:alpine
# 将第一阶段生成的 dist 文件夹复制到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html
# 将你刚才创建的 nginx.conf 复制到配置目录
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]