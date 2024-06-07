// src/components/MemoryModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { updateMemory, deleteMemory } from '../service';
import './MemoryModal.css';

Modal.setAppElement('#root');

const MemoryModal = ({ isOpen, onRequestClose, memory, refreshMemories }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(memory.title);
  const [description, setDescription] = useState(memory.description);
  const [child, setChild] = useState(memory.child);
  const [location, setLocation] = useState(memory.location);
  const [date, setDate] = useState(new Date(memory.date.seconds * 1000).toISOString().split('T')[0]);
  const [category, setCategory] = useState(memory.category);

  const handleDelete = async () => {
    try {
      await deleteMemory(memory.id, memory.mediaURL);

      alert('Memory deleted successfully!');
      onRequestClose();
      refreshMemories();
    } catch (error) {
      console.error('Error deleting memory: ', error);
    }
  };

  const handleEdit = async () => {
    try {
      await updateMemory(memory.id, {
        title,
        description,
        child,
        location,
        date,
        category
      });

      alert('Memory updated successfully!');
      setEditMode(false);
      refreshMemories();
    } catch (error) {
      console.error('Error updating memory: ', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="memory-modal" contentLabel="Memory Modal">
      <h2>Memory Details</h2>
      <img src={memory.mediaURL} alt="Memory" />
      {editMode ? (
        <>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="text" value={child} onChange={(e) => setChild(e.target.value)} />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>Select Category</option>
            <option value="birthday">Birthday</option>
            <option value="travel">Travel</option>
            <option value="general">General</option>
            <option value="occasions">Occasions</option>
            <option value="friends">Friends</option>
          </select>
          <button className="save-button" onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Child: {child}</p>
          <p>Location: {location}</p>
          <p>Date: {new Date(memory.date.seconds * 1000).toLocaleDateString()}</p>
          <p>Category: {category}</p>
          <button className="edit-button" onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
      <button className="close-button" onClick={onRequestClose}>Close</button>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </Modal>
  );
};

export default MemoryModal;
