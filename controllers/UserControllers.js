const models = require('../models')
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

        res.json({ user })

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
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (validPassword) {
            res.json({user, message: 'login successful'})
        }else {
            res.status(400).json({ message: 'login failed' })
        }

    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}


module.exports = userControllers