FROM node:24

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run compile

# COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
# RUN chmod +x /usr/src/app/docker-entrypoint.sh

EXPOSE 4000

# ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
# CMD [ "node", "./dist/index.js" ]
CMD ["sh", "-c", "npx prisma migrate deploy && npm run test && node ./dist/index.js"]
