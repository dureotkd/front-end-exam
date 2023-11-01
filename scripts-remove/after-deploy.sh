#!/bin/bash

# 경로 변수 정의
REPOSITORY=/home/ec2-user/project/front-end-exam
SERVER_REPOSITORY=/home/ec2-user/project/front-end-exam/server
CLIENT_REPOSITORY=/home/ec2-user/project/front-end-exam/client

# 환경변수 설정
source ~/.bashrc

cd $REPOSITORY

# Git 업데이트
git pull origin master

cd $SERVER_REPOSITORY

# 서버 재시작 및 의존성 부여
npx yarn
npx pm2 reload server.js


# 클라이언트 재빌드 및 의존성 부여
cd $CLIENT_REPOSITORY

npx yarn
npx yarn run build
