const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'เกิดข้อผิดพลาดภายในเครื่องแม่ข่าย',
    errors: []
  };

  if (err.name === 'SequelizeUniqueConstraintError') {
    customError.statusCode = 409;
    customError.message = 'เกิดการส่งข้อมูลซ้ำ';
  }

  if (err.name === 'SequelizeValidationError') {
    customError.statusCode = 400;
    customError.message = 'ข้อมูลไม่ผ่านเกณฑ์การตรวจสอบ';
    customError.errors = err.errors.map((e) => e.message);
  }

  return res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    errors: customError.errors.length > 0 ? customError.errors : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
module.exports = errorHandler;