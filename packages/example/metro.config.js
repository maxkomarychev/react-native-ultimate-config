const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const repoRoot = path.resolve(__dirname, '../../');
const watchFolders = [
  path.resolve(repoRoot, 'packages', 'react-native-ultimate-config'),
];

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
