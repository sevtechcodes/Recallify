import React, { useState, useEffect, createContext } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import Add from './components/Memo/Memo';
import DetailView from './components/Memo/DetailView';
import {getAllMemories} from './service';



const App = () => {
  const [memories, setMemories] = useState([

//Mockup data
// {
//     title: 'Sevim',
// 		media: '',
// 		description: '',
//     child: 'Melissa',
//     location: 'Berlin',
//     date: '2024-06-01',
//     category: 'Travel',
// }

	]);
	
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
				{/* sent memories you get from the database to be listed */}
				<div className='first-section'>
					<MemoList memories={memories}></MemoList>
					<button className='create-button'>+ Create New </button>
				</div>


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
