import express from 'express';
import { 
  buatReservasi, 
  tambahPenumpang, 
  prosesBayar, 
  batalkanReservasi, 
  riwayatReservasi, 
  detailTiket 
} from '../controllers/bookingController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', buatReservasi);                
router.post('/detail', tambahPenumpang);        
router.post('/:kode/bayar', prosesBayar);       
router.post('/:kode/batal', batalkanReservasi);   

router.get('/', riwayatReservasi);              
router.get('/:kode', detailTiket);              

export default router;
