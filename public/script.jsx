document.addEventListener('DOMContentLoaded', function () {
  const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
  const valorTotal = localStorage.getItem('valorTotal') || '0.00'; // Valor total padrão

  const nomeInput = document.getElementById('nome');
  const telefoneInput = document.getElementById('telefone');
  const detalhesAgendamentoDiv = document.getElementById('detalhesAgendamento');

  let horarioSelecionado = '';
  let dataSelecionada = '';

  // Exibe os detalhes do agendamento
  const servicosNomes = servicosSelecionados.map(s => s.title).join(', ');
  detalhesAgendamentoDiv.textContent = `Serviço(s): ${servicosNomes}, Preço total: R$ ${valorTotal.replace('.', ',')}`;

  // Lógica para mostrar as datas disponíveis
  document.getElementById('mostrarDatasBtn').addEventListener('click', () => {
    const datasDisponiveisContainer = document.getElementById('datasDisponiveis');
    const horariosDisponiveisContainer = document.getElementById('horariosDisponiveis');

    // Exibe datas como botões
    const datas = getDatasDisponiveis(); // Função para obter as datas disponíveis
    datasDisponiveisContainer.innerHTML = ''; // Limpa as datas anteriores

    datas.forEach(data => {
      const button = document.createElement('button');
      button.className = 'data-button';
      button.textContent = data;
      button.onclick = () => {
        dataSelecionada = data; // Armazena a data selecionada
        datasDisponiveisContainer.style.display = 'none'; // Oculta as datas disponíveis
        mostrarHorariosDisponiveis(); // Chama função para mostrar horários
      };
      datasDisponiveisContainer.appendChild(button);
    });

    datasDisponiveisContainer.style.display = 'block'; // Mostra as datas disponíveis
  });

  // Função para mostrar horários disponíveis
  function mostrarHorariosDisponiveis() {
    const horariosDisponiveisContainer = document.getElementById('horariosDisponiveis');
    horariosDisponiveisContainer.innerHTML = ''; // Limpa horários anteriores

    for (let i = 8; i <= 18; i++) { // Horários de 8h às 18h
      const button = document.createElement('button');
      button.className = 'horario-button';
      button.textContent = `${i}:00`;
      button.onclick = () => {
        horarioSelecionado = `${i}:00`; // Armazena o horário selecionado
        horariosDisponiveisContainer.style.display = 'none'; // Oculta horários disponíveis

        // Atualiza a mensagem de detalhes do agendamento
        detalhesAgendamentoDiv.textContent += `\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}`;
      };
      horariosDisponiveisContainer.appendChild(button);
    }

    horariosDisponiveisContainer.style.display = 'block'; // Mostra os horários disponíveis
  }

  // Função para enviar mensagem ao WhatsApp
  function enviarMensagemWhatsApp(nome, telefone, servicosNomes, valorTotal, dataSelecionada, horarioSelecionado) {
    const numeroWhatsApp = '5511912144127'; // Sem espaços ou símbolos
    const mensagem = `Olá! Um novo agendamento foi realizado:%0A
Nome: ${nome}%0A
Telefone: ${telefone}%0A
Serviços: ${servicosNomes}%0A
Preço Total: R$ ${valorTotal}%0A
Data: ${dataSelecionada}%0A
Horário: ${horarioSelecionado}`;

    // Link para abrir o WhatsApp com a mensagem formatada
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank'); // Abre o WhatsApp em uma nova aba
  }

  // Lógica de confirmação do agendamento
  document.getElementById('confirmarBtn').addEventListener('click', () => {
    const nome = nomeInput.value;
    const telefone = telefoneInput.value;

    if (!dataSelecionada || !horarioSelecionado) {
      alert('Por favor, selecione uma data e um horário antes de confirmar.');
      return;
    }

    // Mensagem de confirmação
    const mensagemConfirmacao = `Você selecionou:\nServiço(s): ${servicosNomes}\nPreço total: R$ ${valorTotal.replace('.', ',')}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}\n\nDeseja confirmar o agendamento?`;

    const confirmacao = confirm(mensagemConfirmacao);
    if (confirmacao) {
      alert(`Agendamento confirmado para ${dataSelecionada} com horário ${horarioSelecionado}.\nNome: ${nome}\nTelefone: ${telefone}`);

      // Enviar mensagem para o WhatsApp
      enviarMensagemWhatsApp(nome, telefone, servicosNomes, valorTotal, dataSelecionada, horarioSelecionado);
    } else {
      alert('Agendamento cancelado. Você pode corrigir as informações.');
    }
  });

  // Inicializa o calendário e as funcionalidades de data
  criarCalendario();
});

// Função para obter datas disponíveis
function getDatasDisponiveis() {
  const datas = [];
  const hoje = new Date();
  for (let i = 0; i < 30; i++) { // Pronto para o próximo mês
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i);
    datas.push(data.toLocaleDateString('pt-BR')); // Formata a data
  }
  return datas;
}
