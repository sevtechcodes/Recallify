//I want to move fetch requests here
import axios from 'axios';
const apiUrl = 'http://localhost:3000/memories';

export const getAllMemories = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.map(memory => ({
      ...memory
    }));
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const createMemory = async (memoryData) => {
	console.log(memoryData)
  try {
    const response = await axios.post(apiUrl, memoryData);

    return response.data;

  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const updateMemory = async (id, title, media, description, child, location, date, category) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, { title, media, description, child, location, date, category });
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};


export const deleteMemory = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};



//Check this again.
// export const uploadMedia =  async (title, media, description, child, location, date, category) => {
// 		try {
// 			const response = await axios.post(`${apiUrl}/${uploads}`, { title, media, description, child, location, date, category});
// 			return response.data;
// 		} catch (error) {
// 			console.error('Error adding item:', error);
// 			throw error;
// 		}
// };
