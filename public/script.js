document.addEventListener('DOMContentLoaded', () => {
  const servicos = [
    { id: 1, title: 'Manicure e Pedicure', price: 60.00,img: 'assets/manicure e pedicure.jpg' },
    { id: 2, title: 'Fibra de Vidro', price: 150.00, img: 'assets/fibra de vidro.jpg' },
    { id: 3, title: 'Gel na Tips', price: 120.00, img: 'assets/gel na tips.png' },
    { id: 4, title: 'Banho de Gel', price: 85.00, img: 'assets/banho de gel.png' },
    { id: 5, title: 'Postiça Realista', price: 70.00, img: 'assets/postiça realista.png' },
    { id: 6, title: 'Spa nos Pés', price: 80.00, img: 'assets/spar dos pes.jpg' }
  ];

  const btnAgendamento = document.getElementById('btnAgendamento');

  if (btnAgendamento) {
    btnAgendamento.addEventListener('click', () => {
      window.location.href = 'servicos.html';
    });
  }

  let servicosSelecionados = [];
  let valorTotal = 0;

  function criarBotoesDeServico() {
    const buttonContainer = document.querySelector('.button-grid');

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

  criarBotoesDeServico();
});
