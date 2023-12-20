import { Router } from 'express';
import { create, findAll, topNews, findById, searchByTitle } from '../controllers/news.controller.js'
import { authMiddlwere } from '../middlewares/auth.middleware.js';


const router = Router();

router.post("/", authMiddlwere, create)
router.get("/", findAll)
router.get("/top", topNews)

router.get("/search", searchByTitle)

router.get("/:id", findById)


export default router;