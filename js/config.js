// Konfigurasi Aplikasi SPMB 2026
const CONFIG = {
  SCHOOL_NAME: 'SMKS Harapan Pangkalan Bun',
  GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/GANTI_DENGAN_URL_ANDA/exec',
  REQUEST_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: 'admin123'
};

const SCHOOL_INFO = {
  name: 'SMKS Harapan Pangkalan Bun',
  nss: '40.2.14.01.001',
  npsn: '30201844',
  kepalaSekolah: 'Drs. Fathrurraji',
  telepon: '895404947622',
  alamat: 'Jl. Kawitan',
  kelurahan: 'Sidorejo',
  kecamatan: 'Arut Selatan',
  kabupaten: 'Kotawaringin Barat',
  provinsi: 'Kalimantan Tengah',
  kodePos: '74111',
  tahunBerdiri: 1989,
  visi: 'Terbentuknya SDM yang PRODUKTIF, profesional, dan berakhlak mulia',
  misi: [
    'Membentuk pribadi yang profesional',
    'Mengembangkan kompetensi sesuai kebutuhan industri',
    'Menciptakan lingkungan belajar yang kondusif'
  ]
};

const JURUSAN = [
  { id: 1, nama: 'Teknik Komputer dan Jaringan', kapasitas: 30, deskripsi: 'Program keahlian teknologi jaringan dan sistem komputer' },
  { id: 2, nama: 'Teknik Instalasi Tenaga Listrik', kapasitas: 25, deskripsi: 'Program keahlian instalasi dan pemeliharaan listrik' },
  { id: 3, nama: 'Manajemen Perkantoran', kapasitas: 30, deskripsi: 'Program keahlian administrasi dan manajemen' }
];