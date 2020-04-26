#!/usr/bin/env bash

set -x
set -e

IOS_ROOT=$1
PROJECT_NAME=$2
KEY=$3
VALUE=$4


/usr/libexec/PlistBuddy -c "Print :$KEY" "$IOS_ROOT/build/Build/Products/Debug-iphonesimulator/$PROJECT_NAME.app/Info.plist" 2>/dev/null | grep "$VALUE"
