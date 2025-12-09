import express from 'express';
import { cariJadwalPenerbangan, lihatKursiTersedia } from '../controllers/flightController.js';

const router = express.Router();

router.get('/cari', cariJadwalPenerbangan);
router.get('/:id/kursi', lihatKursiTersedia);

export default router;
