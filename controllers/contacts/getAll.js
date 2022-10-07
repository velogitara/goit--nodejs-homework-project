// const contactsOperation = require('../../models/contacts');
const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  // не могу понять ошибку, где нужно исправить схему Users, чтобы заработал populate
  const contacts = await Contact.find({ owner, ...query }, '', { skip, limit }).populate('name');
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
