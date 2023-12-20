import { Router } from 'express';
import { create, findAll} from '../controllers/news.controller.js'
import { authMiddlwere } from '../middlewares/auth.middleware.js';


const router = Router();

router.post("/", authMiddlwere, create)
router.get("/", findAll)


export default router;