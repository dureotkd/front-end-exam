#!/bin/bash
REPOSITORY=/home/ec2-user/project/front-end-exam/client

source ~/.bashrc

cd $REPOSITORY

git pull origin master
npx yarn
npx yarn run build


