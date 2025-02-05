import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
      console.error('API Error:', error.response ? error.response.data : error.message);
      return Promise.reject(error);
  }
);
const service = {
  getTasks: async () => {
    try {
      const result = await axios.get(`/items`)
      return result.data;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  },

  addTask: async (name) => {
    const newTask = { name, isComplete: false };
    try {
      const result = await axios.post(`/items`,newTask)
      console.log('Task added:', result.data);
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const tasks = await  service.getTasks();
      const existingTask = tasks.find(task => task.id === id);
      const updatedTask = {...existingTask, isComplete: isComplete};
      const result = await axios.put(`/items/${id}`, updatedTask);
      console.log('Task updated:', result.data);
      return result.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const result = await axios.delete(`/items/${id}`);
      console.log('Task deleted:', result.data);
      return result.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};
export default service;