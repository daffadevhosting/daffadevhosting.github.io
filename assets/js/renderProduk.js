// assets/js/renderProduk.js
export function renderProdukCards(produkArray) {
  return produkArray.map(p => `
    <div class="border border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow">
      <img src="${p.img}" alt="${p.title}" class="w-full h-40 object-cover" />
      <div class="p-3">
        <h3 class="text-white font-semibold">${p.title}</h3>
        <p class="text-gray-400 text-sm">${p.desc}</p>
        <a href="${p.link}" target="_blank"
           class="mt-2 inline-block text-blue-400 hover:underline">Lihat Produk →</a>
      </div>
    </div>
  `).join("");
}