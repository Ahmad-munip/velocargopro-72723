export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          entity: string
          entity_id: string | null
          id: string
          meta_json: Json | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          entity: string
          entity_id?: string | null
          id?: string
          meta_json?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          entity?: string
          entity_id?: string | null
          id?: string
          meta_json?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      diagnoses: {
        Row: {
          created_at: string | null
          encounter_id: string
          id: string
          jenis: Database["public"]["Enums"]["diagnosis_type"]
          kode_icd10: string
          nama_diagnosis: string
        }
        Insert: {
          created_at?: string | null
          encounter_id: string
          id?: string
          jenis: Database["public"]["Enums"]["diagnosis_type"]
          kode_icd10: string
          nama_diagnosis: string
        }
        Update: {
          created_at?: string | null
          encounter_id?: string
          id?: string
          jenis?: Database["public"]["Enums"]["diagnosis_type"]
          kode_icd10?: string
          nama_diagnosis?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
        ]
      }
      encounters: {
        Row: {
          anamnesis: string | null
          assessment: string | null
          created_at: string | null
          id: string
          id_fhir_encounter: string | null
          keluhan: string | null
          no_sep: string | null
          patient_id: string
          pemeriksaan: string | null
          plan: string | null
          poli: string
          status: Database["public"]["Enums"]["encounter_status"] | null
          tanggal: string | null
          updated_at: string | null
        }
        Insert: {
          anamnesis?: string | null
          assessment?: string | null
          created_at?: string | null
          id?: string
          id_fhir_encounter?: string | null
          keluhan?: string | null
          no_sep?: string | null
          patient_id: string
          pemeriksaan?: string | null
          plan?: string | null
          poli: string
          status?: Database["public"]["Enums"]["encounter_status"] | null
          tanggal?: string | null
          updated_at?: string | null
        }
        Update: {
          anamnesis?: string | null
          assessment?: string | null
          created_at?: string | null
          id?: string
          id_fhir_encounter?: string | null
          keluhan?: string | null
          no_sep?: string | null
          patient_id?: string
          pemeriksaan?: string | null
          plan?: string | null
          poli?: string
          status?: Database["public"]["Enums"]["encounter_status"] | null
          tanggal?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "encounters_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      icd10_codes: {
        Row: {
          kategori: string | null
          kode: string
          nama: string
        }
        Insert: {
          kategori?: string | null
          kode: string
          nama: string
        }
        Update: {
          kategori?: string | null
          kode?: string
          nama?: string
        }
        Relationships: []
      }
      lab_orders: {
        Row: {
          catatan: string | null
          created_at: string | null
          encounter_id: string
          id: string
          jenis_pemeriksaan: string
          status: Database["public"]["Enums"]["lab_order_status"] | null
        }
        Insert: {
          catatan?: string | null
          created_at?: string | null
          encounter_id: string
          id?: string
          jenis_pemeriksaan: string
          status?: Database["public"]["Enums"]["lab_order_status"] | null
        }
        Update: {
          catatan?: string | null
          created_at?: string | null
          encounter_id?: string
          id?: string
          jenis_pemeriksaan?: string
          status?: Database["public"]["Enums"]["lab_order_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_orders_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_results: {
        Row: {
          created_at: string | null
          id: string
          interpretasi: string | null
          lab_order_id: string
          nilai: string | null
          nilai_rujukan: string | null
          parameter: string
          satuan: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interpretasi?: string | null
          lab_order_id: string
          nilai?: string | null
          nilai_rujukan?: string | null
          parameter: string
          satuan?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interpretasi?: string | null
          lab_order_id?: string
          nilai?: string | null
          nilai_rujukan?: string | null
          parameter?: string
          satuan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_results_lab_order_id_fkey"
            columns: ["lab_order_id"]
            isOneToOne: false
            referencedRelation: "lab_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          alamat: string | null
          created_at: string | null
          id: string
          id_fhir_patient: string | null
          jenis_kelamin: string
          nama: string
          nik: string
          no_bpjs: string | null
          status: Database["public"]["Enums"]["patient_status"] | null
          status_bpjs: string | null
          tanggal_lahir: string
          telepon: string | null
          updated_at: string | null
          waktu_validasi_bpjs: string | null
        }
        Insert: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          id_fhir_patient?: string | null
          jenis_kelamin: string
          nama: string
          nik: string
          no_bpjs?: string | null
          status?: Database["public"]["Enums"]["patient_status"] | null
          status_bpjs?: string | null
          tanggal_lahir: string
          telepon?: string | null
          updated_at?: string | null
          waktu_validasi_bpjs?: string | null
        }
        Update: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          id_fhir_patient?: string | null
          jenis_kelamin?: string
          nama?: string
          nik?: string
          no_bpjs?: string | null
          status?: Database["public"]["Enums"]["patient_status"] | null
          status_bpjs?: string | null
          tanggal_lahir?: string
          telepon?: string | null
          updated_at?: string | null
          waktu_validasi_bpjs?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sync_jobs: {
        Row: {
          created_at: string | null
          entity: string
          entity_id: string | null
          error: string | null
          id: string
          payload: Json | null
          status: string
        }
        Insert: {
          created_at?: string | null
          entity: string
          entity_id?: string | null
          error?: string | null
          id?: string
          payload?: Json | null
          status: string
        }
        Update: {
          created_at?: string | null
          entity?: string
          entity_id?: string | null
          error?: string | null
          id?: string
          payload?: Json | null
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      diagnosis_type: "PRINCIPAL" | "SECONDARY" | "COMPLICATION"
      encounter_status:
        | "PLANNED"
        | "ARRIVED"
        | "IN_PROGRESS"
        | "FINISHED"
        | "CANCELLED"
      lab_order_status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
      patient_status: "ACTIVE" | "INACTIVE"
      user_role: "ADMIN" | "DOKTER" | "LAB" | "PERAWAT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      diagnosis_type: ["PRINCIPAL", "SECONDARY", "COMPLICATION"],
      encounter_status: [
        "PLANNED",
        "ARRIVED",
        "IN_PROGRESS",
        "FINISHED",
        "CANCELLED",
      ],
      lab_order_status: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      patient_status: ["ACTIVE", "INACTIVE"],
      user_role: ["ADMIN", "DOKTER", "LAB", "PERAWAT"],
    },
  },
} as const
