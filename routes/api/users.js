const express = require('express');

const { auth, ctrlWrapper, upload, validation } = require('../../middleWares');

const { subscriptionJoiSchema, verifyEmailSchema } = require('../../models');

const router = express.Router();

const { users: ctrl } = require('../../controllers');

router.get('/current', ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post('/verify', validation(verifyEmailSchema), ctrlWrapper(ctrl.resendVerify));

router.patch(
  '/',
  ctrlWrapper(auth),
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  '/avatars',
  ctrlWrapper(auth),
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
