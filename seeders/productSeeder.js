const sequelize = require('../config/databaseSequelize');
const Product = require('../models/ProductSequelize');

const seedProducts = [
  { sku: 'PROD1001', name: 'Mechanical Keyboard RGB', price: 2590.00, category: 'Electronics', stock: 50 },
  { sku: 'PROD1002', name: 'Wireless Ergonomic Mouse', price: 1290.00, category: 'Electronics', stock: 100 },
  { sku: 'PROD1003', name: 'Node.js Book', price: 450.00, category: 'Books', stock: 20 },
  { sku: 'PROD1004', name: 'PostgreSQL Guide', price: 550.00, category: 'Books', stock: 15 },
  { sku: 'PROD1005', name: 'IDE License 1-Year', price: 3200.00, category: 'Software', stock: 99 }
];

const importSeedData = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    await Product.destroy({ truncate: true, cascade: true });
    await Product.bulkCreate(seedProducts, { validate: true });
    console.log('[Seed] Seed data imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
    process.exit(1);
  }
};
importSeedData();