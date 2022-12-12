#!/bin/bash
set -e

ROOT=$(cd $(dirname ${BASH_SOURCE:-$0}); cd ../..; pwd);

cd "$ROOT/lambda/ec2-start-up-lambda"

npm ci
npm run tsc

cp package*.json ./dist
cd "$ROOT/lambda/ec2-start-up-lambda/dist"

npm ci --omit=dev

zip -r ../index .

cd "$ROOT/lambda/ec2-start-up-lambda"

rm -rf ./dist