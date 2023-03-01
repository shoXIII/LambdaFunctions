#!/bin/bash
set -e

ROOT=$(cd $(dirname ${BASH_SOURCE:-$0}); cd ../..; pwd);

cd "$ROOT/lambda/slackBotPostMan"

npm ci
npm run tsc

cp package*.json ./dist
cd "$ROOT/lambda/slackBotPostMan/dist"

npm ci --omit=dev

zip -r ../index .

cd "$ROOT/lambda/slackBotPostMan"

rm -rf ./dist