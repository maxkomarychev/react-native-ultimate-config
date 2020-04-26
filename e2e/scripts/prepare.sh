#!/usr/bin/env bash

ROOT=$1
PROJECT=$2

cd "$ROOT"
yarn
npm pack

cd "$PROJECT"
yarn add ../../*.tgz
