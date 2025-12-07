import { adminPool } from '../config/db.js';

export const lihatBandara = async (req, res) => {
  const { nama } = req.query;
  try {
    const [rows] = await adminPool.query('CALL sp_get_daftar_bandara(?)', [nama || null]);
    return res.status(200).json({ message: "Data bandara berhasil diambil", data: rows[0] });
  } catch (error) {
    console.error("Gagal ambil bandara:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const tambahBandara = async (req, res) => {
  const { nama_bandara, nama_kota } = req.body;
  try {
    await adminPool.query('CALL sp_tambah_bandara(?, ?)', [nama_bandara, nama_kota]);
    return res.status(201).json({ message: "Bandara berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal tambah bandara:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const hapusBandara = async (req, res) => {
  const { id } = req.params;
  try {
    await adminPool.query('CALL sp_hapus_bandara(?)', [id]);
    return res.status(200).json({ message: "Bandara berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus bandara:", error);
    return res.status(500).json({ error: "Gagal menghapus bandara (Sedang digunakan)." });
  }
};

export const lihatMaskapai = async (req, res) => {
  const { nama } = req.query;
  try {
    const [rows] = await adminPool.query('CALL sp_get_daftar_maskapai(?)', [nama || null]);
    return res.status(200).json({ message: "Data maskapai berhasil diambil", data: rows[0] });
  } catch (error) {
    console.error("Gagal ambil maskapai:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const tambahMaskapai = async (req, res) => {
  const { nama_maskapai } = req.body;
  try {
    await adminPool.query('CALL sp_tambah_maskapai(?)', [nama_maskapai]);
    return res.status(201).json({ message: "Maskapai berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal tambah maskapai:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const hapusMaskapai = async (req, res) => {
  const { id } = req.params;
  try {
    await adminPool.query('CALL sp_hapus_maskapai(?)', [id]);
    return res.status(200).json({ message: "Maskapai berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus maskapai:", error);
    return res.status(500).json({ error: "Gagal menghapus maskapai." });
  }
};

export const lihatRute = async (req, res) => {
  const { asal, tujuan } = req.query;
  try {
    const [rows] = await adminPool.query('CALL sp_get_daftar_rute(?, ?)', [asal || null, tujuan || null]);
    return res.status(200).json({ message: "Data rute berhasil diambil", data: rows[0] });
  } catch (error) {
    console.error("Gagal ambil rute:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const tambahRute = async (req, res) => {
  const { id_bandara_asal, id_bandara_tujuan, durasi_menit } = req.body;
  try {
    await adminPool.query('CALL sp_tambah_rute(?, ?, ?)', [id_bandara_asal, id_bandara_tujuan, durasi_menit]);
    return res.status(201).json({ message: "Rute berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal tambah rute:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const hapusRute = async (req, res) => {
  const { id } = req.params;
  try {
    await adminPool.query('CALL sp_hapus_rute(?)', [id]);
    return res.status(200).json({ message: "Rute berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus rute:", error);
    return res.status(500).json({ error: "Gagal menghapus rute." });
  }
};

export const tambahPenerbangan = async (req, res) => {
  const { id_maskapai, id_rute, waktu_penerbangan, nomor_penerbangan } = req.body;
    
  try {
    await adminPool.query(
      'CALL sp_tambah_penerbangan(?, ?, ?, ?)',
      [id_maskapai, id_rute, waktu_penerbangan, nomor_penerbangan]
    );
        
    return res.status(201).json({ message: "Jadwal penerbangan berhasil dibuat" });
  } catch (error) {
    console.error("Gagal buat jadwal:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const updateJadwal = async (req, res) => {
  const { id } = req.params;
  const { waktu_baru } = req.body;
  try {
    await adminPool.query('CALL sp_update_jadwal_penerbangan(?, ?)', [id, waktu_baru]);
    return res.status(200).json({ message: "Jadwal berhasil diupdate" });
  } catch (error) {
    console.error("Gagal update jadwal:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

export const hapusPenerbangan = async (req, res) => {
  const { id } = req.params;
  try {
    await adminPool.query('CALL sp_hapus_penerbangan(?)', [id]);
    return res.status(200).json({ message: "Penerbangan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus penerbangan:", error);
    return res.status(500).json({ error: "Gagal menghapus penerbangan." });
  }
};

export const tambahKursi = async (req, res) => {
  const { id_penerbangan, nomor_kursi, kelas, harga } = req.body;

  try {
    await adminPool.query(
      'CALL sp_tambah_kursi(?, ?, ?, ?)',
      [id_penerbangan, nomor_kursi, kelas, harga]
    );
    return res.status(201).json({ message: "Kursi berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal tambah kursi:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}

export const lihatPengguna = async (req, res) => {
  const { nama } = req.query;
  try {
    const [rows] = await adminPool.query('CALL sp_get_daftar_pelanggan(?)', [nama || null]);
    return res.status(200).json({ message: "Data pelanggan diambil", data: rows[0] });
  } catch (error) {
    console.error("Gagal ambil user:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};
