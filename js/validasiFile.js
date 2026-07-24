/**
 * IndukKu Pro - Utility Validasi File Upload
 * Memeriksa ukuran file (max size), ekstensi file, dan tipe MIME sebelum dikirim ke Supabase Storage / Parser.
 */

export const CONFIG_FILE = {
    DOKUMEN: {
        maxSizeMB: 5,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
        label: 'Gambar (JPG, PNG, WEBP) atau PDF (Maks. 5MB)'
    },
    FOTO: {
        maxSizeMB: 2,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        label: 'Foto Profil (JPG, PNG, WEBP) (Maks. 2MB)'
    },
    EXCEL: {
        maxSizeMB: 10,
        allowedExtensions: ['xlsx', 'xls', 'csv'],
        allowedTypes: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv'
        ],
        label: 'File Excel / CSV (.xlsx, .xls, .csv) (Maks. 10MB)'
    }
};

/**
 * Memvalidasi berkas file
 * @param {File} file - Object File dari input.files[0]
 * @param {Object} opsi - Konfigurasi validasi dari CONFIG_FILE
 * @returns {Object} { valid: boolean, pesan: string }
 */
export function validasiFile(file, opsi = CONFIG_FILE.DOKUMEN) {
    if (!file) {
        return { valid: false, pesan: "⚠️ Harap pilih berkas file terlebih dahulu." };
    }

    // 1. Validasi Ukuran File Kosong (0 Bytes)
    if (file.size === 0) {
        return { valid: false, pesan: "❌ File kosong atau tidak valid (0 Bytes)." };
    }

    // 2. Validasi Ukuran Maksimum
    const maxSizeBytes = opsi.maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        const ukuranMB = (file.size / (1024 * 1024)).toFixed(2);
        return {
            valid: false,
            pesan: `❌ Ukuran file terlalu besar (${ukuranMB} MB).\nMaksimal ukuran yang diizinkan adalah ${opsi.maxSizeMB} MB.`
        };
    }

    // 3. Validasi Ekstensi File
    const namaFile = file.name || '';
    const ext = namaFile.includes('.') ? namaFile.split('.').pop().toLowerCase() : '';
    if (!opsi.allowedExtensions.includes(ext)) {
        const daftarExt = opsi.allowedExtensions.map(e => `.${e}`).join(', ');
        return {
            valid: false,
            pesan: `❌ Format file (.${ext}) tidak didukung!\nFormat yang diperbolehkan hanya: ${daftarExt}`
        };
    }

    // 4. Validasi MIME Type (Jika browser mendukung)
    if (file.type && opsi.allowedTypes && opsi.allowedTypes.length > 0) {
        const isMimeValid = opsi.allowedTypes.some(type => {
            if (type.includes('*')) {
                const baseType = type.split('/')[0];
                return file.type.startsWith(baseType + '/');
            }
            return file.type === type;
        }) || (ext === 'csv' && file.type.includes('csv')) || 
           (ext === 'xls' && file.type.includes('excel')) || 
           (ext === 'xlsx' && file.type.includes('spreadsheetml'));

        if (!isMimeValid) {
            return {
                valid: false,
                pesan: `❌ Tipe file terdeteksi tidak sesuai (${file.type}). Harap gunakan ${opsi.label}.`
            };
        }
    }

    return { valid: true, pesan: "File valid" };
}
