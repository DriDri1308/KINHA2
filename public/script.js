document.addEventListener('DOMContentLoaded', () => {
  const servicos = [
    { id: 1, title: 'Manicure e Pedicure', price: 63.00, img: 'assets/manicure e pedicure.jpg' },
    { id: 2, title: 'Pé com francesinha ou simples ', price: 38,  img: 'assets/gel na tips.png' },
    { id: 3, title: 'Gel na Tips', price: 120.00, img: 'assets/gel na tips.png' },
    { id: 4, title: 'Banho de Gel', price: 85.00, img: 'assets/banho de gel.png' },
    { id: 5, title: 'Postiça Realista', price: 70.00, img: 'assets/postiça realista.png' },
    { id: 6, title: 'Spa nos Pés', price: 80.00, img: 'assets/spar dos pes.jpg' }
  ];

  const btnAgendamento = document.getElementById('btnAgendamento');
  const btnAdmin = document.getElementById('adminBtn');
  let servicosSelecionados = [];
  let valorTotal = 0;

  function criarBotoesDeServico() {
    const buttonContainer = document.querySelector('.button-grid');
    buttonContainer.innerHTML = ''; // Limpa a grid para evitar duplicação

    servicos.forEach(servico => {
      const servicoItem = document.createElement('div');
      servicoItem.classList.add('servico-item');

      const img = document.createElement('img');
      img.src = servico.img;
      img.alt = servico.title;
      img.classList.add('servico-img');

      const button = document.createElement('button');
      button.classList.add('servico-button');
      button.dataset.value = servico.id;
      button.textContent = servico.title;

      const precoSpan = document.createElement('span');
      precoSpan.textContent = ` - R$ ${servico.price.toFixed(2)}`;
      precoSpan.style.marginLeft = '10px';
      precoSpan.style.color = 'white';

      button.appendChild(precoSpan);
      servicoItem.appendChild(img);
      servicoItem.appendChild(button);
      buttonContainer.appendChild(servicoItem);

      button.addEventListener('click', () => {
        button.classList.toggle('selecionado');
        const index = servicosSelecionados.findIndex(s => s.id === servico.id);

        if (button.classList.contains('selecionado')) {
          if (index === -1) servicosSelecionados.push(servico);
        } else {
          if (index !== -1) servicosSelecionados.splice(index, 1);
        }

        valorTotal = servicosSelecionados.reduce((total, s) => total + s.price, 0);

        if (servicosSelecionados.length > 3) {
          alert('Você só pode selecionar até três serviços.');
          button.classList.remove('selecionado');
          servicosSelecionados.pop();
          valorTotal = servicosSelecionados.reduce((total, s) => total + s.price, 0);
        }
      });
    });
  }

  if (btnAgendamento) {
    btnAgendamento.addEventListener('click', () => {
      window.location.href = 'servicos.html';
    });
  }

  const btnConfirmar = document.getElementById('btnConfirmar');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
      if (servicosSelecionados.length === 0) {
        alert('Selecione pelo menos um serviço.');
        return;
      }
      localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
      localStorage.setItem('valorTotal', valorTotal.toFixed(2));
      window.location.href = 'contato.html';
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

  criarBotoesDeServico();
});
