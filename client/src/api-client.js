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
        const formData = new FormData();
        if (image) formData.append('image', image);
        if (content) formData.append('content', content);
        if (author) formData.append('author', author);

        const response = await axios.put(
            `${this.base}/comments`,
            formData,
        );
        return response.data.comment;
    }
}

export default ApiClient
