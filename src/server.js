const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const { resp, gracefulShutdown } = require('./func');

// -------------------------------------------------------------------------- //

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

// -------------------------------------------------------------------------- //

app.use(express.json());
app.use(morgan('combined'));

// -------------------------------------------------------------------------- //

const required = ['WAGW_URL', 'JWT_SECRET', 'MONGODB_URI'];

for (const v of required) {
  if (!process.env[v]) {
    console.error(`[ERROR] ${v} environment variable is required`);
    process.exit(1);
  }
}

// -------------------------------------------------------------------------- //

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('[INFO] Successfully connected to MongoDB'))
  .catch(err => {
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

app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  resp(res, 500, 'Internal Server Error');
});

// -------------------------------------------------------------------------- //

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('[INFO] Server listening on port', process.env.PORT || 3000);
});

process.on('SIGINT', () => gracefulShutdown(server));
process.on('SIGTERM', () => gracefulShutdown(server));
