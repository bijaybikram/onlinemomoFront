import { APIAuthenticated } from "http";

class ApiService {
  async getData(endpoint) {
    try {
      const response = await APIAuthenticated.get(`${endpoint}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const api = new ApiService();
export default api;
