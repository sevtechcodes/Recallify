import React, { useEffect } from 'react';

const SpeechRecognitionComponent = ({ description, setDescription, isListening, setIsListening, setIsFormVisible}) => {

  useEffect(() => {
    let recognition;

    const startRecognition = () => {
			setIsFormVisible= (true);
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // Only update description if isListening is false
            if (!isListening) {
              setDescription((prevDescription) => prevDescription + transcript);
            }
          } else {
            interimTranscript += transcript;
          }
        }
        // Only update description if isListening is false
        if (!isListening) {
          setDescription((prevDescription) => prevDescription + interimTranscript);
        }
      };

      recognition.onend = () => {
        if (isListening) recognition.start();
      };

      recognition.start();
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    if (isListening) {
      startRecognition();
    } else {
      stopRecognition();
    }

    return () => {
      stopRecognition();
    };
  }, [isListening, setDescription]);

  return (
    <div>
      <button onClick={() => setIsListening((prev) => !prev)}>
        {isListening ? 'Stop' : 'Start'} Listening
      </button>
      {/* Text area removed */}
    </div>
  );
};

export default SpeechRecognitionComponent;
