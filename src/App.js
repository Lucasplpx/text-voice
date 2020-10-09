import React, { useState } from 'react';
import './App.css';

import { FaVolumeUp, FaRegTrashAlt, FaRegStopCircle } from 'react-icons/fa';

const utterance = new SpeechSynthesisUtterance();
utterance.lang = 'pt-BR';
utterance.rate = 2;

function App() {
  const [text, setText] = useState('');
  const TXT_ERROR = 'Informe algum texto para reprodução!';

  const onChange = (evt) => {
    setText(evt.target.value);
  };

  const clearText = () => {
    setText('');
  };

  const speak = () => {
    utterance.text = text;
    if (!text) {
      utterance.text = TXT_ERROR;
    }
    return speechSynthesis.speak(utterance);
  };

  const stop = () => {
    return speechSynthesis.cancel();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Informe um texto</h1>

        <textarea
          cols="45"
          rows="15"
          value={text}
          onChange={onChange}
        ></textarea>
        <div className="acoes">
          <button className="bkpurple" onClick={() => speak()}>
            <FaVolumeUp />
            <span>Falar</span>
          </button>
          <button className="bkclean" onClick={() => clearText()}>
            <FaRegTrashAlt />
            <span>Limpar</span>
          </button>
          <button className="bkstop" onClick={() => stop()}>
            <FaRegStopCircle />
            <span>Parar</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
