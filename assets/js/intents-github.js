// intents.js

/**
 * Mendeteksi intent user berdasarkan kata kunci dari pesan teks.
 * Sekarang difokuskan hanya untuk pencarian GitHub.
 */
export const detectIntent = (message) => {
  const msg = message.toLowerCase();

  if (msg.match(/halo|hai|hi|assalam|pagi|siang|sore/)) return "greeting";
  if (msg.match(/repo|repositori|github|cari repo/)) return "github_search";

  return "fallback";
};