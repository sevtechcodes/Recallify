import { useState, useEffect, useRef } from 'react';
import mic from './images/mic.gif';
import slash from './images/mic-slash.gif';
import animation from './images/mic-animation.gif';
import './style.css';

const WebSpeechAPIDemo = ({ value, onChange }) => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      onChange(value + finalTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };
  }, [value, onChange]);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setListening(!listening);
  };

  if (!supported) {
    return <p>Web Speech API is not supported in this browser.</p>;
  }

  return (
    <div className="speech-container">
      <div className="speech-textarea">
        <textarea
          rows="5"
          cols="50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
        <div className="microphone-icon">
          <img
            src={listening ? animation : mic}
            alt="Microphone"
            onClick={toggleListening}
          />
          {listening && <img src={slash} alt="Stop" onClick={toggleListening} />}
        </div>
      </div>
    </div>
  );
};

export default WebSpeechAPIDemo;
