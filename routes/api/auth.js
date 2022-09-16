const express = require('express');

const router = express.Router();

const {ctrlWrapper} = require('../../helpers');

const ctrl = require('../../controllers/auth')

const {validationContacts, authenticate, upload} = require('../../middlewares/');

const {schemas} = require('../../models/user');

router.post('/signup', validationContacts(schemas.signupSchema), ctrlWrapper(ctrl.signup));

router.post('/login', validationContacts(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;