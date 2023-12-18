import bcrypt from 'bcrypt';
import { loginService, generateToken } from '../services/Auth.service.js';


const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await loginService(email);

        if(!user){
            return res.status(404).send({message: "User or password is invalid!"})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if(!passwordIsValid){
            return res.status(404).send({message: "User or password is invalid!"})
        }

        const token = generateToken(user.id)

        res.send({token});

    } catch (err) {
        res.status(500).send(err.message);
    }

}


export { login }
