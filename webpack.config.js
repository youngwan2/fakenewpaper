// webpack.config.js
// 최소 설정 웹펙 적용 
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpackMode = process.env.NODE_ENV || "development";

module.exports = {
  mode: webpackMode,
  resolve: {
    extensions: [".js", ".css", ".scss"], // 이는 사용자가 import 할 때 확장자를 생략 할 수 있도록 합니다.
  },
  entry: {
    main: "./src/main.js",
  },
  devServer: {
    open: true,
    liveReload: true,
  },
  optimization: {
    minimizer:
      webpackMode === "production"
        ? [
            new TerserPlugin({
              //빌드할때 소스코드 압축해줌.
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ]
        : [],
    splitChunks: {
      // 중복된 모듈을 없에주는 옵션
      chunks: "all",
    },
  },
  //웹팩 5 부터는 파일로더를 npm install 하지 않아도 된다. 내장 속성을 이용할 수 있음
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        // images loader
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        // fonts loader
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/, //폰트 분석해서 해당되는 파일 경량화해서 만들어 준다.
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        // css 또는 scss loader
        test: /\.s[ac]ss|css$/i,
        exclude: /node_modules/, //노드 모듈 파일은 생성하지 않음
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ //빌드 시 자동으로 동기화된 html 파일 생성
      template: "./src/index.html", //src 폴더의 index html 파일을 기준으로 생성
      minify:
        process.env.NODE_ENV === "production"
          ? {  //배포 모드라면 공백 제거하고, 주석 제거함.
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new MiniCssExtractPlugin({   //css 파일을 경량화(최적화) 해서 따로 만들어줌.
      filename: "assets/[name].min.css",
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "assets/[name].min.js",  //assets 폴더에 js 파일 생성
    path: path.resolve(__dirname, "./dist/"),  // dist 폴더를 루트 폴더로 정한다.
  },
};
