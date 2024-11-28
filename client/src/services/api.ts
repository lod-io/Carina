import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface Message {
  role: "user" | "assistant";
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
    const response = await axios.post(`${API_BASE_URL}/chat/next-question`, payload, {
      withCredentials: true,
    });
    return response.data;
  },

  async generateDesign(
    prev_design: string | null,
    messages: Message[],
    model: string
  ): Promise<{ content: string }> {
    const response = await axios.post(`${API_BASE_URL}/design/generate`, {
      prev_design: prev_design,
      messages: messages,
      model: model,
    }, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  },
};