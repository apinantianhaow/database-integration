const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseSequelize');

const ProductSequelize = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sku: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: { is: /^[A-Z0-9]{6,10}$/i }
  },
  name: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: { len: [3, 120] } // แก้จาก [11] ตามโจทย์ระบุ 3-120
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  category: {
    type: DataTypes.ENUM('Electronics', 'Hardware', 'Books', 'Software'),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = ProductSequelize;