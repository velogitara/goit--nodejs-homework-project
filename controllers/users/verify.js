const { User } = require('../../models/user');

const { NotFound } = require('http-errors');

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  console.log(verificationToken);
  if (!user) {
    throw new NotFound('user not found');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });
  res.json({
    message: 'Email verify successful',
  });
};

module.exports = verify;
