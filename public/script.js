const servicos = [
  { id: 1, title: 'Manicure e Pedicure', price: 60.00 },
  { id: 2, title: 'Fibra de Vidro', price: 150.00 },
  { id: 3, title: 'Gel na Tips', price: 120.00 },
  { id: 4, title: 'Banho de Gel', price: 85.00 },
  { id: 5, title: 'Postiça Realista', price: 70.00 },
  { id: 6, title: 'Spa nos Pés', price: 80.00 }
];

const btnAgendamento = document.getElementById('btnAgendamento');

// Redireciona para a página de serviços
if (btnAgendamento) {
  btnAgendamento.addEventListener('click', () => {
    window.location.href = 'servicos.html';
  });
}

// Função para gerenciar o botão Admin
const adminBtn = document.getElementById('adminBtn');
if (adminBtn) {
  adminBtn.addEventListener('click', () => {
    alert('Apenas Érica tem acesso a esta função.');
    
    const senha = prompt('Digite a senha:');
    if (senha === '104211') {
      // Exibir os agendamentos e permitir a exclusão
      mostrarAgendamentos();
    } else {
      alert('Senha incorreta!');
    }
  });
}

// Função para mostrar agendamentos e permitir a exclusão
function mostrarAgendamentos() {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  
  if (agendamentos.length === 0) {
    alert('Não há agendamentos para mostrar.');
    return;
  }
  
  let mensagem = 'Agendamentos:\n';
  agendamentos.forEach((agendamento, index) => {
    mensagem += `${index + 1}: ${agendamento.data} - ${agendamento.horario}\n`;
  });

  const indexParaExcluir = prompt(`${mensagem}\nDigite o número do agendamento que deseja excluir:`) - 1;

  if (indexParaExcluir >= 0 && indexParaExcluir < agendamentos.length) {
    agendamentos.splice(indexParaExcluir, 1); // Remove o agendamento
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    alert('Agendamento excluído com sucesso!');
  } else {
    alert('Número inválido!');
  }
}

// Função para criar os botões de serviço
let servicosSelecionados = [];
let valorTotal = 0;

function criarBotoesDeServico() {
  const buttonContainer = document.querySelector('.button-container .button-grid');

  servicos.forEach(servico => {
    const button = document.createElement('button');
    button.classList.add('servico-button');
    button.dataset.value = servico.id;
    button.textContent = servico.title;
    buttonContainer.appendChild(button);

    button.addEventListener('click', () => {
      // Alterna a classe 'selecionado'
      button.classList.toggle('selecionado');

      // Adiciona ou remove o serviço da lista de selecionados
      const index = servicosSelecionados.findIndex(s => s.id === servico.id);
      if (button.classList.contains('selecionado')) {
        if (index === -1) servicosSelecionados.push(servico);
      } else {
        if (index !== -1) servicosSelecionados.splice(index, 1);
      }

      // Atualiza o valor total
      valorTotal = servicosSelecionados.reduce((total, servico) => total + servico.price, 0);

      // Limita a seleção a no máximo 3 serviços
      const servicosSelecionadosCount = document.querySelectorAll('.servico-button.selecionado');
      if (servicosSelecionadosCount.length > 3) {
        alert('Você só pode selecionar até três serviços.');
        button.classList.remove('selecionado');
        servicosSelecionados.pop(); // Remove o último serviço adicionado
        valorTotal = servicosSelecionados.reduce((total, servico) => total + servico.price, 0);
      }
    });
  });
}

// Executa ao carregar a página
window.onload = function() {
  criarBotoesDeServico();

  const btnConfirmar = document.getElementById('btnConfirmar');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
      const servicosSelecionadosCount = document.querySelectorAll('.servico-button.selecionado');
      if (servicosSelecionadosCount.length === 0) {
        alert('Selecione pelo menos um serviço.');
        return;
      }

      // Armazena os dados no localStorage
      const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
      const data = new Date().toLocaleDateString();
      const horario = '10:00'; // Você pode substituir isso pelo horário selecionado

      // Armazena o agendamento
      agendamentos.push({ data, horario });
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

      localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
      localStorage.setItem('valorTotal', valorTotal.toFixed(2));

      // Redireciona para a página de contato
      window.location.href = 'contato.html';
    });
  }
};
