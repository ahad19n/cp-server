const jwt = require('jsonwebtoken');
const Otp = require('../models/Otp.model');
const User = require('../models/User.model');
const { resp, isValidE164NoPlus, generateOtpCode } = require('../helpers');

// -------------------------------------------------------------------------- //

exports.generateOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) return resp(res, 400, 'phoneNumber is required');
  if (!isValidE164NoPlus(phoneNumber)) return resp(res, 400, 'phoneNumber is not valid');

  const otpCode = generateOtpCode(6);
  await OtpCodeModel.deleteMany({ phoneNumber });

  await OtpCodeModel.create({
    otpCode, phoneNumber,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  // TODO: send code via whatsapp
  console.log(`[DEV] Generated otpCode ${otpCode} for phoneNumber ${phoneNumber}`);

  resp(res, 200, 'Sucessfully sent OTP via WhatsApp');
};

// -------------------------------------------------------------------------- //

exports.verifyOtp = async (req, res) => {
  const { code, number } = req.body;

  if (!code || !number) {
    return resp(res, 400, 'Missing or empty fields (code, number)');
  }

  const otp = await Otp.findOne({ number });

  if (!otp || otp.code !== code) {
    return resp(res, 401, 'Invalid or expired OTP');
  }

  await Otp.deleteOne({ number });
  await User.updateOne({ number }, { isVerified: true });

  const user = User.findOne({ number });

};
