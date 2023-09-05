#!/bin/bash
REPOSITORY=/home/ec2-user/project/front-end-exam
SERVER_REPOSITORY=/home/ec2-user/project/front-end-exam/server
CLIENT_REPOSITORY=/home/ec2-user/project/front-end-exam/client

source ~/.bashrc

cd $REPOSITORY

git pull origin master

cd $SERVER_REPOSITORY

npx yarn
npx pm2 reload server.js


cd $CLIENT_REPOSITORY

npx yarn
npx npm run build
