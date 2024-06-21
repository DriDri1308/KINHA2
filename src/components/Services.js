import React, { useState } from 'react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: 1, title: 'Manicure e Pedicure', description: 'Cutícula, esmaltação comum, pedraria, desenho a mão livre, unhas naturais ou alongadas, francesinha.', price: 60.00 },
    { id: 2, title: 'Fibra de Vidro', description: 'É resistente a batida (impacto), durabilidade, aspecto natural, indicado para alongar suas unhas naturais.', price: 150.00 },
    { id: 3, title: 'Gel na Tips', description: 'Unhas mais delicadas, usa extensor para alongar suas unhas (tips), unhas quadradas, almond.', price: 120.00 },
    { id: 4, title: 'Banho de Gel', description: 'Não usa extensor, alonga na sua própria unha, tem durabilidade na sua esmaltação, indicado para unhas roídas, indicado para quem tem unhas grandes a médias, fortalece suas unhas naturais.', price: 85.00 },
    { id: 5, title: 'Postiça Realista', description: 'Durabilidade de 15 dias, não tem manutenção, efeito realista, sem uso de gel, não indicado para produtos químicos.', price: 70.00 },
    { id: 6, title: 'Spa nos Pés', description: 'Pés hidratados, cutículas inclusas, aspectos macios, lixamento manual.', price: 80.00 }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="container">
      <h2>Serviços Prestados</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <input
              type="radio"
              id={`service-${service.id}`}
              name="service"
              value={service.id}
              onChange={() => handleServiceSelect(service)}
              checked={selectedService && selectedService.id === service.id}
            />
            <label htmlFor={`service-${service.id}`}>{service.title}</label>
          </li>
        ))}
      </ul>
      {selectedService && (
        <div className="service-details">
          <h3>{selectedService.title}</h3>
          <p>{selectedService.description}</p>
          <p><strong>Valor:</strong> R$ {selectedService.price.toFixed(2)}</p>
        </div>
      )}
      <button onClick={() => console.log('Confirmar escolha')}>Confirmar</button>
    </div>
  );
};

export default Services;