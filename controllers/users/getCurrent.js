// const { User } = require('../../models');

const getCurrent = async (req, res) => {
  const { name, email, subscription, createdAt } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        name,
        email,
        subscription,
        created: createdAt,
      },
    },
  });
};
module.exports = getCurrent;
