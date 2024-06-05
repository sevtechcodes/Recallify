import React from 'react';
import './style.css';

const DetailView = ({ formData, onEdit }) => {
  const { title, description, child, location, date, category } = formData;

  return (
    <div className="detail-view-container">
			<button className='close-view'>X</button>
      <h1>{title}</h1>
      <img src="https://via.placeholder.com/400x200" alt="Media" className="detail-image" />
      <p>{description}</p>
      <div className="detail-info">
        <div>Person: {child}</div>
        <div>Location: {location}</div>
        <div>Date: {date}</div>
        <div>Category: {category}</div>
      </div>
      <div className="detail-actions">
        <button className="delete-button" onClick={() => { /* Add delete logic */ }}>
          DELETE
        </button>
        <button className="edit-button" onClick={onEdit}>
          EDIT
        </button>
      </div>
    </div>
  );
};

export default DetailView;
