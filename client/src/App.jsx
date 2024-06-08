import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Add';
import { getAllMemories, createMemory } from './service';

const App = () => {
  // State for memories
  const [memories, setMemories] = useState([]);

  // State for form visibility and form data
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

  // Fetch memories on component mount
  useEffect(() => {
    const fetchMemories = async () => {
      const memories = await getAllMemories();
      const sortedMemories = sortMemories(memories);
      setMemories(sortedMemories);
    };
    fetchMemories();
  }, []);

  // Function to handle saving a new memory
  const handleSave = async (newMemoryData) => {
    try {
      const newMemory = await createMemory(newMemoryData);
      setMemories((prevMemories) => sortMemories([...prevMemories, newMemory]));
      setIsFormVisible(false); // Hide form after saving
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  // Function to handle input change in the form
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Helper function to sort memories by date
  const sortMemories = (memories) => {
    return memories.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="app-container">
      {/* Navbar component */}
      <Navbar setIsFormVisible={setIsFormVisible} />

      {/* Main section containing MemoList and Add form */}
      <div className='main-section'>
        {/* MemoList component */}
        <MemoList memories={memories} />

        {/* Add form component */}
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
