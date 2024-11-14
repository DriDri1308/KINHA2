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
  const datasDisponiveisContainer = document.getElementById('datasDisponiveis');
  const horariosDisponiveisContainer = document.getElementById('horariosDisponiveis');

  const servicosNomes = servicosSelecionados.map(s => s.title).join(', ');
  detalhesAgendamentoDiv.textContent = `Serviço(s): ${servicosNomes}, Preço total: R$ ${valorTotal.replace('.', ',')}`;

  confirmarBtn.disabled = true;
  telefoneInput.disabled = true;
  mostrarDatasBtn.disabled = true;

  const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

  function validarFormulario() {
    const nomeValido = nomeInput.value.trim() !== '';
    const telefoneValido = regexTelefone.test(telefoneInput.value.trim());
    const dataValida = !!dataSelecionada;
    const horarioValido = !!horarioSelecionado;

    telefoneInput.disabled = !nomeValido;
    mostrarDatasBtn.disabled = !telefoneValido;

    if (!telefoneValido && telefoneInput.value.trim() !== '') {
      telefoneInput.setCustomValidity('Por favor, insira um número de telefone válido.');
    } else {
      telefoneInput.setCustomValidity('');
    }

    confirmarBtn.disabled = !(nomeValido && telefoneValido && dataValida && horarioValido);
  }

  nomeInput.addEventListener('input', validarFormulario);
  telefoneInput.addEventListener('input', validarFormulario);

  mostrarDatasBtn.addEventListener('click', () => {
    datasDisponiveisContainer.innerHTML = '';
    datasDisponiveisContainer.style.display = 'flex';

    const datas = getDatasDisponiveis();

    datas.slice(0, 5).forEach((data) => {
      const button = document.createElement('button');
      button.className = 'data-button';
      const [diaSemana, diaMes] = formatarData(data);

      button.innerHTML = `
        <div>${diaMes}</div>
        <div>${diaSemana}</div>
      `;

      button.onclick = () => {
        dataSelecionada = data;
        datasDisponiveisContainer.style.display = 'none';
        mostrarHorariosDisponiveis(data);
        validarFormulario();
      };

      datasDisponiveisContainer.appendChild(button);
    });
  });

  function getDatasDisponiveis() {
    const hoje = new Date();
    const datas = [];

    for (let i = 0; i < 30; i++) {
      const data = new Date();
      data.setDate(hoje.getDate() + i);

      const diaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

      // Ignorar domingo (0) e segunda-feira (1)
      if (diaSemana !== 0 && diaSemana !== 1) {
        datas.push(data.toISOString().split('T')[0]);
      }
    }

    return datas;
  }

  function formatarData(data) {
    const dataObj = new Date(data);
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const diaSemana = diasSemana[dataObj.getDay()];
    const diaMes = dataObj.getDate();
    return [diaSemana, diaMes];
  }

  function mostrarHorariosDisponiveis(data) {
    horariosDisponiveisContainer.innerHTML = '';
    horariosDisponiveisContainer.style.display = 'block';

    const horarios = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

    horarios.forEach((horario) => {
      const button = document.createElement('button');
      button.className = 'horario-button';
      button.textContent = horario;

      button.onclick = () => {
        horarioSelecionado = horario;
        horariosDisponiveisContainer.style.display = 'none';
        detalhesAgendamentoDiv.textContent = `Data: ${data}\nHorário: ${horario}`;
        validarFormulario();
      };

      horariosDisponiveisContainer.appendChild(button);
    });
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

  function enviarMensagemWhatsApp(nome, telefone) {
    const numeroWhatsApp = '5511912144127';
    const mensagem = `Novo agendamento:\nNome: ${nome}\nTelefone: ${telefone}\nServiço(s): ${servicosNomes}\nPreço: R$ ${valorTotal.replace('.', ',')}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }
});
