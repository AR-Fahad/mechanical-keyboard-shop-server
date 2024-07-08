/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';
import app from './app';

let server: Server;

async function main() {
  await mongoose.connect(config.databaseUrl as string);
  server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

main();

// for unhandledRejection (asynchronous)
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected, shutting down the server...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// for uncaughtException (synchronous)
process.on('uncaughtException', () => {
  console.log('uncaughtException is detected, shutting down the server...');
  process.exit(1);
});
