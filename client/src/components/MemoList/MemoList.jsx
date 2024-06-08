
import './MemoListStyle.css';

//I will pass memos inside this list
const MemoList = ({memories}) =>{
	if (memories.length === 0) {
    return <div>No memories yet</div>;
  }

	
	return (
		<>
		
		<div className='memo_list_container'>
			
			<div className='list_scroll'>
				<ul className='item-list'>
					{memories.map(memory => (
						<li key={memory._id} className='item'> 
							<div className='edit-link'>
								{/* <a >Edit</a>  */}
								TODO { /*edit will take us to the DetailView page. Maybe like <Link to={`/edit/${memory._id}`}>Edit</Link> */}
							</div>
							<h1>{memory.title}</h1>

								<div className='memory-details'>
										<div className='media-info'>

									{console.log("check Media:", memory.media)}
										{console.log("Check MediaType:", memory.mediaType)}


										{/* This works displays videos */}
											(		<video controls width="400px">
														<source src={memory.media} type="video/mp4" />
													</video>
											)


								</div>

						
								<div className="detail-info">
									<div className='description-area'>
										<p className='description'>{memory.description}</p>
									</div>
									
									<div className='media-notes'> 
										<div>Person: {memory.child}</div>
										<div>Location: {memory.location}</div>
										<div>Date: {memory.date}</div>
										<div>Category: {memory.category}</div>
									</div>
								</div>

							</div>
						</li>
					))}
      	</ul>
			</div>

		</div>
	</>
	);

};

export default MemoList
