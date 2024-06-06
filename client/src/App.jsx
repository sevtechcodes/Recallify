import React, { useState, useEffect, createContext } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Add';
import DetailView from './components/Memo/DetailView';
import {getAllMemories, createMemory, updateMemory, deleteMemory} from './service';



const App = () => {
  const [memories, setMemories] = useState([]);
	
	useEffect(() => {
    const fetchMemories = async () => {
      const memories = await getAllMemories();
      setMemories(memories);
    };
    fetchMemories();
  }, []);


	//my initial state of the add memory component
  const [formData, setFormData] = useState({
    title: '',
		media: '',
		description: '',
    child: '',
    location: '',
    date: '',
    category: '',
  });

  // const handleSave = (newMemory) => {
  //   setMemories((prevMemories) => sortItems([...prevMemories, newMemory]));
  // };

	const handleSave = async (newMemoryData) => {
    const newMemory = await createMemory(newMemoryData);
    setMemories((prevMemories) => sortMemories([...prevMemories, newMemory]));
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
    <>
		  <div className="app-container">
				<Navbar/>
				<div className='first-section'>
					<MemoList memories={memories}></MemoList>
					<button className='create-button' formData={formData}>+ Create New </button>   {/* This will popup the add memo */}
				</div>

      	<Add formData={formData} onSave={handleSave} onChange={handleInputChange}/>
				{/* <DetailView formData={formData} /> */}

    	</div>
    </>
  )
}

export default App
