import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../services/User.service.js';

dotenv.config();

export const authMiddlwere = (req, res, next) => {

    try {
        //pegando o toker que vem do header
        const { authorization } = req.headers;

        //verificando se não está vazio
        if (!authorization) {
            return res.sendStatus(401)
        }

        //dividindo o array
        const parts = authorization.split(" ");

        //o tamanho do array sempre tem que ser 2.
        if (parts.length !== 2) {
            return res.sendStatus(401)
        }

        //desestruturando o array
        const [schema, token] = parts;

        //verificando se o esquema é igual a Bearer
        if (schema !== "Bearer") {
            return res.sendStatus(401)
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                console.log(error)
            }

            const user = await userService.findByIdService(decoded.id)
            
            if( !user || !user.id ) {
                return res.status(401).send({ message: "Invalid Token!"});
            }

            req.userId = user.id;

            return next();

        });

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}