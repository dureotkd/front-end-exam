#!/bin/bash
git pull origin master
cd server
npx yarn
npx pm2 restart server.js