// DO NOT COMMIT OR EDIT THIS FILE
package com.reactnativeultimateconfig;
import java.util.*;

class ConfigValues {
  public static Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("MY_VARIABLE", "hello");
    constants.put("MY_URL", "http://hello.world?howareyoudoing=ok");
    return constants;
  }
}
