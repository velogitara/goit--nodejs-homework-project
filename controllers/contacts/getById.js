const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw new NotFound(`contact with id ${contactId} not found`);

    // Подскажите, как в new NotFound передать объект как в примере ниже
    // ======================

    // res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `contact with id ${contactId} not found`,
    // });
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
