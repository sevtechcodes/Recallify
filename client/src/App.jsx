import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Add';
import { getAllMemories, createMemory } from './service';

const App = () => {
  const [memories, setMemories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    media: '',
    description: '',
    child: '',
    location: '',
    date: '',
    category: '',
  });

  useEffect(() => {
    const fetchMemories = async () => {
      const memories = await getAllMemories();
      setMemories(memories);
    };
    fetchMemories();
  }, []);

  const handleSave = async (newMemoryData) => {
    try {
      const newMemory = await createMemory(newMemoryData);
      setMemories((prevMemories) => sortMemories([...prevMemories, newMemory]));
      setIsFormVisible(false); // Hide form after saving
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
      <div className='first-section'>
        <MemoList memories={memories} />
        {/* <div className='sticky-container'>
          <button className='create-button' onClick={() => setIsFormVisible(true)}>+ Create New</button>
        </div> */}
      </div>

      {isFormVisible && (
        <Add className="create-form"
          formData={formData} 
          onChange={handleInputChange} 
          onSave={handleSave} 
          setIsFormVisible={setIsFormVisible}
        />
      )}
    </div>
  );
};

export default App;
