import express from 'express';
import { 
  buatPemesanan, 
  tambahPenumpang, 
  prosesBayar, 
  batalkanPesanan, 
  riwayatPemesanan, 
  detailTiket 
} from '../controllers/bookingController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', buatPemesanan);                
router.post('/detail', tambahPenumpang);        
router.post('/:kode/bayar', prosesBayar);       
router.post('/:kode/batal', batalkanPesanan);   

router.get('/', riwayatPemesanan);              
router.get('/:kode', detailTiket);              

export default router;
