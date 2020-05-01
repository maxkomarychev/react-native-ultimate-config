describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('label shold have proper test', async () => {
    expect(element(by.id('my_value'))).toHaveText('hello world!');
    expect(element(by.id('string_value'))).toHaveText('hello world! string');
    expect(element(by.id('boolean value'))).toHaveText('false boolean');
    expect(element(by.id('number_value'))).toHaveText('42 number');
    if (device.getPlatform() === 'ios') {
      expect(element(by.id('per_platform_value'))).toHaveText('ios value');
    } else {
      expect(element(by.id('per_platform_value'))).toHaveText('android value');
    }
  });
});
