// intents.js

/**
 * Mendeteksi intent user berdasarkan kata kunci dari pesan teks.
 * Digunakan oleh AI chatbot untuk merespons lebih tepat.
 */
export const detectIntent = (message) => {
  const msg = message.toLowerCase();

  if (msg.match(/halo|hai|hi|assalam|pagi|siang|sore/)) return "greeting";
  if (msg.match(/(ada )?(apa saja|produk|punya apa|jual apa|list produk)/)) return "list_produk";
  if (msg.match(/cv|resume|lamaran kerja/)) return "cari_template_cv";
  if (msg.match(/mockup|branding|presentasi/)) return "cari_mockup";
  if (msg.match(/konten planner|jadwal konten|planner/)) return "cari_konten_planner";
  if (msg.match(/ebook|buku|pdf|baca/)) return "cari_ebook";
  if (msg.match(/masterclass|pelatihan|kursus|belajar/)) return "cari_masterclass";
  if (msg.match(/harga|berapa|murah|bayar/)) return "tanya_harga";
  if (msg.match(/beli|checkout|order|pesan/)) return "beli_produk";

  return "fallback"; // default jika tidak dikenali
};
