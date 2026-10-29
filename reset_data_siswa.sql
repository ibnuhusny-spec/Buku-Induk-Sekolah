-- ==============================================================================
-- SKRIP SQL SUPABASE: KOSONGKAN / RESET SELURUH DATA SISWA SECARA BERSIH
-- Salin dan jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- PERINGATAN: Skrip ini akan menghapus seluruh data siswa, riwayat nilai rapor,
-- kehadiran/absensi, dan berkas lampiran siswa untuk memulai impor Dapodik baru dari awal.
-- Pengaturan identitas sekolah, Kepala Sekolah, dan bank tanda tangan guru TIDAK AKAN DIHAPUS.

-- 1. KOSONGKAN TABEL DATA SISWA & CATATAN AKADEMIK
TRUNCATE TABLE public.nilai_akademik, public.rekap_kehadiran, public.dokumen_siswa, public.buku_induk CASCADE;

-- 2. RESET POLICIES SUPABASE (MEMASTIKAN AKSES PENUH AGAR TIDAK ADA BLOKIR IMPOR / HAPUS)
DROP POLICY IF EXISTS "Akses Publik Buku Induk" ON public.buku_induk;
CREATE POLICY "Akses Publik Buku Induk" ON public.buku_induk FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses Nilai Akademik" ON public.nilai_akademik;
CREATE POLICY "Akses Nilai Akademik" ON public.nilai_akademik FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses Rekap Kehadiran" ON public.rekap_kehadiran;
CREATE POLICY "Akses Rekap Kehadiran" ON public.rekap_kehadiran FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses Dokumen Siswa" ON public.dokumen_siswa;
CREATE POLICY "Akses Dokumen Siswa" ON public.dokumen_siswa FOR ALL USING (true) WITH CHECK (true);
