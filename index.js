const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configuração da sessão
app.use(session({
  secret: 'seuSegredo',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = {
  'dona': {
    passwordHash: bcrypt.hashSync('senha', 10) // Hash da senha para a dona
  }
};

let agendamentos = []; // Array para armazenar os agendamentos

// Middleware para proteger rotas
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Acesso negado');
  }
}

// Rota para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    req.session.user = username;
    res.send('Login bem-sucedido');
  } else {
    res.status(401).send('Usuário ou senha incorretos');
  }
});

// Rota para logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout bem-sucedido');
});

// Rota para agendar
app.post('/agendar', (req, res) => {
  const { nome, telefone, horario, data } = req.body;
  agendamentos.push({ nome, telefone, horario, data });
  res.send('Agendamento confirmado');
});

// Rota para cancelar agendamento (protegida)
app.post('/cancelar', authMiddleware, (req, res) => {
  const { horario, data } = req.body;
  agendamentos = agendamentos.filter(agendamento => agendamento.horario !== horario || agendamento.data !== data);
  res.send('Agendamento cancelado');
});

// Rota para obter agendamentos
app.get('/agendamentos', (req, res) => {
  res.json(agendamentos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});