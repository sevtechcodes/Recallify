// src/components/MemoryList.js
import React, { useEffect, useState } from 'react';
import { getMemories } from '../service';
import MemoryModal from './MemoryModal';
import './MemoryList.css';

const MemoryList = () => {
  const [memories, setMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);

  const refreshMemories = async () => {
    const memories = await getMemories();
    setMemories(memories);
  };

  useEffect(() => {
    refreshMemories();
  }, []);

  return (
    <div className="memory-list">
      <h1>Memory List</h1>
      <ul>
        {memories.map((memory) => (
					<div className='list-item'>
							<li key={memory.id} onClick={() => setSelectedMemory(memory)}>
								<img src={memory.mediaURL} alt="Memory" />
								<div>
									<h3>{memory.title}</h3>
									<p>{memory.description}</p>
									<p>Child: {memory.child}</p>
									<p>Location: {memory.location}</p>
									<p>Date: {new Date(memory.date.seconds * 1000).toLocaleDateString()}</p>
									<p>Category: {memory.category}</p>
								</div>
							</li>
					</div>
        ))}
      </ul>
      {selectedMemory && (
        <MemoryModal
          isOpen={Boolean(selectedMemory)}
          onRequestClose={() => setSelectedMemory(null)}
          memory={selectedMemory}
          refreshMemories={refreshMemories}
        />
      )}
    </div>
  );
};

export default MemoryList;
