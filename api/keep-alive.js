export default async function handler(req, res) {
    // Kita mengambil URL dan Key dari Environment Variables Vercel
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    // Ganti 'siswa' dengan salah satu nama tabel yang ada di database IndukKu Pro Anda
    const tableName = 'buku_induk'; 

    const url = `${supabaseUrl}/rest/v1/${tableName}?select=id&limit=1`;
    
    const options = {
        method: 'GET',
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return res.status(200).json({ 
            status: 'sukses', 
            message: 'Ping berhasil, database tetap bangun!' 
        });
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: error.message 
        });
    }
}