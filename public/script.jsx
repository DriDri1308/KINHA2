document.addEventListener('DOMContentLoaded', function () {
  const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
  const valorTotal = localStorage.getItem('valorTotal') || '0.00';
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  const reservas = JSON.parse(localStorage.getItem('reservas')) || {};

  let dataSelecionada = '';
  let horarioSelecionado = '';

  const nomeInput = document.getElementById('nome');
  const telefoneInput = document.getElementById('telefone');
  const detalhesAgendamentoDiv = document.getElementById('detalhesAgendamento');
  const confirmarBtn = document.getElementById('confirmarBtn');
  const mostrarDatasBtn = document.getElementById('mostrarDatasBtn');

  const servicosNomes = servicosSelecionados.map(s => s.title).join(', ');
  detalhesAgendamentoDiv.textContent = `Serviço(s): ${servicosNomes}, Preço total: R$ ${valorTotal.replace('.', ',')}`;

  confirmarBtn.disabled = true;

  const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

  function validarFormulario() {
    confirmarBtn.disabled = !(nomeInput.value.trim() &&
      regexTelefone.test(telefoneInput.value.trim()) &&
      dataSelecionada && horarioSelecionado);
  }

  nomeInput.addEventListener('input', validarFormulario);
  telefoneInput.addEventListener('input', validarFormulario);

  mostrarDatasBtn.addEventListener('click', () => {
    if (!regexTelefone.test(telefoneInput.value.trim())) {
      alert('Por favor, insira um telefone válido.');
      return;
    }

    const datasDisponiveisContainer = document.getElementById('datasDisponiveis');
    datasDisponiveisContainer.innerHTML = '';

    getDatasDisponiveis().forEach(data => {
      if (verificarHorariosDisponiveis(data)) {
        const button = document.createElement('button');
        button.className = 'data-button';
        button.textContent = data;
        button.onclick = () => {
          dataSelecionada = data;
          datasDisponiveisContainer.style.display = 'none';
          mostrarHorariosDisponiveis(data);
        };
        datasDisponiveisContainer.appendChild(button);
      }
    });

    datasDisponiveisContainer.style.display = 'block';
  });

  function mostrarHorariosDisponiveis(data) {
    const horariosDisponiveisContainer = document.getElementById('horariosDisponiveis');
    horariosDisponiveisContainer.innerHTML = '';

    const hoje = new Date();
    const dataObj = new Date(data);
    // Aqui está a correção para a exibição de horários futuros no mesmo dia
    const inicioHorario = dataObj.toDateString() === hoje.toDateString() ? hoje.getHours() + 1 : 8;
    const fimHorario = 18;

    for (let i = inicioHorario; i <= fimHorario; i++) {
      const horario = `${i}:00`;
      const jaReservado = reservas[data]?.includes(horario);

      if (!jaReservado) {
        const button = document.createElement('button');
        button.className = 'horario-button';
        button.textContent = horario;
        button.onclick = () => {
          horarioSelecionado = horario;
          mostrarDetalhesAgendamento(data, horario);
        };
        horariosDisponiveisContainer.appendChild(button);
      }
    }

    horariosDisponiveisContainer.style.display = 'block';
  }

  function verificarHorariosDisponiveis(data) {
    const horarios = reservas[data] || [];
    return horarios.length < 11; // 11 horários possíveis (8:00 - 18:00)
  }

  function mostrarDetalhesAgendamento(data, horario) {
    detalhesAgendamentoDiv.textContent = `Data: ${data}\nHorário: ${horario}`;
    validarFormulario();
  }

  confirmarBtn.addEventListener('click', () => {
    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();

    const mensagemConfirmacao = `Você selecionou:\nServiço(s): ${servicosNomes}\nPreço total: R$ ${valorTotal.replace('.', ',')}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}\n\nDeseja confirmar o agendamento?`;

    if (confirm(mensagemConfirmacao)) {
      alert(`Agendamento confirmado!\nNome: ${nome}\nTelefone: ${telefone}`);
      salvarAgendamento(nome, telefone, dataSelecionada, horarioSelecionado);
      enviarMensagemWhatsApp(nome, telefone);
      setTimeout(() => (window.location.href = 'index.html'), 1000);
    }
  });

  function salvarAgendamento(nome, telefone, data, horario) {
    agendamentos.push({ nome, telefone, data, horario });
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    if (!reservas[data]) reservas[data] = [];
    reservas[data].push(horario);
    localStorage.setItem('reservas', JSON.stringify(reservas));
  }

  function getDatasDisponiveis() {
    const datas = [];
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    for (let dia = 1; dia <= 31; dia++) {
      const data = new Date(anoAtual, mesAtual, dia);
      if (data.getMonth() === mesAtual && data >= hoje) {
        datas.push(data.toLocaleDateString('pt-BR'));
      }
    }
    return datas;
  }

  function enviarMensagemWhatsApp(nome, telefone) {
    const numeroWhatsApp = '5511912144127';
    const mensagem = `Novo agendamento:\nNome: ${nome}\nTelefone: ${telefone}\nServiço(s): ${servicosNomes}\nPreço: R$ ${valorTotal.replace('.', ',')}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  // Função para cancelar agendamento
  function cancelarAgendamento(nome, telefone, data, horario) {
    // Remove o agendamento da lista de agendamentos
    const index = agendamentos.findIndex(agendamento => 
      agendamento.nome === nome && 
      agendamento.telefone === telefone && 
      agendamento.data === data && 
      agendamento.horario === horario
    );

    if (index !== -1) {
      agendamentos.splice(index, 1);
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

      // Aqui está a correção para a disponibilidade de horários após cancelamento
      reservas[data] = reservas[data].filter(h => h !== horario);
      localStorage.setItem('reservas', JSON.stringify(reservas));

      // Atualiza os horários disponíveis
      mostrarHorariosDisponiveis(data);
      alert('Agendamento cancelado com sucesso!');
    } else {
      alert('Agendamento não encontrado.');
    }
  }

  // Supondo que haja um botão para cancelar o agendamento
  const cancelarBtn = document.getElementById('cancelarBtn');
  cancelarBtn.addEventListener('click', () => {
    const nome = prompt('Digite seu nome para confirmar o cancelamento:');
    const telefone = prompt('Digite seu telefone:');
    const data = prompt('Digite a data do agendamento (dd/mm/yyyy):');
    const horario = prompt('Digite o horário do agendamento (ex: 10:00):');

    if (nome && telefone && data && horario) {
      cancelarAgendamento(nome, telefone, data, horario);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
});

