module.exports = {
  entry: "./lib/entry.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
};



module.exports = {
  context: __dirname,
  entry: "./lib/entry.js",
  output: {
    filename: "./lib/bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
