FROM node:22
RUN npm install -g pnpm
COPY ./ /jp-admin
WORKDIR /jp-admin

RUN pnpm install && pnpm run build

FROM nginx
RUN mkdir /jp-admin
COPY --from=0 /jp-admin/dist /jp-admin
COPY nginx.conf /etc/nginx/nginx.conf