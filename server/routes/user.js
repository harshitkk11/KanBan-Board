const express = require('express');

const { createUser,
        getUser } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', createUser)

router.post('/login', getUser)

module.exports = router;