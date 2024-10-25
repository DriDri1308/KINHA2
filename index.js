const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(session({
  secret: 'seuSegredo',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = {
  'dona': {
    passwordHash: bcrypt.hashSync('senha', 10)
  }
};

let agendamentos = [];

function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Acesso negado');
  }
}

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

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout bem-sucedido');
});

app.post('/agendar', (req, res) => {
  const { nome, telefone, horario, data } = req.body;
  agendamentos.push({ nome, telefone, horario, data });
  res.send('Agendamento confirmado');
});

app.post('/cancelar', authMiddleware, (req, res) => {
  const { horario, data } = req.body;
  agendamentos = agendamentos.filter(
    agendamento => agendamento.horario !== horario || agendamento.data !== data
  );
  res.send('Agendamento cancelado');
});

app.get('/agendamentos', (req, res) => {
  res.json(agendamentos);
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  const open = await import('open');  // Import dinâmico
  open.default(`http://localhost:${PORT}`);
});
