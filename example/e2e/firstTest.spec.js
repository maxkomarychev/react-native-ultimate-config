describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('label shold have proper test', async () => {
    expect(element(by.id("my_value"))).toHaveText("hello world!")
  });

});
