import React, { useState, useEffect } from 'react';
import './buscador.css';

const Buscador = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query === '') {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost/bd-appqr/v1/user/buscador.php?query=${encodeURIComponent(query)}`);
        const result = await response.json();
        setResults(result.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchResults();
  }, [query]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Escribe aquí para buscar"
        value={query}
        onChange={handleSearch}
        className="buscador-input"
      />
      {query && results.length === 0 ? (
        <p className="buscador-no-results">El usuario o rol no encontrado</p>
      ) : (
        results.length > 0 && (
          <ul className="buscador-results">
            {results.map((item) => (
              <li key={item.id} className="buscador-item">
                {`${item.name} - ${item.role}`}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default Buscador;