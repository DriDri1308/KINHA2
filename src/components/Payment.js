import React, { useState } from 'react';

const Payment = ({ selectedServices }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);

  const handleConfirm = () => {
    if (!clientName || !clientPhone || !appointmentDate || !appointmentTime || !paymentMethod) {
      alert('Por favor, preencha todos os campos antes de confirmar o agendamento.');
      return;
    }

    const message = `
      Agendamento confirmado:
      Nome: ${clientName}
      Telefone: ${clientPhone}
      Data: ${appointmentDate}
      Hora: ${appointmentTime}
      Forma de Pagamento: ${paymentMethod}
      Serviços: ${selectedServices.map(service => service.title).join(', ')}
      Total: R$ ${total.toFixed(2)}
    `;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=55119121441127&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    alert('Obrigado pela escolha e até breve!');
  };

  return (
    <div className="container">
      <h2>Pagamento</h2>
      <ul>
        {selectedServices.map(service => (
          <li key={service.id}>
            <h3>{service.title}</h3>
            <p>Valor: R$ {service.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <p><strong>Total: R$ {total.toFixed(2)}</strong></p>
      <div>
        <label>
          Nome:
          <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Telefone:
          <input type="text" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Data do Agendamento:
          <input type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Hora do Agendamento:
          <input type="time" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Forma de Pagamento:
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option value="">Selecione</option>
            <option value="Pix">Pix</option>
            <option value="Cartão">Cartão</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </label>
      </div>
      <button onClick={handleConfirm}>Confirmar Agendamento</button>
    </div>
  );
};

export default Payment;