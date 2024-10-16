const servicos = [
  { id: 1, title: 'Manicure e Pedicure', price: 60.00 },
  { id: 2, title: 'Fibra de Vidro', price: 150.00 },
  { id: 3, title: 'Gel na Tips', price: 120.00 },
  { id: 4, title: 'Banho de Gel', price: 85.00 },
  { id: 5, title: 'Postiça Realista', price: 70.00 },
  { id: 6, title: 'Spa nos Pés', price: 80.00 }
];

// Redirecionamento ao clicar no botão de Agendamento
const btnAgendamento = document.getElementById('btnAgendamento');

if (btnAgendamento) {
  btnAgendamento.addEventListener('click', () => {
    window.location.href = 'servicos.html'; // Redireciona para a página de serviços
  });
}

// Variável para armazenar os serviços selecionados e seus preços
let servicosSelecionados = [];
let valorTotal = 0;

// Função para criar os botões de serviço
function criarBotoesDeServico() {
  const buttonContainer = document.querySelector('.button-container .button-grid');

  servicos.forEach(servico => {
    const button = document.createElement('button');
    button.classList.add('servico-button');
    button.dataset.value = servico.id;
    button.textContent = servico.title;
    buttonContainer.appendChild(button);

    button.addEventListener('click', () => {
      // Alterna a classe 'selecionado' ao clicar
      button.classList.toggle('selecionado');

      // Adiciona ou remove o serviço da lista de selecionados
      const index = servicosSelecionados.findIndex(s => s.id === servico.id);
      if (button.classList.contains('selecionado')) {
        if (index === -1) {
          servicosSelecionados.push(servico);
        }
      } else {
        if (index !== -1) {
          servicosSelecionados.splice(index, 1);
        }
      }

      // Atualiza o valor total
      valorTotal = servicosSelecionados.reduce((total, servico) => total + servico.price, 0);

      // Limita a seleção a no máximo 3 serviços
      const servicosSelecionadosCount = document.querySelectorAll('.servico-button.selecionado');
      if (servicosSelecionadosCount.length > 3) {
        alert('Você só pode selecionar até três serviços.');
        button.classList.remove('selecionado'); // Remove a seleção do botão que excedeu o limite
        servicosSelecionados.pop(); // Remove o último serviço adicionado
        valorTotal = servicosSelecionados.reduce((total, servico) => total + servico.price, 0); // Atualiza o valor total
      }
    });
  });
}

// Chamada para criar os botões de serviço ao carregar a página
window.onload = function() {
  criarBotoesDeServico();

  // Lógica para confirmar os serviços selecionados
  const btnConfirmar = document.getElementById('btnConfirmar');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
      const servicosSelecionadosCount = document.querySelectorAll('.servico-button.selecionado');
      if (servicosSelecionadosCount.length === 0) {
        alert('Selecione pelo menos um serviço.');
        return;
      }

      // Armazena os dados no localStorage
      localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
      localStorage.setItem('valorTotal', valorTotal.toFixed(2)); // Armazena o valor total como string

      // Redirecionamento para a página de contato
      window.location.href = 'contato.html';
    });
  }
};