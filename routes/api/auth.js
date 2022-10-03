const express = require('express');

const { validation, ctrlWrapper, isValidId } = require('../../middleWares');

const router = express.Router();

const { auth: ctrl } = require('../../controllers');

router.post('/register', ctrlWrapper(ctrl.register));

// router.post('/login', ctrlWrapper(ctrl.login));

module.exports = router;
