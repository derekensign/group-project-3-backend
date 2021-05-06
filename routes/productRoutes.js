const productRoutes = require('express').Router()

const productController = require('../controllers/productController')

productRoutes.get('/', productController.getAll)
productRoutes.get('/:id', productController.getOne)

module.exports = productRoutes