const contactsOperation = require('../../models/contacts');
const createError = require('http-errors');

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsOperation.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404, `contact with id ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
};

module.exports = updateById;
