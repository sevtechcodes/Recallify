
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
						onClick={() => alert('Upload media')}
						>📎</div> 

						{/* helps me to reach my device camera to click pic or video and upload here */}
						<div className="media-icon camera"
						value={media}
						onChange={(e) => onChange('description', e.target.value)}
						onClick={() => alert('Open camera')}
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
              onChange={(e) => setDate('date', e.target.value)}
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
					onClick={() => {/* go back to main page */} }>
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
