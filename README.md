# NetSapiens API Demo Application

A TypeScript Node.js application that demonstrates the complete workflow of using the NetSapiens API to:

1. Check API version
2. Create a domain
3. Create a user in that domain
4. Add a call queue to the domain
5. Add the user as an agent to that call queue

## Features

- **Verbose Output**: Shows detailed status of all API calls
- **Synchronous Operations**: Uses `synchronous=yes` to confirm successful creation before proceeding
- **Error Handling**: Comprehensive error handling with detailed logging
- **Environment Configuration**: Configurable via environment variables
- **TypeScript**: Fully typed for better development experience

## Prerequisites

- Node.js (version 14 or higher)
- npm
- A valid NetSapiens reseller-level bearer token

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment template and configure it:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and set your actual bearer token:
   ```env
   NETSAPIENS_BEARER_TOKEN=your_actual_bearer_token_here
   ```

## Configuration

The application uses the following environment variables:

### Required
- `NETSAPIENS_BEARER_TOKEN`: Your reseller-level bearer token

### Optional (with defaults)
- `NETSAPIENS_SERVER`: API server hostname (default: `ns-api.com`)
- `NETSAPIENS_BASE_URL`: Full API base URL (default: `https://ns-api.com/ns-api/v2`)

### Fake Data (customizable)
- `FAKE_DOMAIN_NAME`: Domain name to create (default: `testcompany-demo.com`)
- `FAKE_RESELLER_NAME`: Reseller name (default: `demo-reseller`)
- `FAKE_USER_USERNAME`: Username to create (default: `john.doe`)
- `FAKE_USER_FIRST_NAME`: User's first name (default: `John`)
- `FAKE_USER_LAST_NAME`: User's last name (default: `Doe`)
- `FAKE_USER_EMAIL`: User's email (default: `john.doe@testcompany-demo.com`)
- `FAKE_CALLQUEUE_EXTENSION`: Call queue extension (default: `2000`)
- `FAKE_CALLQUEUE_NAME`: Call queue name (default: `Support Queue`)

## Usage

### Development Mode
Run with automatic reloading during development:
```bash
npm run dev
```

### Build and Run
Build the TypeScript code and run the compiled JavaScript:
```bash
npm run build
npm start
```

## Example Output

```
🌟 NetSapiens API Demo Application
=====================================

🔧 Validating configuration...
✅ Configuration is valid

🚀 Starting NetSapiens API workflow...

📋 Step 1: Checking API version...
🔄 Making GET request to: /version
✅ GET /version - Status: 200
✅ Response received (200):
{
  "apiversion": "2.0.1",
  "hostname": "api-server-01",
  "current-time": "2024-10-22T10:30:00Z"
}
✅ API Version confirmed: 2.0.1
🖥️  Connected to server: api-server-01
🕐 Server time: 2024-10-22T10:30:00Z

📋 Step 2: Creating domain...
🔄 Making POST request to: /domains
Request data:
{
  "domain": "testcompany-demo.com",
  "reseller": "demo-reseller",
  "description": "Demo domain for testcompany-demo.com",
  "time-zone": "US/Pacific",
  "area-code": 858,
  "caller-id-name": "Demo Company",
  "synchronous": "yes"
}
✅ POST /domains - Status: 200
✅ Domain created successfully: testcompany-demo.com

... (continues for each step)

🎉 Workflow completed successfully!
📊 Summary:
   • API Version: 2.0.1
   • Domain: testcompany-demo.com
   • User: john.doe@testcompany-demo.com
   • Call Queue: 2000 (Support Queue)
   • Agent: john.doe@testcompany-demo.com in queue 2000

✅ Application completed successfully!
```

## Project Structure

```
src/
├── index.ts          # Main entry point
├── config.ts         # Configuration and environment variables
├── types.ts          # TypeScript type definitions
├── api-client.ts     # NetSapiens API client wrapper
└── workflow.ts       # Main workflow orchestrator
```

## API Operations

The application performs the following API operations in sequence:

1. **GET /version** - Confirms API connectivity and version
2. **POST /domains** - Creates a new domain with `synchronous=yes`
3. **POST /domains/{domain}/users** - Creates a user in the domain with `synchronous=yes`
4. **POST /domains/{domain}/callqueues** - Creates a call queue with `synchronous=yes`
5. **POST /domains/{domain}/callqueues/{callqueue}/agents** - Adds the user as an agent with `synchronous=yes`

Each operation waits for a 200 OK response before proceeding to ensure successful creation.

## Error Handling

- Configuration validation before starting
- API response validation at each step
- Detailed error logging with HTTP status codes
- Graceful failure handling with proper exit codes

## Development

- Uses TypeScript for type safety
- Includes source maps for debugging
- Hot reload in development mode with nodemon
- Comprehensive logging for API interactions 
