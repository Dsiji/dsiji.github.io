FROM nginx:1.23.1-alpine

COPY ./config/nginx.conf /etc/nginx

WORKDIR /usr/share/nginx/html

COPY ./assets ./assets
COPY ./css ./css
COPY ./js ./js
COPY ./index.html .

CMD ["nginx", "-g", "daemon off;"]