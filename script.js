// Definição dos serviços disponíveis
const servicos = [
  { id: 1, title: 'Manicure e Pedicure', description: 'Cutícula, esmaltação comum, pedraria, desenho a mão livre, unhas naturais ou alongadas, francesinha.', price: 60.00 },
  { id: 2, title: 'Fibra de Vidro', description: 'É resistente a batida (impacto), durabilidade, aspecto natural, indicado para alongar suas unhas naturais.', price: 150.00 },
  { id: 3, title: 'Gel na Tips', description: 'Unhas mais delicadas, usa extensor para alongar suas unhas (tips), unhas quadradas, almond.', price: 120.00 },
  { id: 4, title: 'Banho de Gel', description: 'Não usa extensor, alonga na sua própria unha, tem durabilidade na sua esmaltação, indicado para unhas roídas, indicado para quem tem unhas grandes a médias, fortalece suas unhas naturais.', price: 85.00 },
  { id: 5, title: 'Postiça Realista', description: 'Durabilidade de 15 dias, não tem manutenção, efeito realista, sem uso de gel, não indicado para produtos químicos.', price: 70.00 },
  { id: 6, title: 'Spa nos Pés', description: 'Pés hidratados, cutículas inclusas, aspectos macios, lixamento manual.', price: 80.00 }
];

// Redirecionamento ao clicar no botão de Agendamento
const btnAgendamento = document.getElementById('btnAgendamento');

if (btnAgendamento) {
  btnAgendamento.addEventListener('click', () => {
    window.location.href = 'servicos.html'; // Redireciona para a página de serviços
  });
}

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
      const servicoSelecionado = document.querySelector(`#servico-${servico.id}`);
      if (servicoSelecionado) return; // Evita adicionar o mesmo serviço mais de uma vez

      // Verifica quantos serviços já estão na cesta
      const servicosSelecionados = document.querySelectorAll('.servico-selecionado');
      if (servicosSelecionados.length >= 3) {
        alert('Você só pode selecionar até três serviços.');
        return;
      }

      // Cria um item na cesta para o serviço selecionado
      const servicoItem = document.createElement('li');
      servicoItem.id = `servico-${servico.id}`;
      servicoItem.classList.add('servico-selecionado');
      servicoItem.innerHTML = `
        <span>${servico.title}</span>
        <span class="descricao">${servico.description}</span>
        <span class="preco">Valor: R$ ${servico.price.toFixed(2)}</span>
        <button class="remover">Remover</button>
      `;
      
      const listaServicosSelecionados = document.getElementById('servicos-selecionados');
      listaServicosSelecionados.appendChild(servicoItem);

      // Adiciona evento para remover o serviço da cesta
      const btnRemover = servicoItem.querySelector('.remover');
      btnRemover.addEventListener('click', () => {
        servicoItem.remove();
        button.classList.remove('selecionado');
      });
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
      const servicosSelecionados = document.querySelectorAll('.servico-selecionado');
      if (servicosSelecionados.length === 0) {
        alert('Selecione pelo menos um serviço.');
        return;
      }

      // Redirecionamento para a página de contato após selecionar os serviços
      window.location.href = 'contato.html'; // Exemplo de redirecionamento para a página de contato
    });
  }
};