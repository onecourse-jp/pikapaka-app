const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const envFilePath = path.resolve(__dirname, '.env');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const resolve = (dir) => path.resolve(__dirname, dir);
// const { override, addBabelPlugins, babelInclude } = require('customize-cra');

// // our packages that will now be included in the CRA build step
// const appIncludes = [
//   resolveApp('./src'),
//   resolveApp('./node_modules/react-native-select-multiple'),
//   resolveApp('./node_modules/react-native-vector-icons'),
//   resolveApp('./node_modules/react-native'),
//   resolveApp('./node_modules/@ptomasroos/react-native-multi-slider'),
//   resolveApp('./node_modules/@react-native-community/cameraroll'),
//   resolveApp('./node_modules/@react-native-community/image-editor'),
//   resolveApp('./node_modules/@react-native-masked-view/masked-view'),
//   resolveApp('./node_modules/@twotalltotems/react-native-otp-input'),
//   resolveApp('./node_modules/react-native-animatable'),
//   resolveApp('./node_modules/react-native-camera'),
//   resolveApp('./node_modules/react-native-easy-view-transformer'),
//   resolveApp('./node_modules/react-native-fast-image'),
//   resolveApp('./node_modules/react-native-fs'),
//   resolveApp('./node_modules/react-native-gifted-chat'),
//   resolveApp('./node_modules/react-native-htmlview'),
//   resolveApp('./node_modules/react-native-iap'),
//   resolveApp('./node_modules/react-native-image-progress'),
//   resolveApp('./node_modules/react-native-lightbox'),
//   resolveApp('./node_modules/react-native-linear-gradient'),
//   resolveApp('./node_modules/react-native-modal-loader'),
//   resolveApp('./node_modules/react-native-parsed-text'),
//   resolveApp('./node_modules/react-native-power-translator'),
//   resolveApp('./node_modules/react-native-progress'),
//   resolveApp('./node_modules/react-native-skeleton-placeholder'),
//   resolveApp('./node_modules/react-native-swiper'),
//   resolveApp('./node_modules/react-native-typing-animation'),
//   resolveApp('./node_modules/react-native-video'),
//   resolveApp('./node_modules/react-native-webview'),
//   resolveApp('./node_modules/rn-fetch-blob'),
//   resolveApp('./node_modules/@invertase/react-native-apple-authentication'),
//   resolveApp('./node_modules/react-native-web-storage'),
//   resolveApp('./node_modules/react-native-image-picker'),
//   // resolveApp('./node_modules/'),
// ];
// module.exports = function override(config, env) {
//   // allow importing from outside of src folder
//   config.resolve.plugins = config.resolve.plugins.filter(
//     (plugin) => plugin.constructor.name !== 'ModuleScopePlugin',
//   );
//   config.mode = 'development';

//   config.module.rules[0].include = appIncludes;
//   config.module.rules[1].oneOf[2].include = appIncludes;
//   config.module.rules[1].oneOf[2].options.plugins.push(
//     require.resolve('babel-plugin-react-native-web'),
//   );
//   const reactScriptsRules = config.module.rules[1];

//   // const imgRule = reactScriptsRules.oneOf.find(
//   //   (rule) => rule.loader && rule.loader.includes('url-loader'),
//   // );
//   // imgRule.options.esModule = false;

//   config.plugins.push(
//     new webpack.DefinePlugin({
//       __REACT_WEB_CONFIG__: JSON.stringify(
//         dotenv.config({ path: envFilePath }).parsed,
//       ),
//       __DEV__: env !== 'production',
//     }),
//   );
//   config.plugins = config.plugins.filter(
//     (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin',
//   );

//   // config.module.rules.push();
//   config.module.rules = [
//     // {
//     //   test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
//     //   use: {
//     //     loader: 'file-loader',
//     //     options: {
//     //       name: '[name].[ext]',
//     //       esModule: false,
//     //     },
//     //   },
//     // },
//     ...config.module.rules,
//     {
//       test: /\.svg$/,
//       exclude: /node_modules/,
//       use: [
//         {
//           loader: '@svgr/webpack',
//         },
//       ],
//     },
//   ];

//   config.module.rules.push({
//     test: /\.(js|tsx?)$/,
//     exclude: /node_modules[/\\](?!react-native-vector-icons)/,
//     use: {
//       loader: 'babel-loader',
//       options: {
//         // Disable reading babel configuration
//         // babelrc: false,
//         configFile: false,
//         // sourceType: 'unambiguous',
//         // The configuration for compilation
//         presets: [
//           ['@babel/preset-env', { useBuiltIns: 'entry' }],
//           // '@babel/preset-flow',
//           'module:metro-react-native-babel-preset',
//           // '@babel/preset-typescript',
//         ],
//         plugins: [
//           ["react-native-web", { commonjs: true }],
//           '@babel/plugin-proposal-class-properties',
//           '@babel/plugin-proposal-object-rest-spread',
//         ],
//       },
//     },
//   });

//   config.module.strictExportPresence = false;
//   //   // To let alias like 'react-native/Libraries/Components/StaticRenderer'
//   // // take effect, must set it before alias 'react-native'
//   // delete config.resolve.alias['react-native'];
//   // config.resolve.alias['react-native/Libraries/Components/StaticRenderer'] =
//   //   'react-native-web/dist/vendor/react-native/StaticRenderer';
//   // config.resolve.alias['react-native'] = path.resolve(
//   //   'web/aliases/react-native',

