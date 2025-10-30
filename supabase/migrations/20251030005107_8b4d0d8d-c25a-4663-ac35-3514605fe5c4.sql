-- Create enum types
CREATE TYPE public.user_role AS ENUM ('ADMIN', 'DOKTER', 'LAB', 'PERAWAT');
CREATE TYPE public.patient_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE public.diagnosis_type AS ENUM ('PRINCIPAL', 'SECONDARY', 'COMPLICATION');
CREATE TYPE public.encounter_status AS ENUM ('PLANNED', 'ARRIVED', 'IN_PROGRESS', 'FINISHED', 'CANCELLED');
CREATE TYPE public.lab_order_status AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nik VARCHAR(16) UNIQUE NOT NULL,
  no_bpjs VARCHAR(13),
  nama VARCHAR(255) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jenis_kelamin VARCHAR(10) NOT NULL,
  alamat TEXT,
  telepon VARCHAR(15),
  status public.patient_status DEFAULT 'ACTIVE',
  status_bpjs VARCHAR(20),
  waktu_validasi_bpjs TIMESTAMP WITH TIME ZONE,
  id_fhir_patient VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create encounters table
CREATE TABLE public.encounters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  tanggal TIMESTAMP WITH TIME ZONE DEFAULT now(),
  poli VARCHAR(100) NOT NULL,
  keluhan TEXT,
  anamnesis TEXT,
  pemeriksaan TEXT,
  assessment TEXT,
  plan TEXT,
  status public.encounter_status DEFAULT 'PLANNED',
  no_sep VARCHAR(50),
  id_fhir_encounter VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create diagnoses table
CREATE TABLE public.diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  encounter_id UUID REFERENCES public.encounters(id) ON DELETE CASCADE NOT NULL,
  kode_icd10 VARCHAR(10) NOT NULL,
  nama_diagnosis TEXT NOT NULL,
  jenis public.diagnosis_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lab_orders table
CREATE TABLE public.lab_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  encounter_id UUID REFERENCES public.encounters(id) ON DELETE CASCADE NOT NULL,
  jenis_pemeriksaan VARCHAR(255) NOT NULL,
  status public.lab_order_status DEFAULT 'PENDING',
  catatan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lab_results table
CREATE TABLE public.lab_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_order_id UUID REFERENCES public.lab_orders(id) ON DELETE CASCADE NOT NULL,
  parameter VARCHAR(255) NOT NULL,
  nilai VARCHAR(100),
  satuan VARCHAR(50),
  nilai_rujukan VARCHAR(100),
  interpretasi VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create icd10_codes table (for reference)
CREATE TABLE public.icd10_codes (
  kode VARCHAR(10) PRIMARY KEY,
  nama TEXT NOT NULL,
  kategori VARCHAR(255)
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(50) NOT NULL,
  entity VARCHAR(50) NOT NULL,
  entity_id VARCHAR(100),
  meta_json JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sync_jobs table
CREATE TABLE public.sync_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity VARCHAR(50) NOT NULL,
  entity_id VARCHAR(100),
  status VARCHAR(20) NOT NULL,
  payload JSONB,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.user_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encounters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icd10_codes ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- RLS Policies for patients
CREATE POLICY "Admins can do everything on patients"
  ON public.patients FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Dokter can read and write patients"
  ON public.patients FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'DOKTER'));

CREATE POLICY "Lab can read patients"
  ON public.patients FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'LAB'));

-- RLS Policies for encounters
CREATE POLICY "Admins can do everything on encounters"
  ON public.encounters FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Dokter can do everything on encounters"
  ON public.encounters FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'DOKTER'));

CREATE POLICY "Lab can read encounters"
  ON public.encounters FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'LAB'));

-- RLS Policies for diagnoses
CREATE POLICY "Admins can do everything on diagnoses"
  ON public.diagnoses FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Dokter can do everything on diagnoses"
  ON public.diagnoses FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'DOKTER'));

CREATE POLICY "Lab can read diagnoses"
  ON public.diagnoses FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'LAB'));

-- RLS Policies for lab orders and results
CREATE POLICY "All authenticated users can read lab orders"
  ON public.lab_orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Dokter and Lab can create lab orders"
  ON public.lab_orders FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'DOKTER') OR public.has_role(auth.uid(), 'LAB'));

CREATE POLICY "Lab can update lab orders"
  ON public.lab_orders FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'LAB'));

CREATE POLICY "All authenticated users can read lab results"
  ON public.lab_results FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Lab can insert lab results"
  ON public.lab_results FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'LAB'));

-- RLS Policies for audit logs
CREATE POLICY "Admins can read audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "All authenticated users can create audit logs"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for sync jobs
CREATE POLICY "All authenticated users can read sync jobs"
  ON public.sync_jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can create sync jobs"
  ON public.sync_jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'ADMIN'));

CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for profiles
CREATE POLICY "Users can read all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- RLS Policies for icd10_codes
CREATE POLICY "All authenticated users can read icd10 codes"
  ON public.icd10_codes FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_encounters_updated_at
  BEFORE UPDATE ON public.encounters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email);
  RETURN new;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();