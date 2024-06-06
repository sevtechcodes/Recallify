
import React from 'react';
import { createMemory } from '../../service';
import './style.css';

const Add = ({ formData, onChange, onSave }) => {
  const { title,  media, description, child, location, date, category } = formData;


	const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMemory= await createMemory(title,  media, description, child, location, date, category );
      setTitle('');
      setMedia('');
			setDescription('');
      setChild('');
      setLocation('');
			setDate('');
			setCategory('');
      if (onSave) {
        onSave(newMemory);
      }
    } catch (error) {
      setError('Failed to add memory. Please try again.');
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
						{/* helps me to upload media from my device */}
						<div className="media-icon upload-media"
						value={media}
						onChange={(e) => onChange('description', e.target.value)}
						>📎</div> 

						{/* helps me to reach my device camera to click pic or video and upload here */}
						<div className="media-icon camera"
						value={media}
						onChange={(e) => onChange('description', e.target.value)}
						>📷</div> 
					</div>
					<textarea
						type="text"
						className="add-description"
						placeholder="Type description"
						value={description}
						onChange={(e) => onChange('description', e.target.value)}
					></textarea>
				</div>
				<div className="add-details"> { /*you can improve this section later*/}
					<div>: {child}</div>
					<div>Location: {location}</div>
					<div>Date: {date}</div>
					{/* <input 
          type="datetime-local" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          placeholder="Select event date" 
          required
          min={minDate} // Set minimum date
        	/> */}
					<div>Category: {category}</div>
				</div>
				<div className="add-actions">
					<button className="cancel-button" onClick={() => 
					{ /* Add cancel logic. It will not create anything, empty if any area is filled
				and go back to list component */ }}>
						Cancel
					</button>
					<button className="save-button" type="submit"  onClick={onSave}>
						SAVE
					</button>
				</div>
			</form>
    </div>
  );
};

export default Add;
