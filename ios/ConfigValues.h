// DO NOT COMMIT OR EDIT THIS FILE
#define MY_VARIABLE @"hello"
#define MY_URL @"http://hello.world?howareyoudoing=ok"

static NSDictionary *getValues() {
    return @{
        @"MY_VARIABLE": MY_VARIABLE,
        @"MY_URL": MY_URL,
    };
}
