import express from 'express';
import { 
  lihatBandara, 
  tambahBandara, 
  hapusBandara,
  lihatMaskapai, 
  tambahMaskapai, 
  hapusMaskapai,
  lihatRute, 
  tambahRute, 
  hapusRute,
  tambahPenerbangan, 
  updateJadwal, 
  hapusPenerbangan,
  tambahKursi,
  lihatPengguna
} from '../controllers/adminController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware: Butuh Token Admin
router.use(verifyToken, verifyAdmin);

// Bandara
router.get('/bandara', lihatBandara);
router.post('/bandara', tambahBandara);
router.delete('/bandara/:id', hapusBandara);

// Maskapai
router.get('/maskapai', lihatMaskapai);
router.post('/maskapai', tambahMaskapai);
router.delete('/maskapai/:id', hapusMaskapai);

// Rute
router.get('/rute', lihatRute);
router.post('/rute', tambahRute);
router.delete('/rute/:id', hapusRute);

// Penerbangan
router.post('/penerbangan', tambahPenerbangan);
router.put('/penerbangan/:id', updateJadwal);
router.delete('/penerbangan/:id', hapusPenerbangan);

// Kursi
router.post('/kursi', tambahKursi);

// Pengguna
router.get('/pengguna', lihatPengguna);

export default router;
