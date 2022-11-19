#!/bin/bash
set -e

ROOT=$(cd ../../$(dirname ${BASH_SOURCE:-$0}); pwd);

cd "$ROOT/lambda/ec2-start-up-lambda"

npm ci
npm run tsc

# 下記の愚痴参照
cp package.json ./dist
cd "$ROOT/lambda/ec2-start-up-lambda/dist"

# npm ci --omit=dev がnpmのバグでうごいてなさそう
# かろうじてロックファイルとnode_modulesを消した状態なら下記コマンドで
# dependenciesのみもってこれそうなので、しかたがなくしようする
npm i --omit=dev

zip -r ../index .

cd "$ROOT/lambda/ec2-start-up-lambda"

rm -rf ./dist