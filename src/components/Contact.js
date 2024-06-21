import React from 'react';

const Contact = ({ handleSubmit }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(); // Chama a função passada por props para lidar com o envio do formulário
  };

  return (
    <div className="container">
      <h2>Informações de Contato</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Nome:</label>
        <input type="text" required />

        <label>Email:</label>
        <input type="email" required />

        <label>Telefone:</label>
        <input type="tel" required />

        <label>Forma de Pagamento:</label>
        <select required>
          <option value="cartao">Cartão de Crédito</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="pix">PIX</option>
        </select>

        <button type="submit">Confirmar Agendamento</button>
      </form>
    </div>
  );
};

export default Contact;