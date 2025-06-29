/**
 * Mengubah markdown ke HTML
 */
export function renderMarkdown(text) {
  return window.marked.parse(text);
}

/**
 * Mengekstrak dan merender balasan AI dalam bentuk <card> ke dalam Tailwind grid
 */
export function renderCardsFromAI(replyText) {
  const cardPattern = /<card>([\s\S]*?)<\/card>/g;
  let cards = [];
  let match;

  while ((match = cardPattern.exec(replyText)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      cards.push(json);
    } catch (e) {
      console.warn("Card parsing error", e);
    }
  }

  if (!cards.length) return "";

  const html = cards.map(c => `
    <div class="border border-gray-700 rounded-lg mb-4 overflow-hidden bg-gray-800 shadow">
      ${c.img ? `<img src="${c.img}" alt="${c.title}" class="w-full h-40 object-cover" />` : ''}
      <div class="p-3">
        <h3 class="text-white font-semibold">${c.title}</h3>
        <p class="text-gray-400 text-sm">${c.desc}</p>
        <a href="${c.link}" target="_blank"
           class="mt-2 inline-block text-blue-400 hover:underline">Lihat Produk →</a>
      </div>
    </div>
  `).join("");

  return `<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">${html}</div>`;
}

/**
 * Render produk langsung dari array JSON
 */
export function renderProdukCards(produkArray) {
  return produkArray.map(p => `
    <div class="border border-gray-700 rounded-lg mb-4 overflow-hidden bg-gray-800 shadow">
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