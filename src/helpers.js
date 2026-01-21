const { randomInt } = require('crypto');

exports.isValidE164NoPlus = (number) => {
  return /^[1-9]\d{7,14}$/.test(number);
};

exports.generateOtpCode = (length) => {
  let otp = `${randomInt(1, 10)}`;
  for (let i = 1; i < length; i++)
    otp += randomInt(0, 10);
  return otp;
}

exports.resp = (res, code, message, data = {}) => {
  return res.status(code).json({
    success: (code >= 200 && code <= 299),
    message,
    data
  })
};
