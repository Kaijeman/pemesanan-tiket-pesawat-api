import { clientPool } from '../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const registrasi = async (req, res) => {
  const { nama_dpn, nama_blkg, email, password, tanggal_lahir, jenis_kelamin } = req.body;

  try {
    await clientPool.query(
      'CALL sp_registrasi_pelanggan(?, ?, ?, ?, ?, ?)',
      [nama_dpn, nama_blkg, email, password, tanggal_lahir, jenis_kelamin]
    );

    return res.status(201).json({
      message: "Registrasi berhasil, silakan login."
    });
  } catch (error) {
    console.error("Gagal registrasi:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ 
        error: "Email sudah terdaftar. Silahkan gunakan email lain." 
      });
    }
    return res.status(500).json({ 
      error: "Terjadi kesalahan pada server." 
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await clientPool.query('CALL sp_login(?, ?)', [email, password]);
    const result = rows[0]?.[0];

    if (!result || result.success === 0) {
      return res.status(401).json({
        message: result?.pesan || "Email atau password salah"
      });
    }

    const payload = {
      id_akun: result.id_pengguna_induk,
      id_user: result.id_pengguna,
      role: result.role,
      nama: result.nama
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Login berhasil",
      token: token,
      user: payload
    });
  } catch (error) {
    console.error("Gagal login:", error);
    return res.status(500).json({ 
      error: "Terjadi kesalahan pada server." 
    });
  }
};
