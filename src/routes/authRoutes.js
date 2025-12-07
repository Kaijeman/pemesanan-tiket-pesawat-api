import express from 'express';
import { login, registrasi } from '../controllers/authController.js';

const router = express.Router();

router.post('/registrasi', registrasi);
router.post('/login', login);

export default router;
