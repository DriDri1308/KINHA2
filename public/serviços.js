document.addEventListener('DOMContentLoaded', () => {
  const serviços = [
    { id: 1, img: '/assets/mp.jpg', title: 'Manicure e Pedicure', price: 50.00, description: 'Cuidados completos para mãos e pés.' },
    { id: 2, img: '/assets/francesinha.jpg', title: 'Francesinha', price: 60.00, description: 'Estilo clássico e elegante para as unhas.' },
    { id: 3, img: '/assets/tips.jpg', title: 'Gel na Tips', price: 80.00, description: 'Unhas alongadas e naturais com gel na tips.' },
    { id: 4, img: '/assets/tips.jpg', title: 'Banho de Gel', price: 70.00, description: 'Reforço de unhas naturais com gel para maior durabilidade.' },
    { id: 5, img: '/assets/gel.jpg', title: 'Fibra de Vidro', price: 100.00, description: 'Unhas de fibra para um visual natural e duradouro.' },
    { id: 6, img: '/assets/realista.jpg', title: 'Postiça Realista', price: 90.00, description: 'Unhas postiças com aspecto realista.' },
    { id: 7, img: '/assets/pp.WEBP', title: 'Spa nos Pés', price: 65.00, description: 'Tratamento relaxante e cuidados especiais para os pés.' },
  ];

  let serviçosSelecionados = [];
  let valorTotal = 0;

  function criarBotoesDeServico() {
    const buttonContainer = document.querySelector('.button-grid');
    buttonContainer.innerHTML = ''; // Limpa a grid para evitar duplicação

    serviços.forEach(serviço => {
      const servicoItem = document.createElement('div');
      servicoItem.classList.add('servico-item');

      const img = document.createElement('img');
      img.src = serviço.img;
      img.alt = serviço.title;
      img.classList.add('servico-img');

      const content = document.createElement('div');
      content.classList.add('servico-content');

      const title = document.createElement('h3');
      title.classList.add('servico-title');
      title.textContent = serviço.title;

      const price = document.createElement('span');
      price.classList.add('servico-price');
      price.textContent = `R$ ${serviço.price.toFixed(2)}`;

      const description = document.createElement('p');
      description.classList.add('servico-description');
      description.textContent = serviço.description;

      const button = document.createElement('button');
      button.classList.add('servico-button');
      button.dataset.value = serviço.id;
      button.textContent = 'Selecionar';

      content.appendChild(title);
      content.appendChild(price);
      content.appendChild(description);

      servicoItem.appendChild(img);
      servicoItem.appendChild(content);
      servicoItem.appendChild(button);

      buttonContainer.appendChild(servicoItem);

      button.addEventListener('click', () => {
        button.classList.toggle('selecionado');
        const index = serviçosSelecionados.findIndex(s => s.id === serviço.id);

        if (button.classList.contains('selecionado')) {
          if (index === -1) serviçosSelecionados.push(serviço);
        } else {
          if (index !== -1) serviçosSelecionados.splice(index, 1);
        }

        valorTotal = serviçosSelecionados.reduce((total, s) => total + s.price, 0);

        if (serviçosSelecionados.length > 3) {
          alert('Você só pode selecionar até três serviços.');
          button.classList.remove('selecionado');
          serviçosSelecionados.pop();
          valorTotal = serviçosSelecionados.reduce((total, s) => total + s.price, 0);
        }
      });
    });
  }

  const btnConfirmar = document.getElementById('btnConfirmar');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
      if (serviçosSelecionados.length === 0) {
        alert('Selecione pelo menos um serviço.');
        return;
      }
      localStorage.setItem('serviçosSelecionados', JSON.stringify(serviçosSelecionados));
      alert(`Serviços selecionados:\n${serviçosSelecionados.map(s => s.title).join('\n')}\nTotal: R$ ${valorTotal.toFixed(2)}`);
    });
  }

  criarBotoesDeServico();
});

