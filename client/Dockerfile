FROM node:alpine as builder

WORKDIR /app

#COPY ./package.json ./
COPY . .
#RUN npm install
RUN npm install @material-ui/core
RUN npm install @material-ui/icons
RUN npm install recharts


RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
