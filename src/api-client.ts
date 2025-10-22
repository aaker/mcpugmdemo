import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { config } from './config.js';
import { ApiResponse, VersionResponse, Domain, User, CallQueue, Agent } from './types.js';

export class NetSapiensApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
        return response;
      },
      (error) => {
        const status = error.response?.status || 'Unknown';
        const method = error.config?.method?.toUpperCase() || 'Unknown';
        const url = error.config?.url || 'Unknown';
        console.error(`❌ ${method} ${url} - Status: ${status}`);
        if (error.response?.data) {
          console.error('Error details:', error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }

  private async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      console.log(`🔄 Making ${method} request to: ${endpoint}`);
      if (data) {
        console.log('Request data:', JSON.stringify(data, null, 2));
      }

      const response: AxiosResponse<T> = await this.client.request({
        method,
        url: endpoint,
        data,
      });

      console.log(`✅ Response received (${response.status}):`);
      console.log(JSON.stringify(response.data, null, 2));

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error';

      console.error(`❌ Request failed (${status}):`, errorMessage);

      return {
        error: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
        status,
      };
    }
  }

  async getVersion(): Promise<ApiResponse<VersionResponse>> {
    return this.makeRequest<VersionResponse>('GET', '/version');
  }

  async createDomain(domain: Domain): Promise<ApiResponse<Domain>> {
    return this.makeRequest<Domain>('POST', '/domains', domain);
  }

  async createUser(domainName: string, user: User): Promise<ApiResponse<User>> {
    return this.makeRequest<User>('POST', `/domains/${domainName}/users`, user);
  }

  async createCallQueue(domainName: string, callQueue: CallQueue): Promise<ApiResponse<CallQueue>> {
    return this.makeRequest<CallQueue>('POST', `/domains/${domainName}/callqueues`, callQueue);
  }

  async addAgentToCallQueue(
    domainName: string, 
    callQueueExtension: string, 
    agent: Agent
  ): Promise<ApiResponse<Agent>> {
    return this.makeRequest<Agent>(
      'POST', 
      `/domains/${domainName}/callqueues/${callQueueExtension}/agents`, 
      agent
    );
  }
}