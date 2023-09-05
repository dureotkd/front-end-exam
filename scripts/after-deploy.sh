#!/bin/bash
SERVER_REPOSITORY=/home/ec2-user/project/front-end-exam/server

source ~/.bashrc

cd $SERVER_REPOSITORY

npx yarn
npx pm2 reload server.js


