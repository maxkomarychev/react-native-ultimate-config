#!/usr/bin/env bash

set -x
set -e


ANDROID_ROOT=$1
VARIANT=$2
KEY=$3
VALUE=$4
TYPE=${5:-string}


xmllint --xpath "//resources/$TYPE[@name=\"$KEY\"]"  "$ANDROID_ROOT/app/build/generated/res/resValues/$VARIANT/values/gradleResValues.xml" | grep "$VALUE"
