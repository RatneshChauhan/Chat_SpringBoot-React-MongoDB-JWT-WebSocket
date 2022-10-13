import axios from 'axios';
import authHeader from '../common-utils/auth-header';

const API_TEST_URL = 'http://localhost:8081/api/test/';
const API_GET_URL = 'http://localhost:8081/api/get/data/mongo/'
const API_POST_URL = 'http://localhost:8081/api/post/data/mongo/';

class UserService {
  getPublicContent() {
    return axios.get(API_TEST_URL + 'home');
  }
  getUserBoard() {
    return axios.get(API_TEST_URL + 'user', { headers: authHeader() });
  }

  updateUser(user) {
    return axios.post(API_POST_URL + 'update/user', user, { headers: authHeader()});
  }
  getChatRoomUsers() {
    return axios.get(API_GET_URL + 'users', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_TEST_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_TEST_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
