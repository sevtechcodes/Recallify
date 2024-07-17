import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Add';
import { getAllMemories, createMemory, updateMemory, deleteMemory } from './service';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const memories = await getAllMemories();
        const sortedMemories = sortMemories(memories);
        setMemories(sortedMemories);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };
    fetchMemories();
  }, []);

  const handleEditMemory = (memory) => {
    setFormData(memory);
    setIsFormVisible(true);
    setIsEditMode(true);
    setSelectedMemory(memory);
  };

	console.log("Playing with Docker")
  const handleSave = async (newMemoryData) => {
    try {
      if (isEditMode && selectedMemory) { 
        const updatedMemory = await updateMemory(selectedMemory._id, newMemoryData);
        setMemories((prevMemories) =>
          prevMemories.map((memory) =>
            memory._id === selectedMemory._id ? updatedMemory : memory
          )
        );
      } else {
        const newMemory = await createMemory(newMemoryData);
        setMemories((prevMemories) => sortMemories([...prevMemories, newMemory]));
      }
      setSelectedMemory(null);
      setIsEditMode(false);
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

  const handleDelete = async (id) => {
    try {
      await deleteMemory(id);
      setMemories((prevMemories) => prevMemories.filter((memory) => memory._id !== id));
      setSelectedMemory(null);
      setIsEditMode(false);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  const sortMemories = (memories) => {
    return memories.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="app-container">
      <Navbar setIsFormVisible={setIsFormVisible} />
      <div className='main-section'>
        <MemoList
          memories={memories}
          handleEditMemory={handleEditMemory}
        />
        {isFormVisible && (
          <Add
            className="create-form"
            formData={formData}
            onChange={handleInputChange}
            onSave={handleSave}
            setIsFormVisible={setIsFormVisible}
            isEditMode={isEditMode}
						setIsEditMode={setIsEditMode}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
