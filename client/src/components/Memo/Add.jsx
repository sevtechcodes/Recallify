import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './addStyle.css';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Add = ({ 
  formData, 
  onChange, 
  onSave, 
  setIsFormVisible, 
  isEditMode, 
	setIsEditMode,
  handleDelete 
}) => {
  const { title, description, child, location, date, category } = formData;
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const webcamRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formDataToSend = { ...formData };
      if (mediaFile) {
        const storageRef = ref(storage, `files/${mediaFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, mediaFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            console.error('Upload failed:', error);
          },
          async () => {
            try {
              const mediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
              const mediaType = mediaFile.type.startsWith('image/') ? 'image' : 'video';

              formDataToSend = {
                ...formDataToSend,
                media: mediaUrl,
                mediaType: mediaType,
              };

              await onSave(formDataToSend);
              clearForm();
            } catch (error) {
              console.error('Error getting download URL:', error);
            }
          }
        );
      } else {
        await onSave(formDataToSend);
        clearForm();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const clearForm = () => {
    onChange('title', '');
    onChange('description', '');
    onChange('child', '');
    onChange('location', '');
    onChange('date', '');
    onChange('category', '');
    setMediaFile(null);
    setPreviewUrl('');
    setProgress(0);
    setIsFormVisible(false);
  };

  const handleTakePicture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const file = new File([blob], 'captured_image.png', { type: 'image/png' });
    setMediaFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowCamera(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      setMediaType(type);
    }
  };

  const onCancel = () => {
    clearForm();
		setIsEditMode(false); // Set isEditMode to false
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
      <div className="modal">
        <h2>{isEditMode ? 'Edit Memory' : 'Create a new Memory'}</h2>
        <form onSubmit={handleSubmit}>

          <div className="add-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            {isEditMode && (
              <button type="button"  className="delete-button" onClick={() => handleDelete(formData._id)}>Delete</button>
            )}
            <button className="save-button" type="submit">
              {isEditMode ? 'Save' : 'Create'}
            </button>
          </div>
          <div className="add-details">
            <div>
              <select className="detail" value={child} onChange={(e) => onChange('child', e.target.value)}>
                <option value="">Select Person</option>
                <option value="Theo">Theo</option>
                <option value="Sevim">Sevim</option>
              </select>
            </div>
            <div>
              <select className="detail" value={category} onChange={(e) => onChange('category', e.target.value)}>
                <option value="">Select Category</option>
                <option value="birthday">Birthday</option>
                <option value="play">Play Time</option>
                <option value="travel">Travel</option>
                <option value="general">General</option>
                <option value="occasions">Occasions</option>
                <option value="friends">Friends</option>
              </select>
            </div>
            <div>
              <input
                className="detail"
                type="date"
                onChange={(e) => onChange('date', formatDate(e.target.value))}
              />
            </div>
            <div>
              <input
                className="detail"
                type="text"
                placeholder="Add location"
                value={location}
                onChange={(e) => onChange('location', e.target.value)}
              />
            </div>
          </div>
          <input
            type="text"
            className="add-title"
            placeholder="Add title"
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
          />

					<textarea
						type="text"
						className="add-description"
						placeholder="Type description"
						value={description}
						onChange={(e) => onChange('description', e.target.value)}
					></textarea>

          <div className="add-media">
						{/* <h4>Add Media</h4> */}
            <div className="file-input-wrapper">
							<div className="camere-section">
								<div className="media-icon camera" onClick={() => setShowCamera(true)}>
									📷
								</div>
								{showCamera && (
									<div className="media-preview">
										<Webcam className="camera-click" audio={false} ref={webcamRef} screenshotFormat="image/png" />
										<button type="button" onClick={handleTakePicture}>
											Take Picture
										</button>
										<button type="button" onClick={() => setShowCamera(false)}>
											Cancel
										</button>
									</div>
								)}
							</div>
							<div className="file-section">
									<input
										type="file"
										id="fileInput"
										name="fileInput"
										accept="image/*,video/*"
										onChange={handleFileChange}
									/>
									{progress > 0 && (
										<div className="progress-container">
											<div className="progress-bar" style={{ width: `${progress}%` }}></div>
											<span className="progress-text">{progress.toFixed(2)}%</span>
										</div>
									)}
									{previewUrl && (
										<div className="media-preview">
											{mediaType === 'image' ? (
												<img src={previewUrl} width="170px" height="170px" alt="Preview" />
											) : mediaType === 'video' ? (
												<video controls width="170px" height="170px">
													<source src={previewUrl} type={mediaFile.type} />
												</video>
											) : null}
										</div>
									)}
							</div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

