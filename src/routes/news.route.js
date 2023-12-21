import { Router } from 'express';
import { create, findAll, topNews, findById, searchByTitle, byUser, update} from '../controllers/news.controller.js'
import { authMiddlwere } from '../middlewares/auth.middleware.js';


const router = Router();

router.post("/", authMiddlwere, create)
router.get("/", findAll)
router.get("/top", topNews)
router.get("/search", searchByTitle)
router.get("/byUser", authMiddlwere, byUser)
router.get("/:id", authMiddlwere, findById)
router.patch("/:id", authMiddlwere, update)


export default router;