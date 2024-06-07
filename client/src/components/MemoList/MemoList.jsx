
import './MemoListStyle.css';

//I will pass memos inside this list
const MemoList = ({memories}) =>{
	if (memories.length === 0) {
    return <div>No memories yet</div>;
  }
	return (
		<div className='memo_list_container'>
			<p className='my-list-text'>This is My memory list</p>
			<div className='list_scroll'>
				<ul>
					{memories.map(memory => (
						<li key={memory._id} className='item'> 
							<div className='edit-link'>
								<a >Edit</a> { /*edit will take us to the DetailView page. Maybe like <Link to={`/edit/${memory._id}`}>Edit</Link> */}
							</div>
							<h1>{memory.title}</h1>

						<div className='memory-details'>
								<div className='media-info'>
									<img src={memory.media} alt="Media" className="detail-image"></img>
								</div>
						
								<div className="detail-info">
									<p className='description'>{memory.description}</p>
									<div>Person: {memory.child}</div>
									<div>Location: {memory.location}</div>
									<div>Date: {memory.date}</div>
									<div>Category: {memory.category}</div>
								</div>
							</div>
						</li>
					))}
      	</ul>
			</div>

		</div>
	);

};

export default MemoList
