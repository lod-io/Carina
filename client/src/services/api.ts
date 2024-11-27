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
  async getNextQuestion(messages: Message[], model: string): Promise<{ content: string }> {
    const payload = {
      messages: messages,
      model,
    };
    const response = await axios.post(`${API_BASE_URL}/chat/next-question`, payload);
    return response.data;
  },

  async generateDesign(
    messages: Message[],
    model: string
  ): Promise<{ content: string }> {
    const response = await axios.post(`${API_BASE_URL}/design/generate`, {
      messages: messages,
      model: model,
    });
    console.log(response.data);
    return response.data;
  },
};