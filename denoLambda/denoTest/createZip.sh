#!/bin/bash
set -e

ROOT=$(cd $(dirname ${BASH_SOURCE:-$0}); cd ../..; pwd);

cd "$ROOT/denoLambda/denoTest/src"

# @todo linter
zip -r ../index .