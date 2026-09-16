const Product = require('../models/ProductSequelize');

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (error) { next(error); }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json({ success: true, data: products });
  } catch (error) { next(error); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'ไม่พบข้อมูล' });
    return res.status(200).json({ success: true, data: product });
  } catch (error) { next(error); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const [updatedRowsCount, updatedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    if (updatedRowsCount === 0) return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลที่ต้องการแก้ไข' });
    return res.status(200).json({ success: true, data: updatedRows });
  } catch (error) { next(error); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedCount = await Product.destroy({ where: { id: req.params.id } });
    if (!deletedCount) return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลที่ต้องการลบ' });
    return res.status(200).json({ success: true, message: 'ลบข้อมูลสำเร็จ' });
  } catch (error) { next(error); }
};