process.env.VUE_APP_VERSION = require("./package.json").version;

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()],
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/scss/_/_mixins.scss';
          @import "@/assets/scss/_/_variables.scss";
        `,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
  productionSourceMap: false,
};
