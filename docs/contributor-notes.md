# Developing

## Directory structure

Repository is maintained using [lerna](https://github.com/lerna/lerna) in order
to symlink rnuc library into example app.

## Working with example

1. run `lerna bootstrap`
1. install pods `npm run pods`
1. init default env `npm run example:env` or `npm run example:web:env`
1. start packages `npm run example:start`
1. run example `npm run example:ios` or `npm run example:android` or `npm run example:web:start`
