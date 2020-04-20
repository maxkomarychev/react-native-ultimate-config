#import "UltimateConfig.h"
#import "ConfigValues.h"


@implementation UltimateConfig

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSDictionary *)constantsToExport
{
    return getValues();
}

@end
