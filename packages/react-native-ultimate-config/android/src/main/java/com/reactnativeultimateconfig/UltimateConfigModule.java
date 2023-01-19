package com.reactnativeultimateconfig;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;
import java.util.*;

import com.reactnativeultimateconfig.UltimateConfigModule;

@ReactModule(name = UltimateConfigModule.NAME)
public class UltimateConfigModule extends ReactContextBaseJavaModule {
  public static final String NAME = "UltimateConfig";

  private static Class _buildConfig;
  public static void setBuildConfig(Class buildConfig) {
    _buildConfig = buildConfig;
  }

  public UltimateConfigModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    try {
      Class act = _buildConfig;
      String keys = (String)act.getField("__RNUC_KEYS").get(act);
      for (String k: keys.split(",")) {
        constants.put(k, act.getField(k).get(act));
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return constants;
  }
}
