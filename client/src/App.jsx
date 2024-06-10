import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Add';
import { getAllMemories, createMemory } from './service';
import WebSpeechAPIDemo from './components/VTT/WebSpeechAPIDemo';

const App = () => {
  const [memories, setMemories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    media: '',
    mediaType: '',
    description: '',
    child: '',
    location: '',
    date: '',
    category: '',
  });

  useEffect(() => {
    const fetchMemories = async () => {
      const memories = await getAllMemories();
      const sortedMemories = sortMemories(memories);
      setMemories(sortedMemories);
    };
    fetchMemories();
  }, []);

  const handleSave = async (newMemoryData) => {
    try {
      const newMemory = await createMemory(newMemoryData);
      setMemories((prevMemories) => sortMemories([...prevMemories, newMemory]));
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const sortMemories = (memories) => {
    return memories.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="app-container">
      <Navbar setIsFormVisible={setIsFormVisible} />
      <div className='main-section'>
        <MemoList memories={memories} />
        {isFormVisible && (
          <Add
            className="create-form"
            formData={formData} 
            onChange={handleInputChange} 
            onSave={handleSave} 
            setIsFormVisible={setIsFormVisible}
          />
        )}
      </div>
    </div>
  );
};

export default App;
