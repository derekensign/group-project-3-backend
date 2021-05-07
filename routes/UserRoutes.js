const userRoutes = require('express').Router()

const userControllers = require('../controllers/UserControllers')

userRoutes.post('/', userControllers.create)
userRoutes.post('/login', userControllers.login)
userRoutes.post('/cart/:productId', userControllers.addToCart)
userRoutes.get('/verify', userControllers.verify)
userRoutes.get('/cart', userControllers.getCart)
userRoutes.delete('/cart/:cartId', userControllers.removeFromCart)

module.exports = userRoutes