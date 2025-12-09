import { clientPool } from '../config/db.js';

export const cariJadwalPenerbangan = async (req, res) => {
  const { asal, tujuan, tanggal } = req.query;

  try {
    const [rows] = await clientPool.query(
      'CALL sp_cari_jadwal_penerbangan(?, ?, ?)', 
      [asal, tujuan, tanggal]
    );

    return res.status(200).json({
      message: "Pencarian berhasil",
      data: rows[0]
    });
  } catch (error) {
    console.error("Gagal cari jadwal:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const lihatKursiTersedia = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await clientPool.query('CALL sp_get_kursi_tersedia(?)', [id]);
    return res.status(200).json({
      message: "Data kursi tersedia",
      data: rows[0]
    });
  } catch (error) {
    console.error("Gagal ambil kursi:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};
