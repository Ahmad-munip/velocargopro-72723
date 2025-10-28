# SIMPUS Digital Puskesmas

Sistem Informasi Manajemen Puskesmas berbasis web menggunakan React + Vite + TypeScript + Tailwind CSS + shadcn-ui.

## Mode Operasi

Aplikasi saat ini berjalan dalam **Offline Mode** menggunakan mock data lokal (JSON). Tidak ada koneksi database yang aktif.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn-ui
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data**: Mock JSON files (offline mode)

## Struktur Folder

```
src/
├── pages/              # Halaman utama aplikasi
│   ├── Login.tsx       # Halaman login dummy
│   ├── Dashboard.tsx   # Dashboard dengan statistik
│   ├── Pasien.tsx      # Data pasien
│   ├── Encounter.tsx   # Riwayat kunjungan
│   ├── Laboratorium.tsx # Data lab
│   ├── Rujukan.tsx     # Rujukan (coming soon)
│   └── Laporan.tsx     # Laporan & statistik
├── components/         # Komponen UI
│   ├── layout/         # Layout components
│   └── ui/             # shadcn-ui components
├── contexts/           # React contexts
│   └── AuthContext.tsx # Autentikasi dummy
├── lib/                # Utilities & helpers
│   ├── date-formatter.ts  # Format tanggal (Asia/Jakarta)
│   ├── mock-api.ts        # Mock API client
│   └── report-aggregator.ts # Agregasi laporan
└── mock/               # Mock data JSON
    ├── patients.json
    ├── encounters.json
    ├── diagnoses.json
    ├── lab_orders.json
    ├── lab_results.json
    ├── icd10_codes.json
    ├── audit_logs.json
    ├── bpjs/
    │   └── validation.json
    └── fhir/
        ├── patient.json
        └── encounter.json
```

## Instalasi & Menjalankan Aplikasi

### Prerequisites

- Node.js 18+ atau Bun

### Install Dependencies

```bash
npm install
# atau
bun install
```

### Development Mode

```bash
npm run dev
# atau
bun dev
```

Aplikasi akan berjalan di `http://localhost:8080`

### Build Production

```bash
npm run build
# atau
bun build
```

## Login Dummy

Aplikasi menggunakan autentikasi dummy untuk offline mode. Gunakan email dan password apa saja, lalu pilih role:

- **ADMIN**: Akses ke Dashboard, Pasien, Laporan
- **DOKTER**: Akses ke Dashboard, Pasien, Encounter, Laboratorium, Rujukan
- **LAB**: Akses ke Dashboard, Laboratorium

Contoh login:
- Email: `admin@puskesmas.id`
- Password: `password` (atau password apa saja)
- Role: `ADMIN`

## Fitur Utama

### ✅ Sudah Tersedia

- Login dummy dengan role-based access
- Dashboard dengan statistik dan chart
- Data pasien dengan pencarian
- Riwayat encounter/kunjungan
- Data laboratorium & hasil pemeriksaan
- Laporan dan statistik
- Timezone Asia/Jakarta untuk semua tanggal
- Offline mode badge di header

### 🚧 Coming Soon

- Rujukan ke fasilitas kesehatan lain
- Form entry data baru
- Export laporan ke PDF/Excel
- Integrasi database PostgreSQL

## Environment Variables

File `.env.example` berisi template untuk koneksi database di masa depan:

```env
VITE_DATABASE_URL=
VITE_DB_HOST=
VITE_DB_PORT=
VITE_DB_NAME=
VITE_DB_USER=
VITE_DB_PASSWORD=
VITE_APP_TZ=Asia/Jakarta
```

**Catatan**: Variabel ini belum aktif karena aplikasi berjalan dalam offline mode.

## Timezone

Semua timestamp menggunakan timezone **Asia/Jakarta (WIB, UTC+7)**.

## License

MIT License
