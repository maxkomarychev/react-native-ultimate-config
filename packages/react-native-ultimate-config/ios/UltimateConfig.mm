#import "UltimateConfig.h"
#import "ConfigValues.h"

@implementation UltimateConfig

- (NSDictionary *)getConfigValues {
    return getValues();
}

+ (NSString *)moduleName { 
    return @"UltimateConfig";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params { 
    return std::make_shared<facebook::react::NativeUltimateConfigSpecJSI>(params);
}

@end
