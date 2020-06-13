// DO NOT COMMIT OR EDIT THIS FILE
#define APP_NAME @"RNUC Demo"
#define MY_VALUE @"hello world!"
#define STRING_VALUE @"hello"
#define BOOLEAN_VALUE @(NO)
#define NUMBER_VALUE @(42)
#define FLOATING_POINT @(42.2)
#define BUNDLE_ID @"com.awesomern.app"
#define PER_PLATFORM @"ios value"

static NSDictionary *getValues() {
    return @{
        @"APP_NAME": APP_NAME,
        @"MY_VALUE": MY_VALUE,
        @"STRING_VALUE": STRING_VALUE,
        @"BOOLEAN_VALUE": BOOLEAN_VALUE,
        @"NUMBER_VALUE": NUMBER_VALUE,
        @"FLOATING_POINT": FLOATING_POINT,
        @"BUNDLE_ID": BUNDLE_ID,
        @"PER_PLATFORM": PER_PLATFORM,
    };
}
