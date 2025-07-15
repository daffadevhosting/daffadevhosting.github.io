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


  // Mencari Pengguna (User)
  if (msg.match(/cari user|user github|profil github|akun github|pengguna github|cari pengguna|siapa user/)) {
    return "github_search_user";
  }
  // Mencari Organisasi (Organization)
  if (msg.match(/cari organisasi|organisasi github|org github|organisasi apa/)) {
    return "github_search_organization";
  }
  // Mencari Kode (Code)
  if (msg.match(/cari kode|lihat kode|potongan kode|fungsi apa|contoh kode|implementasi kode/)) {
    return "github_search_code";
  }
  // Mencari Isu/Pull Request (Issues/PRs)
  if (msg.match(/cari isu|lihat isu|open issue|bug di|error di|problem di|pull request|pr di|masalah di/)) {
    return "github_search_issue";
  }
  // Mencari Topik (Topic)
  if (msg.match(/cari topik|topik github|tentang topik|ada topik/)) {
    return "github_search_topic";
  }
  // Mencari Repositori (Repo) - ini akan menjadi fallback untuk pencarian GitHub umum
  if (msg.match(/cari repo|repositori|proyek github|project di github|repo github|lihat repo|kode di github/)) {
    return "github_search_repository";
  }

  return "fallback";
};

export const extractEntity = (message, intent) => {
  const msg = message.toLowerCase();
  if (intent === "github_search_user") {
    const match = msg.match(/(?:user|pengguna)\s+([\w.-]+)/); // Mencari kata setelah 'user' atau 'pengguna'
    if (match && match[1]) {
      return { username: match[1] };
    }
  }
  // Tambahkan logika untuk intent lain (misalnya, nama repo, kata kunci kode, dll.)
  return null;
};