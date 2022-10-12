import axios from 'axios';
import authHeader from '../common-utils/auth-header';


const API_CHAT_URL = 'http://localhost:8081/api/get/data/mongo/';

class MessageService {

    getConversation(fromId, toId) {
        return axios.get(API_CHAT_URL + 'conversation/?fromId=' + fromId + '&toId=' + toId, { headers: authHeader() });
      }
}
export default new MessageService();