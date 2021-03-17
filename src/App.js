import React, { useEffect, useState } from 'react';
import './App.css';

import { FaVolumeUp, FaRegTrashAlt, FaRegStopCircle } from 'react-icons/fa';

const utterance = new SpeechSynthesisUtterance();
utterance.lang = 'pt-BR';
utterance.rate = 1.5;

function App() {
  const [text, setText] = useState('');
  const TXT_ERROR = 'Informe algum texto para reprodução!';

  useEffect(() => {
    getPermissionPaste();
  }, []);

  const getPermissionPaste = () => {
    navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard
          .readText()
          .then((text) => setText(text))
          .catch((err) => console.warn(err));
      }
    });
  };

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
          onClick={() => getPermissionPaste()}
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
