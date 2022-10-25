const express = require('express');

const { contacts: ctrl } = require('../../controllers');

// validation

const { auth, validation, ctrlWrapper, isValidId } = require('../../middleWares');
const { joiSchema, favoriteJoiSchema } = require('../../models');
const validateMiddleware = validation(joiSchema);
//

const router = express.Router();

router.get('/', ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(auth), isValidId, ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(auth), validateMiddleware, ctrlWrapper(ctrl.add));

router.put(
  '/:contactId',
  ctrlWrapper(auth),
  isValidId,
  validateMiddleware,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  ctrlWrapper(auth),
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
