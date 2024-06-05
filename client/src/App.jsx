import React, { useState, useEffect, createContext } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Memo';

const App = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    child: 'Melissa',
    location: 'Berlin',
    date: '2024-06-01',
    category: 'General'
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Add your save logic here
    // console.log(formData);
  };






  return (
    <>
		  <div className="app-container">
				<Navbar/>
				<MemoList></MemoList>
      	<Add formData={formData} onChange={handleChange} onSave={handleSave} />
    	</div>
			<div>

			</div>
    </>
  )
}

export default App
