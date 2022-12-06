/* eslint-disable @typescript-eslint/no-var-requires */
const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

module.exports = (env, argv) => {
  const isProd = argv && argv.mode === 'production';
  return {
    entry: {
      main: path.resolve(__dirname, 'main.ts'),
    },
    output: {
      publicPath: '/',
      path: path.resolve('./dist'),
      filename: 'assets/scripts/[name].[contenthash].js',
      chunkFilename: 'assets/scripts/[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
        },
        {
          test: /\.css$/,
          use: [
            !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.s[ca]ss$/,
          use: [
            !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jpe?g|gif|webm|mp4)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/media/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/fonts/[name].[hash:7].[ext]',
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve(__dirname, 'src'),
        '@test': path.resolve(__dirname, '../test'),
      },
      extensions: ['.js', '.ts', '.vue', '.json'],
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](?!@chewy\/kib)/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          lodash: {
            test: /[\\/]node_modules[\\/]react/,
            name: 'react',
            priority: -8,
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/]moment/,
            name: 'moment',
            priority: -8,
            chunks: 'all',
          },
          moment: {
            test: /[\\/]node_modules[\\/]lodash/,
            name: 'lodash',
            priority: -8,
            chunks: 'all',
          },
          okta: {
            test: /[\\/]node_modules[\\/]@okta/,
            name: 'okta',
            priority: -8,
            chunks: 'all',
          },
          vue: {
            test: /[\\/]node_modules[\\/]vue/,
            name: 'vue',
            priority: -8,
            chunks: 'all',
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui/,
            name: 'mui',
            priority: -8,
            chunks: 'all',
          },
          manifest: {
            minChunks: Infinity,
          },
        },
      },
    },
    devServer: {
      compress: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      port: (argv && argv.port) || 3000,
      historyApiFallback: true,
    },
    devtool: 'eval-source-map',
  };
};
