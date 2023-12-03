FROM node:lts-alpine
WORKDIR /app

COPY yarn.lock package.json /app
RUN ls /app
RUN yarn
COPY main.js /app
RUN ls /app
ENV HOST="0.0.0.0"
ENV PORT="3000"

CMD ["node", "main.js"]
