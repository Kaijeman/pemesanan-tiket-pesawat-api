import express from 'express';
import { cariJadwal, lihatKursiTersedia } from '../controllers/flightController.js';

const router = express.Router();

router.get('/cari', cariJadwal);
router.get('/:id/kursi', lihatKursiTersedia);

export default router;
