#!/bin/bash
git pull origin master
cd /home/linux/front-end-exam/server
npx yarn
npx pm2 restart server.js