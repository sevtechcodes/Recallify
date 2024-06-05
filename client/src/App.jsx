import React, { useState, useEffect, createContext } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Memo';
import DetailView from './components/Memo/DetailView';

const App = () => {

	//my initial state of the add memory component
  const [formData, setFormData] = useState({
    title: '',
		media: '',
		description: '',
    child: 'Melissa',
    location: 'Berlin',
    date: '2024-06-01',
    category: 'Travel',
  });

	const [isDetailView, setIsDetailView] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    setIsDetailView(true);
  };

  const handleEdit = () => {
    setIsDetailView(false);
  };



  return (
    <>
		  <div className="app-container">


				<Navbar/>
				<MemoList></MemoList>

      	<Add formData={formData} onChange={handleChange} onSave={handleSave} />
				<DetailView formData={formData} onEdit={handleEdit} />


				{/* {isDetailView ? (
        <DetailView formData={formData} onEdit={handleEdit} />
      ) : (
        <Add formData={formData} onChange={handleChange} onSave={handleSave} />
      )} */}



    	</div>
    </>
  )
}

export default App