//   config.resolve.alias = Object.assign(config.resolve.alias, {
//     src: resolve('src'),
//     'react-native-config': 'react-web-config',
//     '@actions': resolve('src/actions'),
//     // '@assets/images': resolve('src/assets/images'),
//     '@assets': resolve('src/assets'),
//     '@components': resolve('src/components'),
//     '@config': resolve('src/config'),
//     '@data': resolve('src/data'),
//     '@lib': resolve('src/lib'),
//     '@navigation': resolve('src/navigation'),
//     '@reducers': resolve('src/reducers'),
//     '@sagas': resolve('src/sagas'),
//     '@screens': resolve('src/screens'),
//     '@store': resolve('src/store'),
//     '@utils': resolve('src/utils'),
//     '@services': resolve('src/services'),
//     '@I18n': resolve('src/I18n'),
//     '@context': resolve('src/context'),
//     // etc...
//   });
//   console.log('config', config);

//   return config;
// };

// config-overrides.js
const {
  addWebpackAlias,
  babelInclude,
  fixBabelImports,
  override,
  addBabelPlugin,
  addBabelPlugins,
} = require('customize-cra');

// const path = require('path');

module.exports = override(
  // fixBabelImports('module-resolver', {
  //   alias: {

  //   },
  // }),
  function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ModuleScopePlugin',
    );
    config.mode = 'development';

    config.plugins.push(
      new webpack.DefinePlugin({
        __REACT_WEB_CONFIG__: JSON.stringify(
          dotenv.config({ path: envFilePath }).parsed,
        ),
        __DEV__: env !== 'production',
      }),
    );
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin',
    );

    config.module.strictExportPresence = false;

    config.module.rules.push({
      test: /\.(js|tsx?)$/,
      exclude: /node_modules[/\\](?!react-native-vector-icons)/,
      use: {
        loader: 'babel-loader',
        options: {
          // Disable reading babel configuration
          // babelrc: false,
          configFile: false,
          // The configuration for compilation
          presets: [
            ['@babel/preset-env', { useBuiltIns: 'entry' }],
            'module:metro-react-native-babel-preset',
          ],
          plugins: [
            // ['react-native-web', { commonjs: true }],
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
          ],
        },
      },
    });
    return config;
  },
  addBabelPlugins([require.resolve('babel-plugin-react-native-web')]),
  addWebpackAlias({
    'react-native': 'react-native-web',
    // 'react-native-svg': 'svgs', // not necessary unless you wanted to do this
  }),
  addWebpackAlias({
    src: resolve('src'),
    'react-native-config': 'react-web-config',
    '@actions': resolve('src/actions'),
    // '@assets/images': resolve('src/assets/images'),
    '@assets': resolve('src/assets'),
    '@components': resolve('src/components'),
    '@config': resolve('src/config'),
    '@data': resolve('src/data'),
    '@lib': resolve('src/lib'),
    '@navigation': resolve('src/navigation'),
    '@reducers': resolve('src/reducers'),
    '@sagas': resolve('src/sagas'),
    '@screens': resolve('src/screens'),
    '@store': resolve('src/store'),
    '@utils': resolve('src/utils'),
    '@services': resolve('src/services'),
    '@I18n': resolve('src/I18n'),
    '@context': resolve('src/context'),
    '^react-native$': 'react-native-web',
  }),
  babelInclude([
    path.resolve('src'), // make sure you link your own source
    // any react-native modules you need babel to compile
    // path.resolve('node_modules/react-native-indicators'),
    // path.resolve('node_modules/react-native-popup-menu'),
    // path.resolve('node_modules/react-native-vector-icons'),
    // path.resolve('node_modules/react-native-web-linear-gradient'),
    // path.resolve('node_modules/react-router-native'),
    // resolveApp('./node_modules/react-native-incall-manager'),
    resolveApp('./node_modules/react-native-select-multiple'),
    resolveApp('./node_modules/react-native-vector-icons'),
    resolveApp('./node_modules/react-native'),
    // resolveApp('./node_modules/@ptomasroos/react-native-multi-slider'),
    resolveApp('./node_modules/@react-native-community/cameraroll'),
    // resolveApp('./node_modules/@react-native-community/image-editor'),
    resolveApp('./node_modules/@react-native-masked-view/masked-view'),
    resolveApp('./node_modules/@twotalltotems/react-native-otp-input'),
    resolveApp('./node_modules/react-native-animatable'),
    resolveApp('./node_modules/react-native-camera'),
    resolveApp('./node_modules/react-native-easy-view-transformer'),
    resolveApp('./node_modules/react-native-fast-image'),
    resolveApp('./node_modules/react-native-fs'),
    // resolveApp('./node_modules/react-native-gifted-chat'),
    resolveApp('./node_modules/react-native-htmlview'),
    resolveApp('./node_modules/react-native-iap'),
    resolveApp('./node_modules/react-native-image-progress'),
    resolveApp('./node_modules/react-native-lightbox'),
    // resolveApp('./node_modules/react-native-linear-gradient'),
    resolveApp('./node_modules/react-native-modal-loader'),
    resolveApp('./node_modules/react-native-parsed-text'),
    // resolveApp('./node_modules/react-native-power-translator'),
    resolveApp('./node_modules/react-native-progress'),
    // resolveApp('./node_modules/react-native-skeleton-placeholder'),
    // resolveApp('./node_modules/react-native-swiper'),
    resolveApp('./node_modules/react-native-typing-animation'),
    resolveApp('./node_modules/react-native-video'),
    resolveApp('./node_modules/react-native-webview'),
    resolveApp('./node_modules/rn-fetch-blob'),
    resolveApp('./node_modules/@invertase/react-native-apple-authentication'),
    resolveApp('./node_modules/react-native-web-storage'),
  ]),
);
