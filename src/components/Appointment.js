import React, { useState } from 'react';

const Appointment = ({ handleBackStep, handleNextStep }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor, selecione uma data e hora antes de confirmar.');
      return;
    }

    // Lógica para confirmar o agendamento (exemplo: enviar para um servidor)
    // Aqui estamos apenas mostrando um alerta com os dados selecionados
    alert(`Agendamento confirmado para ${selectedDate} às ${selectedTime}`);
    handleNextStep();
  };

  // Simulação de datas e horários disponíveis
  const availableDates = ['2024-07-01', '2024-07-02', '2024-07-03'];
  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00'];

  return (
    <div>
      <h2>Agendamento</h2>
      <button onClick={handleBackStep}>Voltar para Serviços</button>
      <h3>Escolha a Data:</h3>
      <ul>
        {availableDates.map((date, index) => (
          <li key={index}>
            <button onClick={() => handleDateSelect(date)}>{date}</button>
          </li>
        ))}
      </ul>
      {selectedDate && (
        <>
          <h3>Escolha a Hora:</h3>
          <ul>
            {availableTimes.map((time, index) => (
              <li key={index}>
                <button onClick={() => handleTimeSelect(time)}>{time}</button>
              </li>
            ))}
          </ul>
          {selectedTime && (
            <button onClick={handleConfirm}>Confirmar Agendamento</button>
          )}
        </>
      )}
    </div>
  );
};

export default Appointment;