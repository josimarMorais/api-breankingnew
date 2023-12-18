import { createService, findAllService } from '../services/News.service.js'


const create = async (req, res) => {

    try {
        
        const {title, text, banner } = req.body;

        if(!title || !text || !banner){
            res.status(400).send({ message: "Submit all fields for registration" })
        }

        await createService({
            title, text, banner, id: "objectidFake1"

        })


        res.status(201).send({ message: "News created successfully" })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}



const findAll = (req, res) => {
    const news = [];

    res.send({ news })

}

export { create, findAll }