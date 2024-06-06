import React, { useState } from 'react';
import './style.css';

const Add = ({ formData, onChange, onSave }) => {
  const { title, description, child, location, date, category } = formData;
  const [mediaFile, setMediaFile] = useState(null); // State to store the selected media file

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Media', mediaFile);

    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('description', description);
    formDataToSend.append('child', child);
    formDataToSend.append('location', location);
    formDataToSend.append('date', date);
    formDataToSend.append('category', category);
    if (mediaFile) {
      formDataToSend.append('media', mediaFile); // Append the media file to the form data
    }

    try {
      await onSave(formDataToSend); // Pass the FormData object to the onSave function
      onChange('title', '');
      setMediaFile(null);
      onChange('description', '');
      onChange('child', '');
      onChange('location', '');
      onChange('date', '');
      onChange('category', '');
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
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
            <div className="media-icon upload-media">
              📎
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>Upload Media</label>
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

