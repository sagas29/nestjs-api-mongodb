
FROM node:18-alpine
 
RUN npm install -g @nestjs/cli

WORKDIR /user/src/app
 
COPY . .
 
RUN npm ci --omit=dev
 
RUN npm run build

RUN chown -R node:node /user/src/app
 
USER node

EXPOSE 3000
 
CMD ["npm", "run", "start:prod"]