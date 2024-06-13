import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to the database successfully');

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect to the database', err);
  }
}

main();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1);
});
