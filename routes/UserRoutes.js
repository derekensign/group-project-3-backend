const UserRoutes = require('express').Router()

const UserControllers = require('../controllers/UserControllers')

UserRoutes.post('/', UserControllers.create)
UserRoutes.post('/login', UserControllers.login)
UserRoutes.post('/cart/:productId', UserControllers.addToCart)
UserRoutes.get('/verify', UserControllers.verify)
UserRoutes.get('/cart', UserControllers.getCart)
UserRoutes.delete('/cart/:cartId', UserControllers.removeFromCart)
UserRoutes.post('/orders', UserControllers.createOrder)
UserRoutes.get('/orders', UserControllers.getOrders)

module.exports = UserRoutes