#import "UltimateConfig.h"
#import "ConfigValues.h"


@implementation UltimateConfig

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return getValues();
}

@end
