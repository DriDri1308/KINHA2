const path = require('path');

module.exports = {
  entry: './src/index.js', // Ponto de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
    filename: 'bundle.js', // Nome do arquivo de saída
  },
  mode: 'development', // Modo de desenvolvimento
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
  devServer: {
    static: path.resolve(__dirname, 'public'), // Para servir arquivos estáticos do diretório public
    port: 8080, // Porta do servidor de desenvolvimento
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensões reconhecidas
  },
};
