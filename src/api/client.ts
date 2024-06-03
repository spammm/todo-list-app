import axios, { AxiosResponse } from 'axios';
const apiEndpoint = `${import.meta.env.VITE_API_HOST}`;

class Client {
  private server: string;

  constructor(endpoint: string) {
    this.server = endpoint;
  }

  async post<T>(url: string, params: T) {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.server}/${url}`,
        params
      );
      if (response && response.data) {
        return response;
      } else {
        throw new Error('Ответ сервера пустой или некорректный');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка Axios:', error.message);
        throw new Error('Ошибка сети при выполнении запроса');
      } else {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error('Произошла ошибка при выполнении запроса');
      }
    }
  }

  async put<T>(url: string, params: T) {
    try {
      const response: AxiosResponse = await axios.put(
        `${this.server}/${url}`,
        params
      );
      if (response && response.data) {
        return response;
      } else {
        throw new Error('Ответ сервера пустой или некорректный');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка Axios:', error.message);
        throw new Error('Ошибка сети при выполнении запроса');
      } else {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error('Произошла ошибка при выполнении запроса');
      }
    }
  }

  async patch<T>(url: string, params: T) {
    try {
      const response: AxiosResponse = await axios.patch(
        `${this.server}/${url}`,
        params
      );
      if (response && response.data) {
        return response;
      } else {
        throw new Error('Ответ сервера пустой или некорректный');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка Axios:', error.message);
        throw new Error('Ошибка сети при выполнении запроса');
      } else {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error('Произошла ошибка при выполнении запроса');
      }
    }
  }

  async get(url: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.server}/${url}`);
      if (response && response.data) {
        return response;
      } else {
        throw new Error('Ответ сервера пустой или некорректный');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка Axios:', error.message);
        throw new Error('Ошибка сети при выполнении запроса');
      } else {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error('Произошла ошибка при выполнении запроса');
      }
    }
  }

  async delete(url: string) {
    try {
      const response: AxiosResponse = await axios.delete(
        `${this.server}/${url}`
      );
      if (response && response.data) {
        return response;
      } else {
        throw new Error('Ответ сервера пустой или некорректный');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка Axios:', error.message);
        throw new Error('Ошибка сети при выполнении запроса');
      } else {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error('Произошла ошибка при выполнении запроса');
      }
    }
  }
}

const client = new Client(apiEndpoint);
export default client;
