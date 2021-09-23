FROM node:12
LABEL maintainer="Fastfeedback" 
COPY . /
WORKDIR /
RUN pwd
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
