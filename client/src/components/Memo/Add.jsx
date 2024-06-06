
import React from 'react';
import './style.css';

const Add = ({ formData, onChange, onSave }) => {
  const { title, media, description, child, location, date, category } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanData = { ...formData };
      await onSave(cleanData);
      onChange('title', '');
      onChange('media', '');
      onChange('description', '');
      onChange('child', '');
      onChange('location', '');
      onChange('date', '');
      onChange('category', '');
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  return (
    <div className="add-container">
      <form onSubmit={handleSubmit}>
        <h2>Create a new event</h2>
        <input
          type="text"
          className="add-title"
          placeholder="Add title"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <div className="add-media-description">
          <div className="add-media">
            <p>Add Media</p>

            <div className="media-icon upload-media" onClick={() => alert('Upload media')}>
              📎
            </div>

            <div className="media-icon camera" onClick={() => alert('Open camera')}>
              📷
            </div>
          </div>
          <textarea
            className="add-description"
            placeholder="Type description"
            value={description}
            onChange={(e) => onChange('description', e.target.value)}
          ></textarea>
        </div>
        <div className="add-details">
          <div>
            <label>Child: </label>
            <input
              type="text"
              value={child}
              onChange={(e) => onChange('child', e.target.value)}
            />
          </div>
          <div>
            <label>Location: </label>
            <input
              type="text"
              value={location}
              onChange={(e) => onChange('location', e.target.value)}
            />
          </div>
          <div>
            <label>Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </div>
          <div>
            <label>Category: </label>
            <input
              type="text"
              value={category}
              onChange={(e) => onChange('category', e.target.value)}
            />
          </div>
        </div>
        <div className="add-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => onSave(null)}
          >
            Cancel
          </button>
          <button className="save-button" type="submit">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
