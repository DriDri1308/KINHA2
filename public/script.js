document.addEventListener('DOMContentLoaded', () => {
  const btnAgendamento = document.getElementById('btnAgendamento');
  const btnAdmin = document.getElementById('adminBtn');

  if (btnAgendamento) {
    btnAgendamento.addEventListener('click', () => {
      window.location.href = 'serviços.html'; // Navegar para a página de serviços
    });
  }

  if (btnAdmin) {
    btnAdmin.addEventListener('click', () => {
      const senha = prompt('Digite a senha de administrador:');
      if (senha === '104211') {
        mostrarAgendamentos();
      } else {
        alert('Senha incorreta!');
      }
    });
  }

  function mostrarAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    if (agendamentos.length === 0) {
      alert('Não há agendamentos registrados.');
      return;
    }

    let listaAgendamentos = 'Agendamentos:\n';
    agendamentos.forEach((agendamento, index) => {
      listaAgendamentos += `${index + 1}. ${agendamento.data} - ${agendamento.horario}\n`;
    });

    const cancelar = confirm(`${listaAgendamentos}\nDeseja cancelar algum agendamento?`);
    if (cancelar) {
      const indice = parseInt(prompt('Digite o número do agendamento que deseja cancelar:')) - 1;
      if (indice >= 0 && indice < agendamentos.length) {
        agendamentos.splice(indice, 1);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        alert('Agendamento cancelado com sucesso!');
      } else {
        alert('Número inválido.');
      }
    }
  }
});
