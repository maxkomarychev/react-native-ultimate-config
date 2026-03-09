#import <UltimateConfigSpec/UltimateConfigSpec.h>

@interface UltimateConfig : NSObject <NativeUltimateConfigSpec>

- (NSDictionary *)getConfigValues;

@end
