// src/components/MemoryForm.js
import React, { useState, useRef } from 'react';
import { addMemory } from '../service';
import './MemoryForm.css';

const MemoryForm = () => {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [child, setChild] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const handleMediaChange = (e) => {
    if (e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleStartStopRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !media || !description || !child || !location || !category) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await addMemory({
        title,
        media,
        description,
        child,
        location,
        date,
        category
      });

      setTitle('');
      setMedia(null);
      setDescription('');
      setChild('');
      setLocation('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory('');
      alert('Memory added successfully!');
    } catch (error) {
      console.error('Error adding memory: ', error);
    }
  };

  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setDescription((prevDescription) => prevDescription + ' ' + transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
      };
    } else {
      alert('Speech Recognition API not supported in this browser.');
    }
  }, []);

  return (
    <div className="memory-form">
      <h1>Add New Memory</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="file" onChange={handleMediaChange} required />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <button
          type="button"
          onClick={handleStartStopRecording}
          className={`record-button ${isRecording ? 'red' : 'green'}`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <input type="text" value={child} onChange={(e) => setChild(e.target.value)} placeholder="Child" required />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Select Category</option>
          <option value="birthday">Birthday</option>
          <option value="travel">Travel</option>
          <option value="general">General</option>
          <option value="occasions">Occasions</option>
          <option value="friends">Friends</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MemoryForm;
