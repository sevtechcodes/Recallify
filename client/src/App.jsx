import React, { useState, useEffect, createContext } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import MemoList from './components/MemoList/MemoList';

function App() {

  return (
    <>
			<div>
				<Navbar/>
				<MemoList></MemoList>
			</div>

    </>
  )
}

export default App
