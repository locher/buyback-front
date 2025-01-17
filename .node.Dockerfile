# ================================================
# !!! @ansible - DO NOT EDIT THIS FILE LOCALLY !!!
# ================================================

FROM registry.idx.ovh/node:18-buster

RUN mkdir /var/www/html/public --parent
ADD --chown=www-data:www-data .output /var/www/html/public

COPY package.json yarn.lock .npmrc ./

COPY . .

EXPOSE 3000
CMD ["yarn", "start:target"]