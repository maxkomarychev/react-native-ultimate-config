package com.reactnativeultimateconfig;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.*;

public class UltimateConfigModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

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
        return ConfigValues.getConstants();
    }
}
