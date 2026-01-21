const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

// -------------------------------------------------------------------------- //

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

// -------------------------------------------------------------------------- //

app.use(express.json());
app.use(morgan('combined'));

// -------------------------------------------------------------------------- //

if (!process.env.MONGODB_URI) {
  console.error('[ERROR] MONGODB_URI environment variable is required');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('[INFO] Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('[ERROR] Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// -------------------------------------------------------------------------- //

// Return 200 if MongoDB is reachable, 503 otherwise
app.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.sendStatus(200);
  } catch (err) {
    console.error('[ERROR] Failed Health Check:', err);
    res.sendStatus(503);
  }
});

// -------------------------------------------------------------------------- //

app.use('/api', require('./routes/index.routes'));

// -------------------------------------------------------------------------- //

const gracefulShutdown = async (server) => {
  try {
    console.log('[INFO] Attempting to gracefully shut down server');

    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    console.log('[INFO] Successfully shutdown server');

    await mongoose.connection.close();
    console.log('[INFO] Successfully closed MongoDB connection');

    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Error during server shutdown:', err);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log('[INFO] Server listening on port', PORT);
});

process.on('SIGINT', () => gracefulShutdown(server));
process.on('SIGTERM', () => gracefulShutdown(server));
