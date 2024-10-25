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
        mostrarHorariosDisponiveis(dataSelecionada);
      };
      datasDisponiveisContainer.appendChild(button);
    });

    datasDisponiveisContainer.style.display = 'block';
  });

  function mostrarHorariosDisponiveis(dataSelecionada) {
    const horariosDisponiveisContainer = document.getElementById('horariosDisponiveis');
    horariosDisponiveisContainer.innerHTML = '';

    const horariosReservados = JSON.parse(localStorage.getItem('reservas')) || {};
    const hoje = new Date();
    const dataSelecionadaObj = new Date(dataSelecionada);

    // Se a data selecionada for hoje, apenas horários a partir da hora atual estarão disponíveis
    const inicioHorario = (dataSelecionadaObj.toDateString() === hoje.toDateString()) ? hoje.getHours() : 8;
    const fimHorario = 18;

    for (let i = inicioHorario; i <= fimHorario; i++) {
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

  function getDatasDisponiveis() {
    const datas = [];
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    // Loop para criar datas do mês atual
    for (let dia = 1; dia <= 31; dia++) {
      const data = new Date(anoAtual, mesAtual, dia);
      // Verifica se a data é válida e se é do mês atual
      if (data.getMonth() === mesAtual && data >= hoje) {
        datas.push(data.toLocaleDateString('pt-BR'));
      }
    }
    return datas;
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

      // Alerta sobre a política de cancelamento
      if (confirm('Cancelamentos somente com 1 dia de antecedência, após esse período será cobrada taxa. Clique em OK para continuar.')) {
        const horariosReservados = JSON.parse(localStorage.getItem('reservas')) || {};
        if (!horariosReservados[dataSelecionada]) {
          horariosReservados[dataSelecionada] = [];
        }
        horariosReservados[dataSelecionada].push(horarioSelecionado);
        localStorage.setItem('reservas', JSON.stringify(horariosReservados));

        enviarMensagemWhatsApp(nome, telefone, servicosNomes, valorTotal, dataSelecionada, horarioSelecionado);
      }
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
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth();

  // Loop para criar datas do mês atual
  for (let dia = 1; dia <= 31; dia++) {
    const data = new Date(anoAtual, mesAtual, dia);
    // Verifica se a data é válida e se é do mês atual
    if (data.getMonth() === mesAtual && data >= hoje) {
      datas.push(data.toLocaleDateString('pt-BR'));
    }
  }
  return datas;
}
