/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const repoRoot = path.resolve(__dirname, '../../');
const watchFolders = [
  path.resolve(repoRoot, 'packages', 'react-native-ultimate-config'),
];

module.exports = {
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
