#!/bin/bash
set -e

ROOT=$(cd $(dirname ${BASH_SOURCE:-$0}); cd ../..; pwd);

cd "$ROOT/lambda/slackBotPostManFromSNS"

npm ci
npm run tsc

cp package*.json ./dist
cd "$ROOT/lambda/slackBotPostManFromSNS/dist"

npm ci --omit=dev

zip -r ../index .

cd "$ROOT/lambda/slackBotPostManFromSNS"

rm -rf ./dist