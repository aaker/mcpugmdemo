import axios from 'axios';
import { config } from './config.js';
export class NetSapiensApiClient {
    client;
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
        this.client.interceptors.response.use((response) => {
            console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
            return response;
        }, (error) => {
            const status = error.response?.status || 'Unknown';
            const method = error.config?.method?.toUpperCase() || 'Unknown';
            const url = error.config?.url || 'Unknown';
            console.error(`❌ ${method} ${url} - Status: ${status}`);
            if (error.response?.data) {
                console.error('Error details:', error.response.data);
            }
            return Promise.reject(error);
        });
    }
    async makeRequest(method, endpoint, data) {
        try {
            console.log(`🔄 Making ${method} request to: ${endpoint}`);
            if (data) {
                console.log('Request data:', JSON.stringify(data, null, 2));
            }
            const response = await this.client.request({
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
        }
        catch (error) {
            const axiosError = error;
            const status = axiosError.response?.status || 500;
            const errorMessage = axiosError.response?.data || axiosError.message || 'Unknown error';
            console.error(`❌ Request failed (${status}):`, errorMessage);
            return {
                error: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
                status,
            };
        }
    }
    async getVersion() {
        return this.makeRequest('GET', '/version');
    }
    async createDomain(domain) {
        return this.makeRequest('POST', '/domains', domain);
    }
    async createUser(domainName, user) {
        return this.makeRequest('POST', `/domains/${domainName}/users`, user);
    }
    async createCallQueue(domainName, callQueue) {
        return this.makeRequest('POST', `/domains/${domainName}/callqueues`, callQueue);
    }
    async addAgentToCallQueue(domainName, callQueueExtension, agent) {
        return this.makeRequest('POST', `/domains/${domainName}/callqueues/${callQueueExtension}/agents`, agent);
    }
}
//# sourceMappingURL=api-client.js.map