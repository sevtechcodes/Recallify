// src/SpeechRecognition.js
import React, { useState, useEffect, useRef } from 'react';
import './style.css';
const SpeechRecognition = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US');
  const recognition = useRef(null);

  useEffect(() => {
    // Initialize the webkitSpeechRecognition object
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcriptPart);
          } else {
            interimTranscript += transcriptPart;
          }
        }
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };
    } else {
      console.error('Web Speech API is not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    // Update the recognition language whenever the language state changes
    if (recognition.current) {
      recognition.current.lang = language;
    }
  }, [language]);

  const handleListen = () => {
    if (listening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setListening((prev) => !prev);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTranscriptChange = (event) => {
    setTranscript(event.target.value);
  };

  return (
    <div>
      <div className='speech-container'>
			<h3 class="text-center">Web Speech API Demo</h3>
			<div id="info"></div>
			<div class="float-right">
        <button id="start_button"> 
          <img id="start_img" src="images/mic.gif" alt="Start"/>
				</button>
      </div>
			<div id="results">
        <span id="final_span" class="final"></span>
        <span id="interim_span" class="interim"></span>
        <p/>
      </div>

			<textarea 
        value={transcript} 
        onChange={handleTranscriptChange} 
        rows="10" 
        cols="50" 
      />

        <label htmlFor="language">Choose language: </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Spanish (Spain)</option>
          <option value="fr-FR">French</option>
          <option value="de-DE">German</option>
          <option value="zh-CN">Chinese (Mandarin)</option>
          <option value="ja-JP">Japanese</option>
          <option value="ru-RU">Russian</option>
          <option value="ko-KR">Korean</option>
          <option value="it-IT">Italian</option>
          <option value="pt-BR">Portuguese (Brazil)</option>
          <option value="ar-SA">Arabic</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <button onClick={handleListen} style={{ cursor: 'pointer' }}>
        {/* {listening ? '🎤 Stop Listening' : '🎤 Start Listening'} */}
				{listening ? (
        // GIF for during listening
        <img src="./images/mic-animation.gif" alt="Listening" />
      ) : (
        // GIF for start
        <img src="./images/mic.gif" alt="Start" />
      )}
				
      </button>

    </div>
  );
};

export default SpeechRecognition;
