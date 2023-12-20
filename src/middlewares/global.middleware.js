import mongoose from 'mongoose';
import userService from '../services/User.service.js'

//Verificando se é uma ID válida do MongoDB
export const validId = (req, res, next) => {

    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID!" })
        }

        next()
    } catch (error) {
        res.status(500).send({ error })
    }
}

//Verificando se o usuário existe
export const validUser = async (req, res, next) => {

    try {
        const id = req.params.id

        const user = await userService.findByIdService(id)

        if (!user) {
            return res.status(400).send({ message: "user not found!" })
        }

        req.id = id;
        req.user = user;

        next()
    } catch (error) {
        res.status(500).send({ error })
    }
}

