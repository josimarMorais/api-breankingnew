import { createService, findAllService } from '../services/News.service.js'


const create = async (req, res) => {

    try {
       
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }

        await createService({
            title, text, banner, user: req.userId

        })


        return res.status(201).send({ message: "News created successfully" })

    } catch (err) {
       return  res.status(500).send({ message: err.message })
    }
}



const findAll = async (req, res) => {

    try {

        const news = await findAllService();

        if (news.length === 0) {
            return res.status(400).send({
                message: "There are no registred news"
            })
        }

        res.send(news);


    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

export { create, findAll }