import { clientPool } from '../config/db.js';

export const buatPemesanan = async (req, res) => {
  const id_pelanggan = req.user.id_user;

  try {
    const [rows] = await clientPool.query('CALL sp_buat_reservasi(?)', [id_pelanggan]);
    const data = rows[0]?.[0];

    return res.status(201).json({
      message: "Reservasi berhasil dibuat",
      data: data
    });
  } catch (error) {
    console.error("Gagal buat booking:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const tambahPenumpang = async (req, res) => {
  const { id_reservasi, nama_dpn, nama_blkg, tgl_lahir, jenis_kelamin, id_kursi } = req.body;

  try {
    await clientPool.query(
      'CALL sp_tambah_penumpang_dan_tiket(?, ?, ?, ?, ?, ?)',
      [id_reservasi, nama_dpn, nama_blkg, tgl_lahir, jenis_kelamin, id_kursi]
    );

    return res.status(201).json({ message: "Penumpang dan tiket berhasil ditambahkan." });
  } catch (error) {
    console.error("Gagal tambah penumpang:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const prosesBayar = async (req, res) => {
  const { kode } = req.params; 
  const { id_reservasi, metode_pembayaran, jumlah_pembayaran } = req.body;

  try {
    await clientPool.query(
      'CALL sp_proses_pembayaran(?, ?, ?)',
      [id_reservasi, metode_pembayaran, jumlah_pembayaran]
    );
    return res.status(200).json({ message: "Pembayaran berhasil diproses." });
  } catch (error) {
    console.error("Gagal bayar:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const batalkanPesanan = async (req, res) => {
  const { kode } = req.params;
  const id_pelanggan = req.user.id_user;

  try {
    await clientPool.query(
      'CALL sp_batalkan_reservasi(?, ?)', 
      [id_pelanggan, kode]
    );
    return res.status(200).json({ message: "Pesanan berhasil dibatalkan" });
  } catch (error) {
    console.error("Gagal batal:", error);
    return res.status(400).json({ error: "Gagal membatalkan (Mungkin sudah lunas atau salah kode)." });
  }
};

export const riwayatPemesanan = async (req, res) => {
  const { kode } = req.query;

  try {
    const [rows] = await clientPool.query('CALL sp_get_daftar_reservasi(?)', [kode || null]);

    return res.status(200).json({
      message: "Riwayat pesanan",
      data: rows[0]
    });
  } catch (error) {
    console.error("Gagal ambil riwayat:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const detailTiket = async (req, res) => {
  const { kode } = req.params;

  try {
    const [rows] = await clientPool.query('CALL sp_get_detail_tiket(?)', [kode]);
    return res.status(200).json({
      message: "Detail tiket ditemukan",
      data: rows[0]
    });
  } catch (error) {
    console.error("Gagal ambil detail:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};
