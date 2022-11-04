const { User } = require('../../models/user');
const { Conflict } = require('http-errors');
const { createVerifyEmail, sendEmail } = require('../../helpers');

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new Conflict('Verification has already been passed');
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    message: 'Verify email sent',
  });
};

module.exports = resendVerify;
