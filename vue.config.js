module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '~': '@/assets',
        components: '@/components',
        utils: '@/utils'
      }
    }
  }
};
