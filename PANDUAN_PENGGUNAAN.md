# 📚 Panduan Penggunaan SIMPUS

## 🎯 Daftar Isi
1. [Setup Awal](#setup-awal)
2. [Autentikasi & Login](#autentikasi--login)
3. [Faker API BPJS & SATUSEHAT](#faker-api-bpjs--satusehat)
4. [Modul-Modul Utama](#modul-modul-utama)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Setup Awal

### 1. Database Sudah Terkoneksi ✅
Database PostgreSQL Anda sudah terkoneksi melalui **Lovable Cloud**. Semua tabel telah dibuat dengan Row Level Security (RLS) yang aktif.

### 2. Populasi Data ICD-10 (Opsional)
Untuk mengisi data kode ICD-10, Anda bisa:

**Opsi A: Import dari CSV**
```sql
-- Via backend interface
INSERT INTO icd10_codes (kode, nama, kategori) VALUES
  ('A00', 'Cholera', 'Certain infectious and parasitic diseases'),
  ('A01', 'Typhoid and paratyphoid fevers', 'Certain infectious and parasitic diseases'),
  ('Z00.0', 'General medical examination', 'Factors influencing health status');
```

**Opsi B: Biarkan kosong** - User bisa input manual saat entry diagnosa.

### 3. Setup User Pertama

#### **Langkah 1: Daftar User Admin**
1. Jalankan aplikasi
2. Klik tombol "Login" di halaman utama
3. Pilih tab "Sign Up"
4. Isi form:
   - Email: `admin@puskesmas.id`
   - Password: `admin123`
   - Name: `Administrator`
5. Klik "Sign Up"

#### **Langkah 2: Set Role Admin**
Setelah user terdaftar, tambahkan role ADMIN via backend:

```sql
-- Cari user_id dari auth.users
SELECT id, email FROM auth.users WHERE email = 'admin@puskesmas.id';

-- Insert role ADMIN (ganti <user_id> dengan hasil query di atas)
INSERT INTO user_roles (user_id, role) 
VALUES ('<user_id>', 'ADMIN');
```

#### **Langkah 3: Tambahkan User Lain** (Dokter, Lab, dll)
```sql
-- Setelah user signup via UI, set role mereka:
INSERT INTO user_roles (user_id, role) VALUES
  ('<user_id_dokter>', 'DOKTER'),
  ('<user_id_lab>', 'LAB');
```

---

## 🔐 Autentikasi & Login

### Login
1. Buka halaman Login (klik "Login" di halaman utama)
2. Masukkan email & password
3. Klik "Sign In"
4. Anda akan diredirect ke Dashboard

### Logout
- Klik tombol "Logout" di header / sidebar

### Reset Password
- Fitur ini belum tersedia. Gunakan backend untuk reset manual jika perlu.

---

## 🏥 Faker API BPJS & SATUSEHAT

Aplikasi ini menyediakan **faker API** untuk simulasi integrasi BPJS dan SATUSEHAT tanpa perlu koneksi ke server eksternal.

### 📌 API BPJS Faker

#### **1. Validasi BPJS**
**Endpoint:** Edge Function `bpjs-faker`  
**Method:** GET dengan `?action=validate&no_bpjs=<nomor>`

**Cara Penggunaan di Aplikasi:**
1. Buka detail pasien
2. Klik tombol **"Validasi BPJS"**
3. Sistem akan memanggil faker API dan menampilkan:
   - Status peserta (AKTIF / TIDAK AKTIF)
   - Nama, NIK, Tanggal Lahir
   - Faskes, Kelas, Jenis Peserta

**Response Example:**
```json
{
  "success": true,
  "data": {
    "noKartu": "0001234567890",
    "nama": "Pasien BPJS 0001",
    "nik": "3200001234567890",
    "statusPeserta": {
      "kode": "1",
      "keterangan": "AKTIF"
    },
    "pisa": "Faskes I Jakarta",
    "hakKelas": {
      "kode": "3",
      "keterangan": "KELAS III"
    }
  },
  "message": "Peserta BPJS aktif"
}
```

#### **2. Buat SEP (Surat Eligibilitas Peserta)**
**Endpoint:** Edge Function `bpjs-faker`  
**Method:** POST dengan `?action=create-sep`

**Cara Penggunaan di Aplikasi:**
1. Buka encounter pasien BPJS
2. Pastikan ada diagnosa principal
3. Klik tombol **"Buat SEP"**
4. Sistem akan generate nomor SEP otomatis

**Request Body Example:**
```json
{
  "action": "create-sep",
  "data": {
    "noBpjs": "0001234567890",
    "tglSep": "2025-01-15",
    "namaPasien": "John Doe",
    "kodeDiagnosa": "A00",
    "poli": "Umum"
  }
}
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "noSep": "0301R0011761785467123",
    "tglSep": "2025-01-15",
    "noKartu": "0001234567890",
    "diagnosa": "A00",
    "poli": "Umum"
  },
  "message": "SEP berhasil dibuat"
}
```

---

### 🌐 API SATUSEHAT Faker

#### **1. Sinkronisasi Pasien ke FHIR**
**Endpoint:** Edge Function `satusehat-faker`  
**Method:** POST dengan `?resource=Patient`

**Cara Penggunaan di Aplikasi:**
1. Buka detail pasien
2. Klik tombol **"Kirim ke SATUSEHAT"**
3. Sistem akan membuat FHIR Patient resource

**Request Body Example:**
```json
{
  "resource": "Patient",
  "data": {
    "nik": "3200001234567890",
    "nama": "John Doe",
    "jenis_kelamin": "Laki-laki",
    "tanggal_lahir": "1990-01-01",
    "alamat": "Jakarta",
    "telepon": "08123456789"
  }
}
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "resourceType": "Patient",
    "id": "P32000012345678901761785467",
    "identifier": [{
      "system": "https://fhir.kemkes.go.id/id/nik",
      "value": "3200001234567890"
    }],
    "name": [{
      "use": "official",
      "text": "John Doe"
    }],
    "gender": "male",
    "birthDate": "1990-01-01"
  },
  "message": "Data pasien berhasil disinkronkan ke SATUSEHAT"
}
```

#### **2. Sinkronisasi Encounter ke FHIR**
**Endpoint:** Edge Function `satusehat-faker`  
**Method:** POST dengan `?resource=Encounter`

**Cara Penggunaan di Aplikasi:**
1. Buka encounter yang sudah selesai
2. Pastikan pasien sudah di-sync ke FHIR (punya id_fhir_patient)
3. Klik tombol **"Kirim Encounter ke SATUSEHAT"**

**Request Body Example:**
```json
{
  "resource": "Encounter",
  "data": {
    "patient_id": "uuid-pasien",
    "id_fhir_patient": "P32000012345678901761785467",
    "tanggal": "2025-01-15T10:00:00Z",
    "poli": "Umum",
    "diagnosa_utama": "Cholera",
    "kode_icd10": "A00"
  }
}
```

---

## 📋 Modul-Modul Utama

### 1. Dashboard
- Lihat statistik kunjungan harian & bulanan
- Top 5 diagnosa
- Data real-time dari database

### 2. Pasien
- **CRUD Pasien**: Tambah, Edit, Hapus, Cari
- **Validasi BPJS**: Cek status peserta
- **Sync FHIR**: Kirim data ke SATUSEHAT (faker)
- **Histori Kunjungan**: Lihat semua encounter pasien

### 3. Encounter (Kunjungan)
- Form SOAP lengkap
- Entry diagnosa (ICD-10)
- Buat SEP untuk pasien BPJS
- Sync encounter ke FHIR

### 4. Laboratorium
- Buat order lab
- Input hasil lab
- Interpretasi hasil

### 5. Laporan
- Filter by tanggal & poli
- Export ke **PDF** & **Excel**
- Audit log otomatis

---

## 🐛 Troubleshooting

### ❌ "Tidak bisa login"
**Solusi:**
- Pastikan sudah signup terlebih dahulu
- Cek email confirmation di console (auto-confirm aktif)
- Pastikan user_roles sudah diset

### ❌ "Data tidak muncul"
**Solusi:**
- Cek RLS policies di database
- Pastikan user sudah login
- Cek user_roles (ADMIN/DOKTER/LAB)

### ❌ "Tidak bisa create pasien/encounter"
**Solusi:**
- Login sebagai ADMIN atau DOKTER (bukan LAB)
- Cek console untuk error detail

### ❌ "Faker API tidak response"
**Solusi:**
- Edge functions sudah auto-deploy
- Cek logs di Backend → Edge Functions
- Pastikan CORS headers terinclude

### ❌ "Export PDF/Excel tidak jalan"
**Solusi:**
- Pastikan ada data di tabel hasil
- Cek browser console untuk errors
- Test dengan data range yang lebih lebar

---

## 📞 Kontak & Support

Untuk pertanyaan lebih lanjut atau issue, hubungi:
- Email: admin@puskesmas.id
- GitHub Issues: [Link Repository]

---

**Dibuat dengan ❤️ menggunakan Lovable Cloud**
