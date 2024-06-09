import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import languages from './js/languages';
// import './js/web-speech-api'

const WebSpeechAPIDemo = () => {
  const [finalTranscript, setFinalTranscript] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [info, setInfo] = useState('');
  const [selectLanguage, setSelectLanguage] = useState(6); // Default to English
  const [selectDialect, setSelectDialect] = useState(6);
  const [dialects, setDialects] = useState([]);
  const recognitionRef = useRef(null);
  const startImgRef = useRef(null);
  const finalSpanRef = useRef(null);
  const interimSpanRef = useRef(null);

  useEffect(() => {
    updateCountry(selectLanguage);
  }, [selectLanguage]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    } else {
      showInfo('start');
      const recognition = new window.webkitSpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setRecognizing(true);
        showInfo('speak_now');
        startImgRef.current.src = 'images/mic-animation.gif';
      };

      recognition.onerror = (event) => {
        if (event.error === 'no-speech') {
          startImgRef.current.src = 'images/mic.gif';
          showInfo('no_speech');
        }
        if (event.error === 'audio-capture') {
          startImgRef.current.src = 'images/mic.gif';
          showInfo('no_microphone');
        }
        if (event.error === 'not-allowed') {
          showInfo('denied');
        }
      };

      recognition.onend = () => {
        setRecognizing(false);
        if (!finalTranscript) {
          showInfo('start');
        } else {
          showInfo('stop');
        }
        startImgRef.current.src = 'images/mic.gif';
      };

      recognition.onresult = (event) => {
        let interim_transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setFinalTranscript((prev) => prev + event.results[i][0].transcript);
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        finalSpanRef.current.innerHTML = linebreak(capitalize(finalTranscript));
        interimSpanRef.current.innerHTML = linebreak(interim_transcript);
      };
    }
  }, []);

  const showInfo = (s) => {
    setInfo(messages[s]?.msg || '');
  };

  const upgrade = () => {
    showInfo('upgrade');
  };

  const linebreak = (s) => {
    const two_line = /\n\n/g;
    const one_line = /\n/g;
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  };

  const capitalize = (s) => {
    const first_char = /\S/;
    return s.replace(first_char, (m) => m.toUpperCase());
  };

  const updateCountry = (languageIndex) => {
    const list = languages[languageIndex];
    const dialectOptions = list.slice(1).map((dialect) => ({
      value: dialect[0],
      label: dialect[1],
    }));
    setDialects(dialectOptions);
  };

  const handleCopy = () => {
    if (recognizing) {
      recognitionRef.current.stop();
    }
    setTimeout(copyToClipboard, 500);
  };

  const copyToClipboard = () => {
    const results = document.getElementById('results');
    const range = document.createRange();
    range.selectNode(results);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    showInfo('copy');
  };

  const handleStartButtonClick = (event) => {
    if (recognizing) {
      recognitionRef.current.stop();
      return;
    }
    setFinalTranscript('');
    recognitionRef.current.lang = selectDialect;
    recognitionRef.current.start();
    finalSpanRef.current.innerHTML = '';
    interimSpanRef.current.innerHTML = '';
    startImgRef.current.src = 'images/mic-slash.gif';
    showInfo('allow');
  };

  const handleLanguageChange = (event) => {
    setSelectLanguage(parseInt(event.target.value, 10));
  };

  const handleDialectChange = (event) => {
    setSelectDialect(event.target.value);
  };

  return (
    <div className="container">
      <h3 className="text-center">Web Speech API Demo</h3>
      <div id="info" className={`alert ${messages[info]?.class || 'd-none'}`}>{info}</div>
      <div className="float-right">
        <button id="start_button" onClick={handleStartButtonClick}>
          <img ref={startImgRef} id="start_img" src="images/mic.gif" alt="Start" />
        </button>
      </div>
      <div id="results">
        <span ref={finalSpanRef} id="final_span" className="final"></span>
        <span ref={interimSpanRef} id="interim_span" className="interim"></span>
        <p />
      </div>
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <select id="select_language" value={selectLanguage} onChange={handleLanguageChange}>
            {languages.map((lang, index) => (
              <option key={index} value={index}>
                {lang[0]}
              </option>
            ))}
          </select>
          <select id="select_dialect" value={selectDialect} onChange={handleDialectChange}>
            {dialects.map((dialect, index) => (
              <option key={index} value={dialect.value}>
                {dialect.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-4 col-lg-6">
          <div className="float-right">
            <button id="copy_button" className="btn" onClick={handleCopy}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSpeechAPIDemo;
