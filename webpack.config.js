const path = require('path');

module.exports = {
  mode: 'development', // Adicione esta linha para definir o modo
  entry: './index.js', // Caminho para o seu arquivo de entrada
  output: {
    filename: 'bundle.js', // Nome do arquivo gerado
    path: path.resolve(__dirname, 'dist'), // Caminho de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica o loader a arquivos .js
        exclude: /node_modules/, // Exclui a pasta node_modules
        use: {
          loader: 'babel-loader', // Usar o babel-loader
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Extensões a serem resolvidas
  },
};