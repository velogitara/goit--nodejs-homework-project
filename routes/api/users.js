const express = require('express');

const { auth, ctrlWrapper, validation } = require('../../middleWares');

const { subscriptionJoiSchema } = require('../../models');

const router = express.Router();

const { users: ctrl } = require('../../controllers');

router.get('/current', ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

router.patch(
  '/',
  ctrlWrapper(auth),
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch('/avatars', ctrlWrapper(auth));

module.exports = router;
