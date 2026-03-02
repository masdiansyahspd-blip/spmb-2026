// Aplikasi utama SPMB 2026
let currentPage = 'home';
let registrationData = {};
let allRegistrations = [];
let isLoggedIn = false;

// Initialize aplikasi
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  renderHomePage();
});

function initializeApp() {
  console.log('Initializing SPMB 2026 Application');
  createNavbar();
  loadRegistrationsFromStorage();
}

function createNavbar() {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <div class="text-white font-bold text-lg">SPMB 2026</div>
      <div class="flex gap-4">
        <button onclick="showPage('home')" class="text-white hover:bg-white/20 px-4 py-2 rounded">Beranda</button>
        <button onclick="showPage('register')" class="text-white hover:bg-white/20 px-4 py-2 rounded">Daftar</button>
      </div>
    </div>
  `;
}

function renderHomePage() {
  const page = document.getElementById('page-home');
  page.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-10">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-10 text-white text-center mb-10">
        <h1 class="text-4xl font-bold mb-4">${CONFIG.SCHOOL_NAME}</h1>
        <p class="text-xl mb-6">Sistem Penerimaan Murid Baru 2026</p>
        <button onclick="showPage('register')" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold">
          Mulai Pendaftaran
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        ${JURUSAN.map(j => `
          <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
            <h3 class="font-bold text-lg mb-2">${j.nama}</h3>
            <p class="text-sm mb-4">${j.deskripsi}</p>
            <p class="text-xs">Kapasitas: ${j.kapasitas} siswa</p>
          </div>
        `).join('')}
      </div>

      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
        <h2 class="text-2xl font-bold mb-4">Informasi Sekolah</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><strong>Nama:</strong> ${SCHOOL_INFO.name}</div>
          <div><strong>NPSN:</strong> ${SCHOOL_INFO.npsn}</div>
          <div><strong>Telepon:</strong> ${SCHOOL_INFO.telepon}</div>
          <div><strong>Kepala Sekolah:</strong> ${SCHOOL_INFO.kepalaSekolah}</div>
          <div><strong>Alamat:</strong> ${SCHOOL_INFO.alamat}</div>
          <div><strong>Kecamatan:</strong> ${SCHOOL_INFO.kecamatan}</div>
        </div>
      </div>
    </div>
  `;
}

