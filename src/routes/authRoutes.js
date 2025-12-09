import express from 'express';
import { loginPelanggan, loginAdmin, registrasi } from '../controllers/authController.js';

const router = express.Router();

router.post('/registrasi', registrasi);
router.post('/login', loginPelanggan);
router.post('/admin/login', loginAdmin);

export default router;
