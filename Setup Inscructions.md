
### Objective 

Use MCP connection to help develop a basic test application to the netsapiens api. 

### Requirements
Mcp client setup pointed to https://docs.ns-api.com/mcp?branch=45.0
Can follow steps here, https://docs.ns-api.com/v45.0/docs/mcp-1

### Setup Claude Code in VS Code. 

### Inital Prompt

* Open Terminal to current folder. 
* Run command to add MCP
* * claude mcp add --transport http ns-api "https://docs.ns-api.com/mcp?branch=45.0"
* Open Claude and confirm MCP is connected. 
* * claude
* * /mcp

### Default prmopt to use. 

Build a new typescript node.js application that will use the netsapiens api mcp server to confirm the version of the code, create domain, create a user in that domain, add a call queue in the domain and then add the user as an agent to that call queue. These are all just examples so please use random fake data where you see fit include a fake domain name. We will need to provide a reseller level bearer token as environment variables. The outbput should be verbose and show all status of the API calls. Use synchronous=yes options to confirm successfull creation before creating the next resource and we should expect 200ok. 