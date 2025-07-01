// intents.js

/**
 * Mendeteksi intent user berdasarkan kata kunci dari pesan teks.
 * Sekarang difokuskan hanya untuk pencarian GitHub.
 */
export const detectIntent = (message) => {
  const msg = message.toLowerCase();

  if (msg.match(/halo|hai|hi|assalam|pagi|siang|sore/)) return "greeting";
  if (msg.match(/repo|repo milik|repositori|repositori milik|github|cari repo|cari repo milik|cari proyek|lihat kode|lihat kode milik/)) return "github_search";
  if (msg.match(/cerita|kisah|buatkan cerita|dongeng|kisahkan|story/)) return "make_story";
  if (msg.match(/lanjut cerita|teruskan cerita|next chapter|continue/)) return "continue_story";
  if (msg.match(/hapus|reset|mulai ulang|clear/)) return "reset_conversation";
  if (msg.match(/daftar|subscribe|langganan|premium/)) return "subscribe_prompt";
  if (msg.match(/bantuan|help|fitur|apa bisa|ngapain aja/)) return "help";
  if (msg.match(/siapa kamu|kamu siapa|tentangmu|profil|creator|pembuat|yang buat kamu/)) return "about_ai";

  return "fallback";
};
