const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middleWares');

const router = express.Router();

const { auth: ctrl } = require('../../controllers');

const { registerSchema, loginSchema } = require('../../models');

router.post('/register', validation(registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(loginSchema), ctrlWrapper(ctrl.logIn));

router.get('/logout', ctrlWrapper(auth), ctrlWrapper(ctrl.logOut));

module.exports = router;
