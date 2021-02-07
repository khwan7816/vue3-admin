import axios from "axios";
import config from "@/config";

axios.defaults.baseURL = config.apiServer;

class Network {
  setDeviceInfo(info: any) {
    axios.defaults.headers.common["x-device-info"] = JSON.stringify(info);
  }

  setAccessToken(accessToken: string | null) {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  async post(url: string, params: any = {}): Promise<any> {
    try {
      const response: any = await axios.post(url, params);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async put(url: string, params: any = {}): Promise<any> {
    try {
      const response: any = await axios.put(url, params);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async get(url: string, params: any = {}): Promise<any> {
    try {
      const response: any = await axios.get(url, { params });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async delete(url: string, params: any = {}): Promise<any> {
    try {
      const response: any = await axios.delete(url, { params });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}

export default new Network();