function renderRegisterPage() {
  const page = document.getElementById('page-register');
  page.innerHTML = `
    <div class="max-w-2xl mx-auto px-4 py-10">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 text-white">
        <h2 class="text-2xl font-bold mb-6">Formulir Pendaftaran</h2>
        <form id="registrationForm" onsubmit="handleRegistrationSubmit(event)">
          
          <div class="mb-4">
            <label class="block mb-2 font-semibold">Nama Lengkap *</label>
            <input type="text" name="nama_lengkap" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50" placeholder="Masukkan nama lengkap">
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-semibold">NIK *</label>
            <input type="text" name="nik" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50" placeholder="Masukkan NIK">
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-semibold">NISN *</label>
            <input type="text" name="nisn" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50" placeholder="Masukkan NISN">
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-semibold">Email *</label>
            <input type="email" name="email" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50" placeholder="Masukkan email">
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-semibold">No HP *</label>
            <input type="tel" name="no_hp" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50" placeholder="Masukkan nomor HP">
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-semibold">Jurusan Pilihan 1 *</label>
            <select name="jurusan_pilihan_1" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white">
              <option value="">- Pilih Jurusan -</option>
              ${JURUSAN.map(j => `<option value="${j.nama}">${j.nama}</option>`).join('')}
            </select>
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-semibold">Jurusan Pilihan 2</label>
            <select name="jurusan_pilihan_2" class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white">
              <option value="">- Pilih Jurusan (Opsional) -</option>
              ${JURUSAN.map(j => `<option value="${j.nama}">${j.nama}</option>`).join('')}
            </select>
          </div>

          <div class="mb-6">
            <label class="block mb-2 font-semibold">Gelombang *</label>
            <select name="gelombang" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white">
              <option value="">- Pilih Gelombang -</option>
              <option value="Gelombang 1">Gelombang 1</option>
              <option value="Gelombang 2">Gelombang 2</option>
              <option value="Gelombang 3">Gelombang 3</option>
            </select>
          </div>

          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
            Kirim Pendaftaran
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderDashboardPage() {
  const page = document.getElementById('page-dashboard');
  page.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-white">Dashboard Admin</h2>
        <button onclick="logout()" class="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 text-white text-center">
          <div class="text-3xl font-bold">${allRegistrations.length}</div>
          <div class="text-sm">Total Pendaftar</div>
        </div>
      </div>

      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6">
        <h3 class="text-2xl font-bold text-white mb-4">Daftar Pendaftar</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-white text-sm">
            <thead class="border-b border-white/30">
              <tr>
                <th class="text-left py-2">No</th>
                <th class="text-left py-2">Nama</th>
                <th class="text-left py-2">Email</th>
                <th class="text-left py-2">Jurusan</th>
                <th class="text-left py-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              ${allRegistrations.map((reg, idx) => `
                <tr class="border-b border-white/10">
                  <td class="py-2">${idx + 1}</td>
                  <td class="py-2">${reg.nama_lengkap}</td>
                  <td class="py-2">${reg.email}</td>
                  <td class="py-2">${reg.jurusan_pilihan_1}</td>
                  <td class="py-2">${new Date(reg.tanggal).toLocaleDateString('id-ID')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderLoginPage() {
  const page = document.getElementById('page-login');
  page.innerHTML = `
    <div class="max-w-md mx-auto px-4 py-20">
      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 text-white">
        <h2 class="text-2xl font-bold mb-6 text-center">Login Admin</h2>
        <form onsubmit="handleAdminLogin(event)">
          <div class="mb-4">
            <label class="block mb-2 font-semibold">Username</label>
            <input type="text" id="adminUsername" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50" placeholder="Masukkan username">
          </div>
          <div class="mb-6">
            <label class="block mb-2 font-semibold">Password</label>
            <input type="password" id="adminPassword" required class="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50" placeholder="Masukkan password">
          </div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  `;
}

function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  
  if (pageName === 'home') {
    document.getElementById('page-home').classList.remove('hidden');
    renderHomePage();
  } else if (pageName === 'register') {
    document.getElementById('page-register').classList.remove('hidden');
    renderRegisterPage();
  } else if (pageName === 'dashboard') {
    if (!isLoggedIn) {
      showPage('login');
      return;
    }
    document.getElementById('page-dashboard').classList.remove('hidden');
    renderDashboardPage();
  } else if (pageName === 'login') {
    document.getElementById('page-login').classList.remove('hidden');
    renderLoginPage();
  }
  
  currentPage = pageName;
  window.scrollTo(0, 0);
}

async function handleRegistrationSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  data.tanggal = new Date().toISOString();
  data.gelombang = data.gelombang || 'Gelombang 1';

  try {
    if (!allRegistrations) allRegistrations = [];
    allRegistrations.push(data);
    localStorage.setItem('registrations', JSON.stringify(allRegistrations));

    const response = await fetch(CONFIG.GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('✅ Pendaftaran berhasil! Data Anda telah disimpan.');
      event.target.reset();
      showPage('home');
    } else {
      alert('⚠️ Data disimpan lokal, tapi ada masalah koneksi ke server.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('✅ Pendaftaran disimpan lokal. Silakan coba lagi atau hubungi admin jika ada masalah.');
  }
}

function handleAdminLogin(event) {
  event.preventDefault();
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
    isLoggedIn = true;
    localStorage.setItem('adminLoggedIn', 'true');
    showPage('dashboard');
  } else {
    alert('❌ Username atau password salah!');
  }
}

function logout() {
  isLoggedIn = false;
  localStorage.removeItem('adminLoggedIn');
  showPage('home');
}

function loadRegistrationsFromStorage() {
  const stored = localStorage.getItem('registrations');
  if (stored) {
    try {
      allRegistrations = JSON.parse(stored);
    } catch (e) {
      allRegistrations = [];
    }
  }

  const adminLoggedIn = localStorage.getItem('adminLoggedIn');
  if (adminLoggedIn === 'true') {
    isLoggedIn = true;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  document.body.style.minHeight = '100vh';
  document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
});
