document.addEventListener('DOMContentLoaded', function() {
    const nomeInput = document.getElementById('nome');
    const telefoneInput = document.getElementById('telefone');
    const horarioSelecionadoDiv = document.getElementById('horarioSelecionado');
    const datasDisponiveisContainer = document.getElementById('datasDisponiveis');
    const horariosDisponiveisContainer = document.getElementById('horariosDisponiveis');
    const confirmarBtn = document.getElementById('confirmarBtn');
    const detalhesAgendamentoDiv = document.getElementById('detalhesAgendamento');
  
    let horarioSelecionado = '';
    let dataSelecionada = '';
    let nome = '';
    let telefone = '';
  
    // Lista de horários disponíveis de 2 em 2 horas (8:00 às 16:00)
    const horariosDisponiveis = [
      '08:00', '10:00', '12:00', '14:00', '16:00'
    ];
  
    // Função para criar os botões de horários disponíveis
    function criarBotoesDeHorario() {
      horariosDisponiveis.forEach(horario => {
        const button = document.createElement('button');
        button.classList.add('btn-padrao', 'horario-button');
        button.textContent = horario;
        button.setAttribute('data-horario', horario);
        horariosDisponiveisContainer.appendChild(button);
  
        button.addEventListener('click', () => {
          if (!nome || !telefone || !dataSelecionada) {
            alert('Por favor, digite o nome, telefone e escolha uma data antes de selecionar um horário.');
            return;
          }
  
          // Remove a classe de seleção de todos os botões de horário
          const horarios = document.querySelectorAll('.horario-button');
          horarios.forEach(horario => horario.classList.remove('selecionado'));
  
          // Adiciona a classe de seleção ao botão clicado
          horarioSelecionado = button.getAttribute('data-horario');
          horarioSelecionadoDiv.textContent = `Horário selecionado: ${horarioSelecionado}`;
          button.classList.add('selecionado');
        });
      });
    }
  
    // Função para calcular os dias disponíveis no mês vigente a partir do dia atual
    function calcularDiasDisponiveis() {
      const now = new Date();
      const ultimoDiaMes = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const diasDisponiveis = [];
  
      for (let dia = now.getDate(); dia <= ultimoDiaMes; dia++) {
        diasDisponiveis.push(dia);
      }
  
      return diasDisponiveis;
    }
  
    // Função para mostrar as datas disponíveis na tela
    function mostrarDatasDisponiveis() {
      const diasDisponiveis = calcularDiasDisponiveis();
  
      diasDisponiveis.forEach(dia => {
        const button = document.createElement('button');
        button.classList.add('btn-padrao', 'data-button');
        button.textContent = dia;
        button.addEventListener('click', () => {
          dataSelecionada = dia;
  
          // Remove a classe de seleção de todos os botões de data
          const datas = document.querySelectorAll('.data-button');
          datas.forEach(data => data.classList.remove('selecionado'));
  
          // Adiciona a classe de seleção ao botão clicado
          detalhesAgendamentoDiv.textContent = `Nome: ${nome}, Telefone: ${telefone}, Horário: ${horarioSelecionado}, Data: ${dataSelecionada}`;
          button.classList.add('selecionado');
          // Após selecionar a data, mostrar os horários disponíveis
          horariosDisponiveisContainer.style.display = 'flex'; // Mostra a div dos horários disponíveis
        });
        datasDisponiveisContainer.appendChild(button);
      });
    }
  
    // Evento de clique no botão de confirmar
    confirmarBtn.addEventListener('click', function() {
      if (!nome || !telefone || !horarioSelecionado || !dataSelecionada) {
        alert('Por favor, preencha todos os campos antes de confirmar o agendamento.');
        return;
      }
  
      // Verifica se o telefone possui pelo menos 8 dígitos (simplificação de validação)
      if (telefone.length < 8) {
        alert('Por favor, digite um telefone válido.');
        return;
      }
  
      // Verifica se o nome contém apenas letras (simplificação de validação)
      if (!/^[a-zA-ZÀ-ú\s]+$/.test(nome)) {
        alert('Por favor, digite um nome válido (sem números).');
        return;
      }
  
      // Simula uma ação de confirmação, aqui você poderia realizar uma requisição para um backend, por exemplo
      const valorServico = calcularValorServico(); // Função fictícia para calcular o valor do serviço
  
      // Exibe mensagem com os detalhes do agendamento
      const mensagemConfirmacao = `
          Agendamento confirmado:
          Nome: ${nome}
          Telefone: ${telefone}
          Horário: ${horarioSelecionado}
          Data: ${dataSelecionada}
          Valor do serviço: R$ ${valorServico.toFixed(2)}
      `;
      alert(mensagemConfirmacao);
  
      // Esconder a div dos horários disponíveis após confirmar
      horariosDisponiveisContainer.style.display = 'none';
  
      // Envia os detalhes do agendamento via WhatsApp (simulação)
      const urlWhatsApp = `https://api.whatsapp.com/send?phone=SEU_NUMERO_TELEFONE&text=${encodeURIComponent(mensagemConfirmacao)}`;
      window.open(urlWhatsApp, '_blank');
    });
  
    // Evento para capturar a entrada do nome
    nomeInput.addEventListener('input', function() {
      nome = nomeInput.value.trim();
    });
  
    // Evento para capturar a entrada do telefone
    telefoneInput.addEventListener('input', function() {
      telefone = telefoneInput.value.trim();
    });
  
    // Inicializa a criação dos botões de horário ao carregar a página
    criarBotoesDeHorario();
    // Mostrar as datas disponíveis ao carregar a página
    mostrarDatasDisponiveis();
  
    // Função fictícia para calcular o valor do serviço (pode ser ajustada conforme necessidade)
    function calcularValorServico() {
      // Aqui poderia haver uma lógica para calcular o valor do serviço com base no horário escolhido, por exemplo
      return 100; // Valor fictício para demonstração
    }
  });