#!/bin/bash
REPOSITORY=/home/ec2-user/project/front-end-exam

source ~/.bashrc

cd $REPOSITORY

git pull origin master

cd "$REPOSITORY/server"
npx yarn
npx pm2 reload server.js

cd "$REPOSITORY/client"
npx yarn
npx npm run build


