/**
 * Render produk sebagai card bisnis dengan tombol beli
 */
export function renderProdukCards(produkArray) {
  return produkArray.map(p => `
    <div class="border border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow">
      <div class="p-3">
        <h3 class="text-white font-semibold mb-1">${p.title}</h3>
        ${p.desc ? `<p class="text-gray-400 text-sm mb-2">${p.desc}</p>` : ""}
        ${p.price ? `<p class="text-yellow-400 font-bold mb-2">Rp ${p.price}</p>` : ""}
        ${p.link ? `<a href="${p.link}" target="_blank"
           class="mt-2 inline-block text-center w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
           Beli Sekarang
         </a>` : ""}
      </div>
    </div>
  `).join("");
}