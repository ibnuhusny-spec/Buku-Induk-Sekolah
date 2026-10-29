-- ==============================================================================
-- SKRIP SQL SUPABASE: PENGATURAN SEKOLAH & MANAJEMEN TANDA TANGAN GURU
-- Salin dan jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. TABEL PENGATURAN IDENTITAS SEKOLAH & KEPALA SEKOLAH
CREATE TABLE IF NOT EXISTS public.pengaturan_sekolah (
    id INTEGER PRIMARY KEY DEFAULT 1,
    nama_sekolah TEXT NOT NULL DEFAULT 'SDIT QURRATU A''YUN AL-ISLAMI',
    alamat_sekolah TEXT DEFAULT 'Maros, Sulawesi Selatan',
    kota_cetak TEXT DEFAULT 'Maros',
    tanggal_cetak DATE,
    nama_kepsek TEXT DEFAULT 'Radiant Fadli, S.Pd',
    nip_kepsek TEXT DEFAULT '-',
    ttd_kepsek TEXT, -- Gambar tanda tangan (URL atau Base64 transparan)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sisipkan 1 baris default awal jika belum ada
INSERT INTO public.pengaturan_sekolah (id, nama_sekolah, alamat_sekolah, kota_cetak, nama_kepsek, nip_kepsek)
VALUES (1, 'SDIT QURRATU A''YUN AL-ISLAMI', 'Jl. Poros Makassar - Maros Km. 26 Maccopa, Kab. Maros', 'Maros', 'Radiant Fadli, S.Pd', '-')
ON CONFLICT (id) DO NOTHING;

-- 2. TABEL GURU & WALI KELAS BESERTA TANDA TANGAN
CREATE TABLE IF NOT EXISTS public.guru_staf (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_lengkap TEXT NOT NULL,
    nip TEXT DEFAULT '-',
    jabatan TEXT DEFAULT 'Wali Kelas',
    rombel TEXT, -- Contoh: 'Kelas 1', 'Kelas 1A Putra', 'Kelas 5 Putri', dll.
    ttd_url TEXT, -- Gambar tanda tangan (URL atau Base64 transparan)
    is_aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AKTIFKAN ROW LEVEL SECURITY (RLS)
ALTER TABLE public.pengaturan_sekolah ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guru_staf ENABLE ROW LEVEL SECURITY;

-- 4. KEBIJAKAN AKSES (POLICIES) AGAR SISTEM DAPAT MEMBACA & MENYIMPAN DATA
DROP POLICY IF EXISTS "Akses Pengaturan Sekolah" ON public.pengaturan_sekolah;
CREATE POLICY "Akses Pengaturan Sekolah" ON public.pengaturan_sekolah FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses Guru dan Staf" ON public.guru_staf;
CREATE POLICY "Akses Guru dan Staf" ON public.guru_staf FOR ALL USING (true) WITH CHECK (true);

