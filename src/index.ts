#!/usr/bin/env node

import { validateConfig } from './config.js';
import { NetSapiensWorkflow } from './workflow.js';

async function main(): Promise<void> {
  console.log('🌟 NetSapiens API Demo Application');
  console.log('=====================================\n');

  try {
    // Validate configuration
    console.log('🔧 Validating configuration...');
    validateConfig();
    console.log('✅ Configuration is valid\n');

    // Execute the workflow
    const workflow = new NetSapiensWorkflow();
    const success = await workflow.executeFullWorkflow();

    if (success) {
      console.log('\n✅ Application completed successfully!');
      process.exit(0);
    } else {
      console.log('\n❌ Application completed with errors!');
      process.exit(1);
    }

  } catch (error) {
    console.error('💥 Fatal error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Run the application
main().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});