
import React, { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSum = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/sum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ num1: Number(num1), num2: Number(num2) })
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
        setError(null);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch (error) {
      setError('Error al comunicarse con el servidor');
      setResult(null);
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sumar Números</h1>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Número 1"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Número 2"
        />
        <button onClick={handleSum}>Sumar</button>
        {result !== null && <p>Resultado: {result}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
