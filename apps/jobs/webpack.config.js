/* const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: resolve(__dirname, 'tsconfig.app.json') })]
  },
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: resolve(__dirname, 'tsconfig.app.json'),
      assets: ["./src/assets"],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMap: true,
    })
  ],
};
 */

const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { resolve, join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({ configFile: resolve(__dirname, 'tsconfig.app.json') }),
    ],
  },
  output: {
    path: join(__dirname, 'dist'), // le dist de l'app
    clean: true,
    filename: 'main.js', // fichier final unique
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: resolve(__dirname, 'tsconfig.app.json'),
      assets: ['./src/assets'],
      optimization: true,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMap: false,
      bundle: true,
      externals: [] // 🔑 inclut toutes les libs dans le main.js
    }),
  ],
};