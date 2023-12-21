import { Router } from 'express';
import { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment, deleteComment} from '../controllers/news.controller.js'
import { authMiddlwere } from '../middlewares/auth.middleware.js';


const router = Router();

router.post("/", authMiddlwere, create)
router.get("/", findAll)
router.get("/top", topNews)
router.get("/search", searchByTitle)
router.get("/byUser", authMiddlwere, byUser)
router.get("/:id", authMiddlwere, findById)
router.patch("/:id", authMiddlwere, update)
router.delete("/:id", authMiddlwere, erase)
router.patch("/like/:id", authMiddlwere, likeNews)
router.patch("/comment/:id", authMiddlwere, addComment)
router.patch("/comment/:idNews/:idComment", authMiddlwere, deleteComment)

export default router;