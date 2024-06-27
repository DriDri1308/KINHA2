document.addEventListener('DOMContentLoaded', function() {
    const nomeInput = document.getElementById('nome');
    const telefoneInput = document.getElementById('telefone');
    const horarioSelecionadoDiv = document.getElementById('horarioSelecionado');
    const horariosContainer = document.querySelector('.horarios-disponiveis');
    const confirmarBtn = document.getElementById('confirmarBtn');
    
    let horarioSelecionado = '';
  
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
        horariosContainer.appendChild(button);
  
        button.addEventListener('click', () => {
          horarioSelecionado = button.getAttribute('data-horario');
          horarioSelecionadoDiv.textContent = `Horário selecionado: ${horarioSelecionado}`;
  
          // Mostra os dias disponíveis a partir do dia atual até o final do mês vigente
          const diasDisponiveis = calcularDiasDisponiveis();
          horarioSelecionadoDiv.textContent += ` - Dias disponíveis: ${diasDisponiveis}`;
        });
      });
    }
  
    // Função para calcular os dias disponíveis no mês vigente
    function calcularDiasDisponiveis() {
      const now = new Date();
      const ultimoDiaMes = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const diasDisponiveis = [];
  
      for (let dia = now.getDate(); dia <= ultimoDiaMes; dia++) {
        diasDisponiveis.push(dia);
      }
  
      return diasDisponiveis.join(', ');
    }
  
    // Evento de clique no botão de confirmar
    confirmarBtn.addEventListener('click', function() {
      const nome = nomeInput.value.trim();
      const telefone = telefoneInput.value.trim();
      
      // Expressões regulares para validação
      const regexNome = /^[a-zA-ZÀ-ÿ\s']+$/; // Apenas letras, espaços e apóstrofos
      const regexTelefone = /^\d+$/; // Apenas dígitos (números)
      
      if (nome === '' || !regexNome.test(nome)) {
        alert('Por favor, insira um nome válido (apenas letras e espaços).');
        return;
      }
      
      if (telefone === '' || !regexTelefone.test(telefone)) {
        alert('Por favor, insira um telefone válido (apenas números).');
        return;
      }
      
      if (horarioSelecionado === '') {
        alert('Por favor, selecione um horário.');
        return;
      }
      
      // Exibe mensagem de confirmação ou realiza outras ações necessárias
      const mensagemConfirmacao = `Agendamento confirmado para ${horarioSelecionado}. Dias disponíveis: ${calcularDiasDisponiveis()}`;
      
      alert(mensagemConfirmacao);
    });
  
    // Inicializa a criação dos botões de horário ao carregar a página
    criarBotoesDeHorario();
  });