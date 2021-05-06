const userRoutes = require('express').Router()

const userControllers = require('../controllers/UserControllers')

userRoutes.post('/', userControllers.create)
userRoutes.post('/login', userControllers.login)

module.exports = userRoutes