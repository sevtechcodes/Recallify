import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './style.css';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from '../../firebase/storage';

const Add = ({ formData, onChange, onSave }) => {
  // const [imgUrl, setImgUrl] = useState(null);
  const { title, description, child, location, date, category } = formData;
  const [mediaFile, setMediaFile] = useState(null); // State to store the selected media file
  const [showCamera, setShowCamera] = useState(false); // State to show/hide camera
  const webcamRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mediaUrl = '';

    if (mediaFile) {
      const storageRef = ref(storage, `files/${mediaFile.name}`);
      const uploadTask = await uploadBytes(storageRef, mediaFile);
			mediaUrl = await getDownloadURL(ref(storage, uploadTask.metadata.fullPath))
    }

    const formDataToSend = {
      ...formData,
      media: mediaUrl,
    };

    try {
      await onSave(formDataToSend); // Pass the formData object to the onSave function
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

  const handleTakePicture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'captured_image.png', { type: 'image/png' });
        setMediaFile(file);
        setShowCamera(false);
      });
  };

	const onCancel =()=>{
		onSave(null)
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

        <textarea
          className="add-description"
          placeholder="Type description"
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
        ></textarea>

        <div className="add-media">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              onChange={(e) => setMediaFile(e.target.files[0])}
            />
          </div>

          <div className="media-icon camera" onClick={() => setShowCamera(true)}>
            📷
          </div>
          {showCamera && (
            <div className="camera-container">
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />
              <button type="button" onClick={handleTakePicture}>
                Take Picture
              </button>
              <button type="button" onClick={() => setShowCamera(false)}>
                Cancel
              </button>
            </div>
          )}
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
          <button type="button" className="cancel-button" onClick={() => oncancel()}>
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
