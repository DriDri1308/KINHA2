document.addEventListener('DOMContentLoaded', () => {
  const servicos = [
    { id: 1, title: 'Manicure e Pedicure', price: 63.00, img: 'assets/mp.jpg' },
    { id: 2, title: 'Pé com francesinha', price: 38.00, img: 'assets/francesinha.jpg' },
    { id: 3, title: 'Gel na Tips', price: 150.00, img: 'assets/tips.jpg' },
    { id: 4, title: 'Manutenção', price: 110.00, img: 'assets/tips.jpg' },
    { id: 5, title: 'Banho de Gel', price: 85.00, img: 'assets/gel.jpg' },
    { id: 6, title: 'Postiça Realista', price: 85.00, img: 'assets/realista.jpg' },
    { id: 7, title: 'Plástica dos Pés', price: 85.00, img: 'assets/pp.WEBP' }
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

// Aqui deve estar o código de contato.js ou contato.jsx

document.addEventListener('DOMContentLoaded', () => {
  const btnFinalizar = document.getElementById('btnFinalizar'); // Certifique-se de que o ID do botão de finalizar está correto.

  btnFinalizar.addEventListener('click', () => {
    const data = document.getElementById('inputData').value; // Substitua pelo ID do seu campo de data.
    const horario = document.getElementById('inputHorario').value; // Substitua pelo ID do seu campo de horário.

    // Verifique se os campos de data e horário estão preenchidos.
    if (!data || !horario) {
      alert('Por favor, preencha a data e o horário.');
      return;
    }

    // Recupera os serviços selecionados do localStorage.
    const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Cria um novo agendamento.
    const novoAgendamento = {
      data: data,
      horario: horario,
      servicos: servicosSelecionados,
    };

    // Adiciona o novo agendamento à lista de agendamentos.
    agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    alert('Agendamento realizado com sucesso!');
    window.location.href = 'index.html'; // Redireciona para a página inicial.
  });
});
