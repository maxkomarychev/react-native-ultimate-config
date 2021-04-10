package com.reactnativeultimateconfig;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.*;

public class UltimateConfigModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private static Class _buildConfig;
    public static void setBuildConfig(Class buildConfig) {
        _buildConfig = buildConfig;
    }

    public UltimateConfigModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "UltimateConfig";
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
