import './MemoListStyle.css';

const MemoList = ({ memories, handleEditMemory }) => {
  if (memories.length === 0) {
    return <div>No memories yet</div>;
  }
  return (
    <div className="memo_list_container">
      <div className="list_scroll">
        <ul className="item-list">
          {memories.map((memory) => (
            <li key={memory._id} className="item">
							{console.log('I am checking mediaType in Listing',memory.mediaType)}
              <div className="edit-button">
                <button className='edit' onClick={() => handleEditMemory(memory)}>Edit</button>
              </div>

              <h1>{memory.title}</h1>

              <div className="memory-details">
								<div className='image-section'>
									<div className="media-info">
										{memory.mediaType=== 'video' && (
											<video className="list-video-item" controls width="300px">
												<source src={memory.media} type="video/mp4" />
											</video>
										)}

										{memory.mediaType === 'image' && (
											<img className="list-image-item"  width="300px" src={memory.media} alt="Memory" />
										)}
									</div>

										<div className="media-notes">
											<div>Person: {memory.child}</div>
											<div>Location: {memory.location}</div>
											<div>Date: {memory.date}</div>
											<div>Category: {memory.category}</div>
										</div>
								</div>

								

                <div className="detail-info">
                  <div className="description-area">
                    <p className="description">{memory.description}</p>
                  </div>


                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemoList;
