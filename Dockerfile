# 使用官方的Node镜像作为构建阶段的基础镜像
FROM node:22 AS build

# 安装 pnpm
RUN npm install -g pnpm && pnpm --version

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件
COPY package*.json ./

# 安装依赖
RUN pnpm install

# 复制整个项目文件到工作目录
COPY . .

# 构建项目
RUN pnpm run build

# 使用官方的Nginx镜像作为运行阶段的基础镜像
FROM nginx

RUN mkdir -p /etc/nginx/ssl

# 创建一个目录来存放应用文件
RUN mkdir /usr/share/nginx/html/app

# COPY /etc/nginx/ssl/www.wxcorer.com_bundle.crt /usr/share/nginx/html/app/www.wxcorer.com_bundle.crt
# COPY /etc/nginx/ssl/www.wxcorer.com.key /usr/share/nginx/html/app/www.wxcorer.com.key

# 复制构建好的文件到Nginx的html目录中
COPY --from=build /app/dist /usr/share/nginx/html/app

# 复制自定义的Nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80 443

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
