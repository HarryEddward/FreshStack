FROM nginx:alpine

COPY ./src/vite-project/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
