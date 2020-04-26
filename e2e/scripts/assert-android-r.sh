#!/usr/bin/env bash

set -x
set -e


ANDROID_ROOT=$1
VARIANT=$2
PACKAGE=$3
KEY=$4



grep "$KEY" "$ANDROID_ROOT/app/build/generated/not_namespaced_r_class_sources/$VARIANT/r/$PACKAGE/R.java"
