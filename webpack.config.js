const path = require('path');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/app.ts',
  mode: NODE_ENV,
  target: 'node',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          'ts-loader',
        ]
      }
    ]
  }
};
