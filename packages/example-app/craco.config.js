const path = require('path')

const updateWebpackConfig = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    // As described in https://github.com/facebook/create-react-app/issues/3547
    // there are some issues with how CRA treats symlinks which pnpm heavily uses.
    // This hack should fix this issue (loading prosemirror-model twice) for now
    webpackConfig.resolve.alias = {
      'prosemirror-model$': path.resolve(__dirname, '../editor/node_modules/prosemirror-model'),
    }
    return webpackConfig;
  }
}

module.exports = {
  plugins: [
    { plugin: updateWebpackConfig, options: {} }
  ]
}