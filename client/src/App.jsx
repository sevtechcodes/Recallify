import React, { useState, useEffect, createContext } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';
import axios from 'axios';
import Add from './components/Memo/Memo';
import DetailView from './components/Memo/DetailView';

// const API_URL = 'http://localhost:3030';

const App = () => {
  const [memories, setMemories] = useState([
		{
      title: "Melissa's first street crossing",
      media: "../client/public/image.png",
      description: "Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look.",
      child: 'Melissa',
      location: 'Berlin',
      date: '2024-06-01',
      category: 'Travel'
    },
    {
      title: "Melissa's day at the park",
      media: "../client/public/park.png",
      description: "A wonderful day at the park with lots of fun activities.",
      child: 'Melissa',
      location: 'Berlin',
      date: '2024-06-02',
      category: 'Leisure'
    }
	]);

  // useEffect(() => {
  //   	axios.get(`${API_URL}/memories`)
  //     .then(response => setMemories(response.data))
  //     .catch(error => console.log(error));
  // }, []);


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
				{/* sent memories you get from the database to be listed */}
				<MemoList memories={memories}></MemoList>
				<button>+ Create New </button>

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
