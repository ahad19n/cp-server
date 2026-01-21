const jwt = require('jsonwebtoken');

const Otp = require('../models/Otp.model');
const User = require('../models/User.model');

const { resp, isValidE164NoPlus, generateOtpCode } = require('../helpers');

// -------------------------------------------------------------------------- //

exports.generateOtp = async (req, res) => {
  const { number } = req.body;

  if (!number) return resp(res, 400, 'Missing or empty fields (number).');
  if (!isValidE164NoPlus(phoneNumber)) return resp(res, 400, `Field 'number' is not valid E164 (no plus).`);

  try {
    const code = generateOtpCode(6);
    await Otp.create({ code, number,expiry: new Date(Date.now() + 5 * 60 * 1000) });
  }
  catch (err) {
    if (err.code === 11000) return resp(res, 429, 'Too many requests. Try again later.');
    else throw err;
  }

  // TODO: Send code via WhatsApp; 502 Failed to send OTP. Try again later.
  resp(res, 200, 'Sucessfully sent OTP via WhatsApp.');
};

// -------------------------------------------------------------------------- //

exports.verifyOtp = async (req, res) => {
  const { code, number } = req.body;

  if (!code || !number) {
    return resp(res, 400, 'Missing or empty fields (code, number).');
  }

  const otp = await Otp.findOne({ number });

  if (!otp) return resp(res, 401, 'Invalid or expired OTP.');
  if (otp.tries <= 0) return resp(res, 429, 'Too many requests. Try again later.');

  if (otp.code != code) {
    otp.tries -= 1;
    await otp.save();
    return resp(res, 401, 'Invalid or expired OTP.');
  }

  await Otp.deleteOne({ _id: otp._id });
  resp(res, 200, 'OTP verified');
};
