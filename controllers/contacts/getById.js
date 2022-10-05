const { Contact } = require('../../models');
const { NotFound } = require('http-errors');
// const createError = require('http-errors');

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw new NotFound(`contact with id ${contactId} not found`);
    // throw new createError[400 || 'BadRequest'](['BadRequest']);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
