import React, { useState } from 'react';

const SearchBox = ({ onSearch, onAgendaClick, onContactClick }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  const handleAgendaClick = () => {
    onAgendaClick();
  };

  const handleContactClick = () => {
    onContactClick();
  };

  return (
    <div className="button-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar serviço..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="button search-button" onClick={handleSearchClick}>
        Buscar
      </button>
      <button className="button" onClick={handleAgendaClick}>
        Agenda
      </button>
      <button className="button" onClick={handleContactClick}>
        Contato
      </button>
    </div>
  );
};

export default SearchBox;