// intents.js

/**
 * Mendeteksi intent user berdasarkan kata kunci dari pesan suara.
 * Digunakan oleh AI chatbot untuk merespons lebih tepat.
 */
export const detectIntentVn = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes("cv")) return "cv";
  if (lower.includes("ebook") || lower.includes("buku")) return "ebook";
  if (lower.includes("desain") || lower.includes("promo")) return "desain";

  return "general";
}
