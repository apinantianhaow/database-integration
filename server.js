const express = require('express');
const dotenv = require('dotenv');
const { testSequelizeConnection } = require('./config/databaseSequelize');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
testSequelizeConnection();

const app = express();
app.use(express.json());

app.use('/api/v1/products', productRoutes);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'ไม่พบเส้นทางทรัพยากร' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[Server] Web service is running on port: ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`[Process Critical] Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});