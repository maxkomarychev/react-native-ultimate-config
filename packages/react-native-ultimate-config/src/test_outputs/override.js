const RN = require("react-native");

const IOS_DATA = {
  "MY_VARIABLE": "hello",
  "MY_URL": "http://hello.world?howareyoudoing=ok",
  "MY_STRING": "string_value",
  "MY_NUMBER": 42,
  "MY_BOOLEAN": true,
  "MY_BOOLEAN_FALSE": false,
  "QUOTES": "hello \"world'",
  "PER_PLATFORM": "hello"
}

const ANDROID_DATA = {
  "MY_VARIABLE": "hello",
  "MY_URL": "http://hello.world?howareyoudoing=ok",
  "MY_STRING": "string_value",
  "MY_NUMBER": 42,
  "MY_BOOLEAN": true,
  "MY_BOOLEAN_FALSE": false,
  "QUOTES": "hello \"world'",
  "PER_PLATFORM": "world"
}

module.exports = {
  get MY_VARIABLE() {
    return RN.Platform.select({
      ios: IOS_DATA["MY_VARIABLE"],
      android: ANDROID_DATA["MY_VARIABLE"],
    });
  },
  get MY_URL() {
    return RN.Platform.select({
      ios: IOS_DATA["MY_URL"],
      android: ANDROID_DATA["MY_URL"],
    });
  },
  get MY_STRING() {
    return RN.Platform.select({
      ios: IOS_DATA["MY_STRING"],
      android: ANDROID_DATA["MY_STRING"],
    });
  },
  get MY_NUMBER() {
    return RN.Platform.select({
      ios: IOS_DATA["MY_NUMBER"],
      android: ANDROID_DATA["MY_NUMBER"],
    });
  },
  get MY_BOOLEAN() {
    return RN.Platform.select({
      ios: IOS_DATA["MY_BOOLEAN"],
      android: ANDROID_DATA["MY_BOOLEAN"],
    });
  },
  get MY_BOOLEAN_FALSE() {
    return RN.Platform.select({
      ios: IOS_DATA["MY_BOOLEAN_FALSE"],
      android: ANDROID_DATA["MY_BOOLEAN_FALSE"],
    });
  },
  get QUOTES() {
    return RN.Platform.select({
      ios: IOS_DATA["QUOTES"],
      android: ANDROID_DATA["QUOTES"],
    });
  },
  get PER_PLATFORM() {
    return RN.Platform.select({
      ios: IOS_DATA["PER_PLATFORM"],
      android: ANDROID_DATA["PER_PLATFORM"],
    });
  },
}
