package com.reactnativeultimateconfig

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

class UltimateConfigModule(reactContext: ReactApplicationContext) :
  NativeUltimateConfigSpec(reactContext) {

  override fun getConfigValues(): WritableMap {
    val buildConfigClass = _buildConfigClass ?: throw IllegalStateException("BuildConfig class not set. Make sure to call UltimateConfigModule.setBuildConfig(BuildConfig::class.java) in your Application class.")
    val result = Arguments.createMap()

    try {
      val keys = buildConfigClass.getField("__RNUC_KEYS").get(null) as String
      keys.split(",").forEach { key ->
        val value = buildConfigClass.getField(key).get(null) as String
        result.putString(key, value)
      }
    } catch (e: Exception) {
      e.printStackTrace()
    }
    return result
  }

  companion object {
    const val NAME = NativeUltimateConfigSpec.NAME

    private var _buildConfigClass: Class<*>? = null

    fun setBuildConfig(buildConfigClass: Class<*>) {
      _buildConfigClass = buildConfigClass
    }
  }
}
