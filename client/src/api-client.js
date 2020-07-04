import axios from 'axios';
import config from './config';

class ApiClient {
    static base = config.serverUrl;

    static async getComments() {
        const comments = await axios.get(`${this.base}/comments`);
        return comments.data.comments;
    }
}

export default ApiClient
