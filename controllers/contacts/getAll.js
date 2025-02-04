const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner, ...query }, '', { skip, limit }).populate(
    'owner',
    'name email subscription'
  );
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
