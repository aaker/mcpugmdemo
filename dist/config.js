import * as dotenv from 'dotenv';
dotenv.config();
export const config = {
    bearerToken: process.env.NETSAPIENS_BEARER_TOKEN || '',
    server: process.env.NETSAPIENS_SERVER || 'ns-api.com',
    baseUrl: process.env.NETSAPIENS_BASE_URL || 'https://ns-api.com/ns-api/v2',
    fakeDomain: process.env.FAKE_DOMAIN_NAME || 'testcompany-demo.com',
    fakeReseller: process.env.FAKE_RESELLER_NAME || 'demo-reseller',
    fakeUser: {
        username: process.env.FAKE_USER_USERNAME || 'john.doe',
        firstName: process.env.FAKE_USER_FIRST_NAME || 'John',
        lastName: process.env.FAKE_USER_LAST_NAME || 'Doe',
        email: process.env.FAKE_USER_EMAIL || 'john.doe@testcompany-demo.com',
    },
    fakeCallQueue: {
        extension: process.env.FAKE_CALLQUEUE_EXTENSION || '2000',
        name: process.env.FAKE_CALLQUEUE_NAME || 'Support Queue',
    },
};
export function validateConfig() {
    if (!config.bearerToken || config.bearerToken === 'your_reseller_level_bearer_token_here') {
        throw new Error('NETSAPIENS_BEARER_TOKEN is required. Please set it in your .env file.');
    }
}
//# sourceMappingURL=config.js.map