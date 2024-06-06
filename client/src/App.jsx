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

	// const [isDetailView, setIsDetailView] = useState(false); //to view edit page
  // const [isFormVisible, setIsFormVisible] = useState(false); //for add 

  // const handleChange = (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  const handleSave = (newMemory) => {
    setMemories((prevMemories) => sortItems([...prevMemories, newMemory]));
  };


  const sortItems = (memories) => {
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

      	<Add formData={formData} onSave={handleSave}/>
				<DetailView formData={formData} />

    	</div>
    </>
  )
}

export default App
