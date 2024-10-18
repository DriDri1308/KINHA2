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
  },
};
