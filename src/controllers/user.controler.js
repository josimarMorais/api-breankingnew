import userService  from '../services/User.service.js';

const create = async (req, res) => {

    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({ massage: "Submit all fields for registration" })
        }

        const user = await userService.createService(req.body)

        if (!user) {
            return res.status(400).res({ message: "Error creating user" })
        }

        res.status(201).send({
            message: "User created successfully",
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            }
        })
    } catch (error) {
        res.status(500).send({ error })
    }
}


const findAll = async (req, res) => {

    try {
        const users = await userService.findAllService()

        if (users.length === 0) {
            return res.status(400).send({ message: "there are no registred users" })
        }
        res.send(users)

    } catch (error) {
        res.status(500).send({ error })
    }
}


const findById = async (req, res) => {

    try {

        const user = req.user
        res.send(user)

    } catch (error) {
        res.status(500).send({ error })
    }
}


const update = async (req, res) => {

    try {
        const { name, username, email, password, avatar, background } = req.body

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({ massage: "Submit at least one fields for update" })
        }

        const { id } = req

        try {
            await userService.updateService(id, name, username, email, password, avatar, background)
        } catch (error) {
            console.log("Não foi dessa vez")
        }

        res.send({ message: "User successfullt updated!" })

    } catch (error) {
        res.status(500).send({ error })
    }
}

export default { create, findAll, findById, update }