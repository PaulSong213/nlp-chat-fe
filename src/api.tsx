// src/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nlp-backend-chat.azurewebsites.net', // Replace with your API's base URL
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
