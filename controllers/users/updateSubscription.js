const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(req.body);

  const result = await User.findByIdAndUpdate(_id, { subscription: subscription }, { new: true });
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
};

module.exports = updateSubscription;
