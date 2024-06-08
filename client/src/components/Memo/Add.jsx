import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './addStyle.css';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Add = ({ formData, onChange, onSave, setIsFormVisible }) => {
  const { title, description, child, location, date, category } = formData;
  const [mediaFile, setMediaFile] = useState(null); // State to store the selected media file
  const [mediaUrl, setMediaUrl] = useState(''); // State to store the uploaded media URL
  const [progress, setProgress] = useState(0); // State to track upload progress
  const [showCamera, setShowCamera] = useState(false); // State to show/hide camera
  const webcamRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mediaUrl = '';
    if (mediaFile) {
      try {
        const storageRef = ref(storage, `files/${mediaFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, mediaFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress); // Update progress state
            },
            (error) => {
              console.error('Upload failed:', error);
              reject(error);
            },
            async () => {
              mediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
              setMediaUrl(mediaUrl); // Set the uploaded media URL
              resolve();
            }
          );
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    const formDataToSend = {
      ...formData,
      media: mediaUrl,
    };

    try {
      await onSave(formDataToSend); // Pass the formData object to the onSave function
      onChange('title', '');
      setMediaFile(null);
      setProgress(0); // Reset progress
      onChange('description', '');
      onChange('child', '');
      onChange('location', '');
      onChange('date', '');
      onChange('category', '');
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  const handleTakePicture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const file = new File([blob], 'captured_image.png', { type: 'image/png' });
    setMediaFile(file);
    setShowCamera(false);
  };

  const onCancel = () => {
    console.log("Cancel button clicked"); // Log to check if the function is called
    onChange('title', '');
    setMediaFile(null);
    setProgress(0); // Reset progress
    onChange('description', '');
    onChange('child', '');
    onChange('location', '');
    onChange('date', '');
    onChange('category', '');
    setIsFormVisible(false); // Close the form
  };

  const onClose = () => {
    setIsFormVisible(false); // Close the form
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <div className="add-container">
      <div className='modal'>
        <form onSubmit={handleSubmit}>
          <button className='close-form-button' type="button" onClick={onClose}>X</button>
          <h2>Create a new Memory</h2>

          <input
            type="text"
            className="add-title"
            placeholder="Add title"
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
          />

          <div>
            <textarea
              className="add-description"
              placeholder="Type description"
              value={description}
              onChange={(e) => onChange('description', e.target.value)}
            ></textarea>
            <button className='listen-button' type="button">Listen</button>
          </div>

          <div className="add-media">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept="image/*,video/*"
                onChange={(e) => setMediaFile(e.target.files[0])}
              />
            </div>

            {progress > 0 && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{progress.toFixed(2)}%</span>
              </div>
            )}

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
              <label>Person: </label>
              <select value={child} onChange={(e) => onChange('child', e.target.value)}>
                <option value="">Select Person</option>
                <option value="Theo">Theo</option>
                <option value="Sevim">Sevim</option>
              </select>
            </div>

            <div>
              <label>Location: </label>
              <select value={location} onChange={(e) => onChange('location', e.target.value)}>
                <option value="">Select Location</option>
                <option value="Berlin">Berlin</option>
                <option value="Istanbul">Istanbul</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label>Date: </label>
              <input
                type="date"
                onChange={(e) => onChange('date', formatDate(e.target.value))}
              />
            </div>
            <div>
              <label>Category: </label>
              <select value={category} onChange={(e) => onChange('category', e.target.value)}>
                <option value="">Select Category</option>
                <option value="birthday">Birthday</option>
                <option value="travel">Travel</option>
                <option value="general">General</option>
                <option value="occasions">Occasions</option>
                <option value="friends">Friends</option>
              </select>
            </div>
          </div>
          <div className="add-actions">
            <button type="button" className="delete-button">
              Delete
            </button>

            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>

            <button className="save-button" type="submit">
              SAVE
            </button>
          </div>
        </form>

        {mediaUrl && (
          <div className="media-preview">
            {mediaFile.type.startsWith('image/') ? (
              <img src={mediaUrl} alt="Uploaded media" />
            ) : mediaFile.type.startsWith('video/') ? (
              <video controls>
                <source src={mediaUrl} type={mediaFile.type} />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
