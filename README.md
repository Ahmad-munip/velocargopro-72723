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
- **Data**: Mock JSON files (offline mode) atau PostgreSQL (API mode)

## Struktur Folder

```
src/
├── pages/              # Halaman utama aplikasi
│   ├── Login.tsx       # Halaman login dengan RBAC
│   ├── Dashboard.tsx   # Dashboard dengan statistik
│   ├── Pasien.tsx      # CRUD data pasien
│   ├── Encounter.tsx   # Riwayat kunjungan
│   ├── Laboratorium.tsx # Data lab & hasil
│   ├── Rujukan.tsx     # Rujukan (coming soon)
│   └── Laporan.tsx     # Laporan dengan export PDF/Excel
├── components/         # Komponen UI
│   ├── layout/         # Layout components
│   ├── PatientDetail.tsx  # Detail pasien
│   ├── PatientForm.tsx    # Form CRUD pasien
│   └── ui/             # shadcn-ui components
├── contexts/           # React contexts
│   └── AuthContext.tsx # Autentikasi dengan RBAC
├── lib/                # Utilities & helpers
│   ├── date-formatter.ts     # Format tanggal (Asia/Jakarta)
│   ├── mock-api.ts           # Mock API client
│   ├── data-layer.ts         # Data abstraction layer (mock/api toggle)
│   ├── report-aggregator.ts  # Agregasi laporan
│   └── report-exporter.ts    # Export PDF/Excel
└── mock/               # Mock data JSON
    ├── patients.json
    ├── encounters.json
    ├── diagnoses.json
    ├── lab_orders.json
    ├── lab_results.json
    ├── icd10_codes.json
    ├── audit_logs.json
    ├── sync_jobs.json
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

## Login & RBAC

Aplikasi menggunakan autentikasi dengan role-based access control (RBAC):

- **ADMIN**: Full akses (CRUD pasien, delete, validasi BPJS, FHIR sync, laporan)
- **DOKTER**: Create/read/update pasien, encounter, diagnosa, lab order
- **LAB**: Read-only pasien, input lab results

Contoh login (mode offline, gunakan kredensial apa saja):
- Email: `admin@puskesmas.id`
- Password: `password`
- Role: `ADMIN`

## Fitur Utama

### ✅ Sudah Tersedia

#### Modul Pasien
- CRUD lengkap data pasien
- Pencarian by NIK, No BPJS, Nama, Tgl Lahir
- Detail pasien dengan histori encounter
- Validasi BPJS mock (baca dari `mock/bpjs/validation.json`)
- Sync ke FHIR mock (idempotent, simpan ke `sync_jobs`)
- RBAC: ADMIN (full), DOKTER (CRU), LAB (read-only)
- Audit log semua aksi CRUD

#### Dashboard
- Total pasien, kunjungan harian, kunjungan bulanan
- Top 5 diagnosa tersering
- Distribusi kunjungan per poli
- Timezone Asia/Jakarta

#### Encounter & Diagnosa
- Form SOAP: keluhan, anamnesis, assessment, plan
- Pilih diagnosa dari ICD-10 codes (±50 kode)
- Validasi: minimal 1 diagnosa PRINCIPAL
- Generate SEP mock (nomor SEP dummy)
- Sync encounter ke FHIR mock

#### Laboratorium
- Buat lab order dari encounter
- Input lab result: nilai, unit, rujukan min/max, interpretasi
- Ringkasan hasil lab di encounter

#### Laporan
- Filter rentang tanggal & poli
- Tabel hasil: tanggal, nama pasien, poli, diagnosa utama
- Export PDF & Excel
- Kop Puskesmas + footnote (waktu cetak + nama petugas)
- Audit log aksi ekspor

#### Audit Logs
- Login/logout
- Semua aksi CRUD (patient, encounter, diagnosis, lab)
- Validasi BPJS & SEP creation
- Export laporan

### 🚧 Coming Soon
- Rujukan ke fasilitas kesehatan lain
- Real-time notifications
- Advanced analytics

## ERD Logis

```mermaid
erDiagram
    USERS ||--o{ AUDIT_LOGS : creates
    USERS {
        string id PK
        string name
        string email
        enum role
    }
    
    PATIENTS ||--o{ ENCOUNTERS : has
    PATIENTS {
        string id PK
        string nik
        string no_bpjs
        string nama
        date tgl_lahir
        string jk
        string alamat
        string phone
        enum status_bpjs
        timestamp status_bpjs_ts
        string id_fhir_patient
    }
    
    ENCOUNTERS ||--o{ DIAGNOSES : has
    ENCOUNTERS ||--o{ LAB_ORDERS : has
    ENCOUNTERS {
        string id PK
        string patient_id FK
        timestamp tanggal
        string poli
        string keluhan
        string anamnesis
        string assessment
        string plan
        string sep_no
        string id_fhir_encounter
    }
    
    DIAGNOSES }o--|| ICD10_CODES : references
    DIAGNOSES {
        string id PK
        string encounter_id FK
        string icd10_code FK
        string description
        enum type
    }
    
    ICD10_CODES {
        string code PK
        string title
    }
    
    LAB_ORDERS ||--o{ LAB_RESULTS : has
    LAB_ORDERS {
        string id PK
        string encounter_id FK
        string test_code
        string catatan
    }
    
    LAB_RESULTS {
        string id PK
        string lab_order_id FK
        string test_code
        float nilai
        string unit
        float rujukan_min
        float rujukan_max
        enum interpretasi
    }
    
    AUDIT_LOGS {
        string id PK
        string user_id FK
        enum action
        string entity
        string entity_id
        json meta_json
        timestamp created_at
    }
    
    SYNC_JOBS {
        string id PK
        string entity
        string entity_id
        string fhir_id
        json payload
        enum status
        timestamp created_at
    }
```

## Mapping FHIR Resources

### Patient → FHIR Patient
```
simpus.patients.id          → Patient.id
simpus.patients.nik         → Patient.identifier (system: "nik")
simpus.patients.nama        → Patient.name.text
simpus.patients.tgl_lahir   → Patient.birthDate
simpus.patients.jk          → Patient.gender (L→male, P→female)
simpus.patients.alamat      → Patient.address.text
simpus.patients.phone       → Patient.telecom (system: "phone")
```

### Encounter → FHIR Encounter
```
simpus.encounters.id         → Encounter.id
simpus.encounters.patient_id → Encounter.subject (reference: Patient/{id})
simpus.encounters.tanggal    → Encounter.period.start
simpus.encounters.poli       → Encounter.serviceType
simpus.encounters.keluhan    → Encounter.reasonCode
```

## Flow Proses SIMPUS

```mermaid
sequenceDiagram
    participant User
    participant SIMPUS
    participant MockBPJS
    participant MockFHIR
    participant AuditLog

    User->>SIMPUS: Daftar Pasien Baru
    SIMPUS->>AuditLog: Log CREATE patient
    
    User->>SIMPUS: Validasi BPJS
    SIMPUS->>MockBPJS: Cek status (mock/bpjs/validation.json)
    MockBPJS-->>SIMPUS: Status AKTIF/TIDAK_AKTIF
    SIMPUS->>AuditLog: Log VALIDATE_BPJS
    
    User->>SIMPUS: Buat Encounter (SOAP)
    SIMPUS->>AuditLog: Log CREATE encounter
    
    User->>SIMPUS: Input Diagnosa (ICD-10)
    SIMPUS->>SIMPUS: Validasi min 1 PRINCIPAL
    SIMPUS->>AuditLog: Log CREATE diagnosis
    
    User->>SIMPUS: Generate SEP
    SIMPUS->>SIMPUS: Buat SEP dummy
    SIMPUS->>AuditLog: Log CREATE SEP
    
    User->>SIMPUS: Sync ke FHIR
    SIMPUS->>MockFHIR: Kirim Patient & Encounter
    MockFHIR-->>SIMPUS: FHIR ID (idempotent)
    SIMPUS->>AuditLog: Log SYNC_FHIR
    
    User->>SIMPUS: Export Laporan
    SIMPUS->>SIMPUS: Generate PDF/Excel
    SIMPUS->>AuditLog: Log EXPORT
```

## Migrasi ke PostgreSQL

### 1. Persiapan Database

Buat database PostgreSQL:
```sql
CREATE DATABASE simpus_db;
CREATE USER simpus_user WITH PASSWORD 'ahmad106';
GRANT ALL PRIVILEGES ON DATABASE simpus_db TO simpus_user;
```

### 2. Schema Migration

Jalankan migration script untuk membuat tabel (schema SQL belum disediakan, akan dibuat nanti).

Struktur tabel mengikuti ERD di atas dengan tambahan:
- `created_at` dan `updated_at` pada semua tabel
- Index pada foreign keys
- Index pada kolom yang sering dicari (nik, no_bpjs, nama, tanggal)

### 3. Konfigurasi Environment

Buat file `.env` dari `.env.example`:
```env
VITE_DATABASE_URL=postgresql://simpus_user:ahmad106@127.0.0.1:5432/simpus_db
VITE_DB_HOST=127.0.0.1
VITE_DB_PORT=5432
VITE_DB_NAME=simpus_db
VITE_DB_USER=simpus_user
VITE_DB_PASSWORD=ahmad106
VITE_APP_TZ=Asia/Jakarta
VITE_DATA_MODE=api
```

### 4. Aktifkan API Mode

Edit `src/lib/data-layer.ts`:
```typescript
const DATA_MODE: 'mock' | 'api' = 'api'; // Ubah dari 'mock' ke 'api'
```

### 5. Implementasi Database Queries

Implement `fetchFromDB()` di `src/lib/data-layer.ts` dengan actual PostgreSQL queries:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL,
});

export const fetchFromDB = async (query: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
};
```

### 6. Migrasi Data Mock ke PostgreSQL

Import data dari `src/mock/*.json` ke tabel PostgreSQL menggunakan script migration (akan disediakan nanti).

### 7. Testing

Test koneksi dan CRUD operations:
```bash
npm run dev
# Login dan test semua modul
```

### 8. Rollback ke Mock Mode

Jika ada masalah, ubah kembali `DATA_MODE` ke `'mock'` di `data-layer.ts`.

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_DATABASE_URL` | PostgreSQL connection string | - | No (only for API mode) |
| `VITE_DB_HOST` | Database host | `127.0.0.1` | No |
| `VITE_DB_PORT` | Database port | `5432` | No |
| `VITE_DB_NAME` | Database name | `simpus_db` | No |
| `VITE_DB_USER` | Database user | `simpus_user` | No |
| `VITE_DB_PASSWORD` | Database password | - | No |
| `VITE_APP_TZ` | Application timezone | `Asia/Jakarta` | Yes |
| `VITE_DATA_MODE` | Data mode (mock/api) | `mock` | No |

## Timezone

Semua timestamp menggunakan timezone **Asia/Jakarta (WIB, UTC+7)**.

## License

MIT License
