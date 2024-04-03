// src/api.ts
import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://black-sand-3f09b3a9e48347e780a9c8abd04add48.azurewebsites.net/', // Replace with your API's base URL
    //baseURL: 'http://127.0.0.1:8000', // Replace with your API's base URL
    baseURL: 'https://ashy-bay-5331ffa4d6654851ba4c011600c4f97d.azurewebsites.net/', // Replace with your API's base URL
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
