import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface Message {
  role: string;
  content: string;
}

export interface ChatHistory {
  messages: Message[];
}

export const api = {
  async getNextQuestion(messages: Message[]): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/chat/chat/next-question`, {
      messages,
    });
    console.log(response.data);
    return response.data;
  },

  async generateDesign(messages: Message[]): Promise<{ content: string }> {
    const response = await axios.post(`${API_BASE_URL}/design/generate`, {
      messages,
    });
    console.log(response.data);
    return response.data;
  },
};