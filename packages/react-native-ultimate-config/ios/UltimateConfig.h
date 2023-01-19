
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNUltimateConfigSpec.h"

@interface UltimateConfig : NSObject <NativeUltimateConfigSpec>
#else
#import <React/RCTBridgeModule.h>

@interface UltimateConfig : NSObject <RCTBridgeModule>
#endif

@end
