const express = require('express');

const { contacts: ctrl } = require('../../controllers');
// validation

const { validation, ctrlWrapper } = require('../../middleWares');
const { joiSchema, favoriteJoiSchema } = require('../../models');
const validateMiddleware = validation(joiSchema);
//

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch(
  '/:contactId/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

module.exports = router;
