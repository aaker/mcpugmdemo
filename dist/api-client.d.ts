import { ApiResponse, VersionResponse, Domain, User, CallQueue, Agent } from './types.js';
export declare class NetSapiensApiClient {
    private client;
    constructor();
    private makeRequest;
    getVersion(): Promise<ApiResponse<VersionResponse>>;
    createDomain(domain: Domain): Promise<ApiResponse<Domain>>;
    createUser(domainName: string, user: User): Promise<ApiResponse<User>>;
    createCallQueue(domainName: string, callQueue: CallQueue): Promise<ApiResponse<CallQueue>>;
    addAgentToCallQueue(domainName: string, callQueueExtension: string, agent: Agent): Promise<ApiResponse<Agent>>;
}
//# sourceMappingURL=api-client.d.ts.map