import React, { useState, useEffect, useRef } from 'react';
import mic from './images/mic.gif';
import slash from './images/mic-slash.gif';
import animation from './images/mic-animation.gif';
import './style.css'
const WebSpeechAPIDemo = ({ value, onChange }) => {
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [permissionDenied, setPermissionDenied] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            onChange('description', value + transcriptPart);
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
  }, [value, onChange]);

  useEffect(() => {
    if (recognition.current) {
      recognition.current.lang = language;
    }
  }, [language]);

  const handleStartButtonClick = async () => {
    if (!listening) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recognition.current.start();
        setListening(true);
      } catch (error) {
        console.error('Permission denied for microphone access:', error);
        setPermissionDenied(true);
      }
    } else {
      recognition.current.stop();
      setListening(false);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className='description-speech'>
				<div>
					<textarea
					className='textarea'
						value={value}
						placeholder='Tell me more ...'
						onChange={(e) => onChange('description', e.target.value)}
						rows="10"
						cols="65"
						disabled={listening}
					/>
				</div>
				<div className='speech-control'>
					<button id='speech-button' onClick={handleStartButtonClick} style={{ cursor: 'pointer' }}>
						{permissionDenied ? (
							<img src={slash} alt="Denied" style={{ width: '40px', height: '40px' }} />
						) : listening ? (
							<img src={animation} alt="Listening" style={{ width: '40px', height: '40px' }} />
						) : (
							<img src={mic} alt="Start Listening" style={{ width: '40px', height: '40px' }} />
						)}
					</button>
					<label htmlFor="language">Language: </label>
					<select id="language" value={language} onChange={handleLanguageChange}>
						<option value="en-US">English (US)</option>
						<option value="en-GB">English (UK)</option>
						<option value="tr-TR">Turkish</option>
						<option value="es-ES">Spanish (Spain)</option>
						<option value="de-DE">German</option>
					</select>

				</div>


    </div>
  );
};

export default WebSpeechAPIDemo;
