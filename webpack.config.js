const path = require('path');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
    filename: 'bundle.js', // Nome do arquivo de saída
  },
  mode: 'development', // Modo de desenvolvimento ou produção
  module: {
    rules: [
      {
        test: /\.css$/, // Regras para arquivos CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Regras para imagens
        type: 'asset/resource',
      },
      {
        test: /\.jsx?$/, // Regras para arquivos JS e JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensões reconhecidas
    fallback: {
      fs: false, // Se não precisa do fs, defina como false
      http: require.resolve('stream-http'), // Adiciona o polyfill para o módulo http
      https: require.resolve('https-browserify'), // Adiciona o polyfill para o módulo https
      stream: require.resolve('stream-browserify'), // Adiciona o polyfill para o módulo stream
      buffer: require.resolve('buffer/'), // Adiciona o polyfill para o módulo buffer
      process: require.resolve('process/browser'), // Adiciona o polyfill para o módulo process
      crypto: require.resolve('crypto-browserify'), // Adiciona o polyfill para o módulo crypto
      querystring: require.resolve('querystring-es3'), // Adiciona o polyfill para o módulo querystring
      path: require.resolve('path-browserify'), // Adiciona o polyfill para o módulo path
      url: require.resolve('url'), // Adiciona o polyfill para o módulo url
    },
  },
};
