
import React from 'react';
import './style.css';

const Add = ({ formData, onChange, onSave }) => {
  const { title, description, child, location, date, category } = formData;

  return (
    <div className="add-container">
      <input
        type="text"
        className="add-title"
        placeholder="Add title"
        value={title}
        onChange={(e) => onChange('title', e.target.value)}
      />
      <div className="add-media-description">
        <div className="add-media">
          <div className="media-icon">📎</div>
          <div className="media-icon">📷</div>
        </div>
        <textarea
          className="add-description"
          placeholder="Type description"
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
        ></textarea>
      </div>
      <div className="add-details">
        <div>Child: {child}</div>
        <div>Location: {location}</div>
        <div>Date: {date}</div>
        <div>Category: {category}</div>
      </div>
      <div className="add-actions">
        <button className="cancel-button" onClick={() => { /* Add cancel logic */ }}>
          Cancel
        </button>
        <button className="save-button" onClick={onSave}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Add;
