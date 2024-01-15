// src/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nlp-chat-backend.azurewebsites.net/', // Replace with your API's base URL
    //baseURL: 'http://127.0.0.1:8000', // Replace with your API's base URL
});

// Example API function
export const fetchBotResponse = async (query: string): Promise<any> => {
    try {
        const response = await api.get('chatbot', {
            params: { format: 'json', message: query }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
