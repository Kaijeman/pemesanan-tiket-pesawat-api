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
  lihatPenerbanganAdmin,
  tambahPenerbangan, 
  updateJadwal, 
  hapusPenerbangan,
  lihatKursiAdmin,
  tambahKursi,
  hapusKursi,
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
router.get('/penerbangan', lihatPenerbanganAdmin);
router.post('/penerbangan', tambahPenerbangan);
router.put('/penerbangan/:id', updateJadwal);
router.delete('/penerbangan/:id', hapusPenerbangan);

// Kursi
router.get('/penerbangan/:id/kursi', lihatKursiAdmin);
router.post('/kursi', tambahKursi);
router.delete('/kursi/:id', hapusKursi);

// Pengguna
router.get('/pengguna', lihatPengguna);

export default router;
