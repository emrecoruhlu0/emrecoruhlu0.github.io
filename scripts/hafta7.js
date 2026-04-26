// --- Yardımcı: XSS'e karşı metin temizleme ---
function temizle(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Tema Değiştirme ---
const temaBtn = document.getElementById('temaBtn');

temaBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  const karanlik = document.body.classList.contains('dark-theme');
  temaBtn.textContent = karanlik ? 'Açık Temaya Geç' : 'Koyu Temaya Geç';
});

// --- Form Gönderme ---
const form = document.getElementById('basvuruFormu');
const sonucAlani = document.getElementById('sonucAlani');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const adSoyad     = document.getElementById('adSoyad').value.trim();
  const eposta      = document.getElementById('eposta').value.trim();
  const bolum       = document.getElementById('bolum').value.trim();
  const sinif       = document.getElementById('sinif').value;
  const oturum      = document.getElementById('oturum').value;
  const katilimTuru = document.getElementById('katilimTuru').value;
  const kisaMesaj   = document.getElementById('kisaMesaj').value.trim();
  const onay        = document.getElementById('onay').checked;

  // Zorunlu alan kontrolü
  if (!adSoyad || !eposta || !bolum || !sinif || !oturum || !katilimTuru) {
    sonucAlani.className = 'alert alert-danger rounded-4';
    sonucAlani.innerHTML = '<strong>Hata!</strong> Lütfen tüm zorunlu alanları eksiksiz doldurun.';
    sonucAlani.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Onay kutusu kontrolü
  if (!onay) {
    sonucAlani.className = 'alert alert-warning rounded-4';
    sonucAlani.innerHTML = '<strong>Uyarı!</strong> Bilgilerimin kullanılmasını onaylamanız gerekmektedir.';
    sonucAlani.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Başarılı — özet kartı oluştur
  const mesajSatiri = kisaMesaj
    ? `<div class="col-12"><strong>Mesaj:</strong> ${temizle(kisaMesaj)}</div>`
    : '';

  sonucAlani.className = 'card shadow-sm rounded-4 border-success';
  sonucAlani.innerHTML = `
    <div class="card-body p-4">
      <div class="d-flex align-items-center gap-2 mb-3">
        <span class="badge bg-success px-3 py-2">Başvuru Alındı</span>
        <h5 class="mb-0 fw-bold">Başvuru Özeti</h5>
      </div>
      <hr>
      <div class="row g-3">
        <div class="col-sm-6">
          <span class="text-secondary small">Ad Soyad</span>
          <div class="fw-semibold">${temizle(adSoyad)}</div>
        </div>
        <div class="col-sm-6">
          <span class="text-secondary small">E-posta</span>
          <div class="fw-semibold">${temizle(eposta)}</div>
        </div>
        <div class="col-sm-6">
          <span class="text-secondary small">Bölüm</span>
          <div class="fw-semibold">${temizle(bolum)}</div>
        </div>
        <div class="col-sm-6">
          <span class="text-secondary small">Sınıf</span>
          <div class="fw-semibold">${temizle(sinif)}</div>
        </div>
        <div class="col-sm-6">
          <span class="text-secondary small">Oturum</span>
          <div class="fw-semibold">${temizle(oturum)}</div>
        </div>
        <div class="col-sm-6">
          <span class="text-secondary small">Katılım Türü</span>
          <div class="fw-semibold">${temizle(katilimTuru)}</div>
        </div>
        ${mesajSatiri}
      </div>
    </div>
  `;

  sonucAlani.scrollIntoView({ behavior: 'smooth' });
});
