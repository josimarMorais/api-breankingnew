import { login } from '../controllers/auth.controller.js';
import { Router } from 'express';
const router = Router();


router.post("/", login)


export default router;