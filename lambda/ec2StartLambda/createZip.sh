#!/bin/bash
set -e

ROOT=$(cd $(dirname ${BASH_SOURCE:-$0}); cd ../..; pwd);

cd "$ROOT/lambda/ec2StartLambda"

npm ci
npm run tsc

cp package*.json ./dist
cd "$ROOT/lambda/ec2StartLambda/dist"

npm ci --omit=dev

zip -r ../index .

cd "$ROOT/lambda/ec2StartLambda"

rm -rf ./dist