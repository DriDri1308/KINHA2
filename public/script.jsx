document.addEventListener('DOMContentLoaded', function () {
  const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
  const valorTotal = localStorage.getItem('valorTotal') || '0.00';

  const nomeInput = document.getElementById('nome');
  const telefoneInput = document.getElementById('telefone');
  const detalhesAgendamentoDiv = document.getElementById('detalhesAgendamento');

  let horarioSelecionado = '';
  let dataSelecionada = '';

  const servicosNomes = servicosSelecionados.map(s => s.title).join(', ');
  detalhesAgendamentoDiv.textContent = `Serviço(s): ${servicosNomes}, Preço total: R$ ${valorTotal.replace('.', ',')}`;

  document.getElementById('mostrarDatasBtn').addEventListener('click', () => {
    const datasDisponiveisContainer = document.getElementById('datasDisponiveis');
    datasDisponiveisContainer.innerHTML = '';

    getDatasDisponiveis().forEach(data => {
      const button = document.createElement('button');
      button.className = 'data-button';
      button.textContent = data;
      button.onclick = () => {
        dataSelecionada = data;
        datasDisponiveisContainer.style.display = 'none';
        mostrarHorariosDisponiveis();
      };
      datasDisponiveisContainer.appendChild(button);
    });

    datasDisponiveisContainer.style.display = 'block';
  });

  function mostrarHorariosDisponiveis() {
    const horariosDisponiveisContainer = document.getElementById('horariosDisponiveis');
    horariosDisponiveisContainer.innerHTML = '';

    const horariosReservados = JSON.parse(localStorage.getItem('reservas')) || {};

    for (let i = 8; i <= 18; i++) {
      const horario = `${i}:00`;
      const jaReservado = horariosReservados[dataSelecionada]?.includes(horario);

      if (!jaReservado) {
        const button = document.createElement('button');
        button.className = 'horario-button';
        button.textContent = horario;
        button.onclick = () => {
          horarioSelecionado = horario;
          horariosDisponiveisContainer.style.display = 'none';
          detalhesAgendamentoDiv.textContent += `\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}`;
        };
        horariosDisponiveisContainer.appendChild(button);
      }
    }

    horariosDisponiveisContainer.style.display = 'block';
  }

  function enviarMensagemWhatsApp(nome, telefone, servicosNomes, valorTotal, dataSelecionada, horarioSelecionado) {
    const numeroWhatsApp = '5511912144127';
    const mensagem = `Olá! Um novo agendamento foi realizado.\n
Nome: ${nome}\n
Telefone: ${telefone}\n
Serviço(s): ${servicosNomes}\n
Preço Total: R$ ${valorTotal.replace('.', ',')}\n
Data: ${dataSelecionada}\n
Horário: ${horarioSelecionado}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  document.getElementById('confirmarBtn').addEventListener('click', () => {
    const nome = nomeInput.value;
    const telefone = telefoneInput.value;

    if (!dataSelecionada || !horarioSelecionado) {
      alert('Por favor, selecione uma data e um horário antes de confirmar.');
      return;
    }

    const mensagemConfirmacao = `Você selecionou:\nServiço(s): ${servicosNomes}\nPreço total: R$ ${valorTotal.replace('.', ',')}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}\n\nDeseja confirmar o agendamento?`;

    if (confirm(mensagemConfirmacao)) {
      alert(`Agendamento confirmado para ${dataSelecionada} às ${horarioSelecionado}.\nNome: ${nome}\nTelefone: ${telefone}`);

      const horariosReservados = JSON.parse(localStorage.getItem('reservas')) || {};
      if (!horariosReservados[dataSelecionada]) {
        horariosReservados[dataSelecionada] = [];
      }
      horariosReservados[dataSelecionada].push(horarioSelecionado);
      localStorage.setItem('reservas', JSON.stringify(horariosReservados));

      enviarMensagemWhatsApp(nome, telefone, servicosNomes, valorTotal, dataSelecionada, horarioSelecionado);
    } else {
      alert('Agendamento cancelado. Você pode corrigir as informações.');
    }
  });

  // Função para cancelar todos os agendamentos
  document.getElementById('cancelarTodosBtn').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja cancelar todos os agendamentos?')) {
      localStorage.removeItem('reservas');
      alert('Todos os agendamentos foram cancelados.');
    }
  });

  criarCalendario();
});

// Função para obter datas disponíveis
function getDatasDisponiveis() {
  const datas = [];
  const hoje = new Date();
  for (let i = 0; i < 30; i++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i);
    datas.push(data.toLocaleDateString('pt-BR'));
  }
  return datas;
}
