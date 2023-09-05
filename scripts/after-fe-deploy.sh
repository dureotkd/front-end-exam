#!/bin/bash
REPOSITORY=/home/ec2-user/project/front-end-exam

source ~/.bashrc

cd $REPOSITORY

git pull origin master
npx yarn
npx npm run build


