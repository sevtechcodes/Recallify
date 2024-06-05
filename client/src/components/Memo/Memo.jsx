
import React from 'react';
import './style.css';

const Add = ({ formData, onChange, onSave }) => {
  const { title,  media, description, child, location, date, category } = formData;

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
					<div className='media-area' value={media}></div>
					<p>Add Media</p>
          <div className="media-icon upload-media">📎</div> {/* helps me to upload media from my device */}
          <div className="media-icon camera">📷</div> {/* helps me to reach my device camera to click pic or video and upload here */}
        </div>
        <textarea
          className="add-description"
          placeholder="Type description"
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
        ></textarea>
      </div>
      <div className="add-details"> { /*you can improve this section later*/}
        <div>Child: {child}</div>
        <div>Location: {location}</div>
        <div>Date: {date}</div>
        <div>Category: {category}</div>
      </div>
      <div className="add-actions">
        <button className="cancel-button" onClick={() => 
				{ /* Add cancel logic. It will not create anything, empty if any area is filled
			 and go back to list component */ }}>
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
