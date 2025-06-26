// produkService.js

/**
 * Memuat data produk dari produk.json
 */
export let produkList = [];

export async function loadProdukData() {
  try {
    const res = await fetch("/assets/data/product.json");
    produkList = await res.json();
  } catch (err) {
    console.error("Gagal memuat produk.json:", err);
  }
}

/**
 * Filter produk berdasarkan intent
 * @param {string} intent - intent yang terdeteksi
 * @returns {Array} - daftar produk relevan
 */
export function getProdukByIntent(intent) {
  if (!produkList.length) return [];

  switch (intent) {
    case "cari_template_cv":
      return produkList.filter(p => /cv|resume/i.test(p.title));
    case "cari_mockup":
      return produkList.filter(p => /mockup/i.test(p.title));
    case "cari_konten_planner":
      return produkList.filter(p => /konten|planner/i.test(p.title));
    case "cari_ebook":
      return produkList.filter(p => /ebook|buku|pdf/i.test(p.title));
    case "cari_masterclass":
      return produkList.filter(p => /masterclass|canva|kursus|belajar/i.test(p.title));
    case "list_produk":
      return produkList.slice(0, 6); // tampilkan 6 produk acak
    default:
      return [];
  }
}
