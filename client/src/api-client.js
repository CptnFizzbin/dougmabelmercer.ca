import axios from 'axios';
import config from './config';

class ApiClient {
    static base = config.serverUrl;

    static async getComments() {
        const response = await axios.get(
            `${this.base}/comments`,
        );
        return response.data.comments;
    }

    static async putComment({author, content, image = null}) {
        const response = await axios.put(
            `${this.base}/comments`,
            {author, content, image},
        );
        return response.data.comment;
    }
}

export default ApiClient
