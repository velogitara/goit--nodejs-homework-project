const { isValidObjectId } = require('mongoose');
const { NotFound } = require('http-errors');

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    throw new NotFound(`id ${contactId} is not correct format `);
  }
  next();
};

module.exports = isValidId;
