const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userControllers = {}

userControllers.create = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt)
        const user = await models.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })

        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)

        const userObj = {
            id: encryptedId,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName,
            email: user.dataValues.email,
            password: user.dataValues.password
        }

        res.json({
            user: userObj
        })

    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

userControllers.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email,
            }
        })

        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        const userObj = {
            id: encryptedId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }

        if (validPassword) {
            res.json({
                user: userObj,
                message: 'login successful'
            })
        }else {
            res.status(400).json({ message: 'login failed' })
        }

    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

userControllers.verify = async (req, res) => {
    try {
        let encryptedId = req.headers.authorization
        // console.log('encryptedId', encryptedId);
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        // console.log(user, encryptedId);

        const userObj = {
            id: encryptedId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }

        if (user) {
            res.json({
                message: 'Verified user',
                user: userObj
            })
        } else {
            res.json({
                status: 404,
                message: 'No user logged in'
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /users/verify',
            error
        })
    }
}


userControllers.addToCart = async (req, res) => {
    try {
        let encryptedId = req.headers.authorization

        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        
        const product = await models.product.findOne({
            where: {
                id: req.params.productId
            }
        })

        const cartItem = await models.cart.create({
            productId: product.id,
            userId: decryptedId.userId 
        })
        res.json({cartItem, message: 'product added to cart'})

    } catch (error) {
        res.json({error})
    }
}

userControllers.removeFromCart = async (req, res) => {
    try {
        const deletedItem = await models.cart.destroy({
            where: {
                createdAt: req.params.cartId
            }
        })

        res.json({deletedItem, message: 'product removed from cart'})

    } catch (error) {
        res.json({error})
    }
}

userControllers.getCart = async (req, res) => {
    try {
        let encryptedId = req.headers.authorization
        console.log('encryptedId', encryptedId)

        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        // const user = await models.user.findOne({
        //     where: {
        //         id: decryptedId.userId
        //     }
        // })
        // console.log('foundUser', user);

        const cart = await models.cart.findAll({
            where: {
                userId: decryptedId.userId
            },
            include: models.product
        })
        console.log('foundCart', cart)
        const products = []
        cart.forEach(obj => {

            products.push({...obj.product.dataValues, cartId: obj.createdAt})
            console.log(products)
        })

        res.json({ products, message: 'cart contents'})

    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

// imageController.allFavs = async (req, res) => {
//     try {
//         const user = await models.user.findOne({
//             where: {
//                 id: req.headers.authorization
//             }
//         })

//         const favImages = await user.getImages() 
//         res.json({ favImages })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

module.exports = userControllers