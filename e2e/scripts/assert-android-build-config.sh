#!/usr/bin/env bash

set -x
set -e


ANDROID_ROOT=$1
VARIANT=$2
PACKAGE=$3
KEY=$4
VALUE=$5
TYPE=${6:-String}

grep "public static final $TYPE $KEY = $VALUE" "$ANDROID_ROOT/app/build/generated/source/buildConfig/$VARIANT/$PACKAGE/BuildConfig.java"
