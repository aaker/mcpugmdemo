import { NetSapiensApiClient } from './api-client.js';
import { config } from './config.js';
import { Domain, User, CallQueue, Agent } from './types.js';

export class NetSapiensWorkflow {
  private client: NetSapiensApiClient;

  constructor() {
    this.client = new NetSapiensApiClient();
  }

  async executeFullWorkflow(): Promise<boolean> {
    console.log('🚀 Starting NetSapiens API workflow...\n');
    
    try {
      // Step 1: Check API version
      console.log('📋 Step 1: Checking API version...');
      const versionResponse = await this.client.getVersion();
      
      if (versionResponse.error || !versionResponse.data) {
        console.error('❌ Failed to get API version:', versionResponse.error);
        return false;
      }
      
      console.log('✅ API Version confirmed:', versionResponse.data.apiversion);
      console.log('🖥️  Connected to server:', versionResponse.data.hostname);
      if (versionResponse.data['current-time']) {
        console.log('🕐 Server time:', versionResponse.data['current-time']);
      }
      console.log('');

      // Step 2: Create domain
      console.log('📋 Step 2: Creating domain...');
      const domainData: Domain = {
        domain: config.fakeDomain,
        reseller: config.fakeReseller,
        description: `Demo domain for ${config.fakeDomain}`,
        'time-zone': 'US/Pacific',
        'area-code': 858,
        'caller-id-name': 'Demo Company',
        synchronous: 'yes',
      };

      const domainResponse = await this.client.createDomain(domainData);
      
      if (domainResponse.error || domainResponse.status !== 200) {
        console.error('❌ Failed to create domain:', domainResponse.error);
        return false;
      }
      
      console.log('✅ Domain created successfully:', config.fakeDomain);
      console.log('');

      // Step 3: Create user
      console.log('📋 Step 3: Creating user...');
      const userData: User = {
        user: config.fakeUser.username,
        domain: config.fakeDomain,
        'name-first': config.fakeUser.firstName,
        'name-last': config.fakeUser.lastName,
        'email-address': config.fakeUser.email,
        password: 'Demo123!',
        synchronous: 'yes',
      };

      const userResponse = await this.client.createUser(config.fakeDomain, userData);
      
      if (userResponse.error || userResponse.status !== 200) {
        console.error('❌ Failed to create user:', userResponse.error);
        return false;
      }
      
      console.log('✅ User created successfully:', `${config.fakeUser.username}@${config.fakeDomain}`);
      console.log('');

      // Step 4: Create call queue
      console.log('📋 Step 4: Creating call queue...');
      const callQueueData: CallQueue = {
        callqueue: config.fakeCallQueue.extension,
        domain: config.fakeDomain,
        description: config.fakeCallQueue.name,
        'callqueue-dispatch-type': 'Round-robin',
        synchronous: 'yes',
      };

      const callQueueResponse = await this.client.createCallQueue(config.fakeDomain, callQueueData);
      
      if (callQueueResponse.error || callQueueResponse.status !== 200) {
        console.error('❌ Failed to create call queue:', callQueueResponse.error);
        return false;
      }
      
      console.log('✅ Call queue created successfully:', `${config.fakeCallQueue.extension} (${config.fakeCallQueue.name})`);
      console.log('');

      // Step 5: Add user as agent to call queue
      console.log('📋 Step 5: Adding user as agent to call queue...');
      const agentData: Agent = {
        'callqueue-agent-id': `${config.fakeUser.username}@${config.fakeDomain}`,
        'callqueue-agent-availability-type': 'automatic',
        synchronous: 'yes',
      };

      const agentResponse = await this.client.addAgentToCallQueue(
        config.fakeDomain,
        config.fakeCallQueue.extension,
        agentData
      );
      
      if (agentResponse.error || agentResponse.status !== 200) {
        console.error('❌ Failed to add agent to call queue:', agentResponse.error);
        return false;
      }
      
      console.log('✅ Agent added to call queue successfully:', `${config.fakeUser.username}@${config.fakeDomain}`);
      console.log('');

      console.log('🎉 Workflow completed successfully!');
      console.log('📊 Summary:');
      console.log(`   • API Version: ${versionResponse.data.apiversion}`);
      console.log(`   • Domain: ${config.fakeDomain}`);
      console.log(`   • User: ${config.fakeUser.username}@${config.fakeDomain}`);
      console.log(`   • Call Queue: ${config.fakeCallQueue.extension} (${config.fakeCallQueue.name})`);
      console.log(`   • Agent: ${config.fakeUser.username}@${config.fakeDomain} in queue ${config.fakeCallQueue.extension}`);

      return true;

    } catch (error) {
      console.error('💥 Unexpected error during workflow:', error);
      return false;
    }
  }
}