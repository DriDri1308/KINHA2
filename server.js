const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos da pasta 'build' do React
app.use(express.static(path.join(__dirname, 'build')));

// Rota para servir o arquivo 'index.html' para qualquer requisição GET
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Porta onde o servidor irá escutar, utilizando a porta padrão 3000 ou variável de ambiente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});