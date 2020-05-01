// DO NOT COMMIT OR EDIT THIS FILE
#define MY_VARIABLE @"hello"
#define MY_URL @"http://hello.world?howareyoudoing=ok"
#define MY_STRING @"string_value"
#define MY_NUMBER @(42)
#define MY_BOOLEAN @(YES)
#define MY_BOOLEAN_FALSE @(NO)

static NSDictionary *getValues() {
    return @{
        @"MY_VARIABLE": MY_VARIABLE,
        @"MY_URL": MY_URL,
        @"MY_STRING": MY_STRING,
        @"MY_NUMBER": MY_NUMBER,
        @"MY_BOOLEAN": MY_BOOLEAN,
        @"MY_BOOLEAN_FALSE": MY_BOOLEAN_FALSE,
    };
}
