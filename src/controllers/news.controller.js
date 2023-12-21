import { createService, findAllService, countNewsService, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeNewsService, deletelikeNewsService, addCommentService, deleteCommentService } from '../services/News.service.js'


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
        return res.status(500).send({ message: err.message })
    }
}


const findAll = async (req, res) => {

    try {
        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5
        }

        if (!offset) {
            offset = 0
        }

        const news = await findAllService(offset, limit);
        
        const total = await countNewsService();

        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;

        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;


        if (news.length === 0) {
            return res.status(400).send({
                message: "There are no registred News"
            })
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar

            }))
        });

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}


const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(400).send({ message: "There is no registred News" })
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}


const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }

}


const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no News with this title" })
        }

        return res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }))

        })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


const byUser = async (req, res) => {
    try {

        const id = req.userId;

        const news = await byUserService(id);

        return res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar

            }))
        })


    } catch (err) {
        return res.status(500).send({ message: err.message })
    }

}


const update = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const { id } = req.params;

        if (!title && !banner && !text) {
            return res.status(400).send({ message: "Submit at least one field to update the News" })
        }

        const news = await findByIdService(id);

        if (news.user.id != req.userId) {
            return res.status(400).send({ message: "You didn't update this News." })
        }

        await updateService(id, title, text, banner);

        return res.send({ message: "News successfully updated!" });


    } catch (err) {
        return res.status(500).send({ message: err.message })
    }

}


const erase = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        if (news.user.id != req.userId) {
            return res.status(400).send({ message: "You didn't delete this News." })
        }

        await eraseService(id);

        return res.send({ message: "News deleted successfully!" });


    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const newsLiked = await likeNewsService(id, userId);

        if (!newsLiked) {
            await deletelikeNewsService(id, userId)
            return res.status(200).send({ message: "Like succefully removed" })
        }

        return res.send({ message: "Like done succefully" });
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }

}


const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).send({ message: "Write a message to comment" })
        }

        await addCommentService(id, comment, userId);

        return res.send({ message: "Comment successfully completed" })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


const deleteComment = async (req, res) => {
    try {
        const { idNews, idComment } = req.params

        const userId = req.userId

        const news = await findByIdService(idNews);

        if (news.user._id != userId) {
            return res.status(400).send({ message: "You can't delete this comment" })
        }

        const commentDeleted = await deleteCommentService(idNews, idComment, userId)

        const commentFinder = commentDeleted.comments.find((comment) => comment.idComment === idComment);

        if (!commentFinder) {
            return res.status(400).send({ message: "Comment not found" })
        }

        return res.send({ message: "Comment removed successfully" })
    }
    catch (erro) {
        res.status(500).send({ message: erro.message })
    }
}

export { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment, deleteComment }