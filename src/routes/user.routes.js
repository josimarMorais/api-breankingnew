const route = require('express').Router()
const userController = require('../controllers/user.controler')

route.post("/", userController.create)



module.exports = route