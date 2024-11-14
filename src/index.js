const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const open = require('open'); // Usando require para evitar problemas de importação

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Configuração da sessão, usando cookie seguro se estiver em HTTPS
app.use(session({
  secret: 'seuSegredo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Defina para 'true' se estiver usando HTTPS
}));

// Substituindo o bodyParser pelo método nativo do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const users = {
  'dona': {
    passwordHash: bcrypt.hashSync('senha', 10) // Senha hash
  }
};

let agendamentos = [];

// Middleware de autenticação
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Acesso negado');
  }
}

// Rota de login
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

// Rota de logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).send('Logout bem-sucedido');
  });
});

// Rota de agendamento
app.post('/agendar', (req, res) => {
  const { nome, telefone, horario, data } = req.body;

  // Validação dos dados do agendamento
  if (!nome || !telefone || !horario || !data) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  agendamentos.push({ nome, telefone, horario, data });
  res.send('Agendamento confirmado');
});

// Rota de cancelamento de agendamento
app.post('/cancelar', authMiddleware, (req, res) => {
  const { horario, data } = req.body;

  // Cancelando o agendamento
  agendamentos = agendamentos.filter(
    agendamento => agendamento.horario !== horario || agendamento.data !== data
  );
  res.send('Agendamento cancelado');
});

// Rota para obter os agendamentos
app.get('/agendamentos', (req, res) => {
  res.json(agendamentos);
});

// Inicia o servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

  // Abrir o navegador automaticamente
  try {
    await open(`http://localhost:${PORT}`);
  } catch (error) {
    console.error('Erro ao abrir o navegador:', error);
  }
});
