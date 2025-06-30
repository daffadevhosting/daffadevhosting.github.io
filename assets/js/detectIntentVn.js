// intents.js

/**
 * Mendeteksi intent user berdasarkan kata kunci dari pesan suara.
 * Digunakan oleh AI chatbot untuk merespons lebih tepat.
 */
export const detectIntentVn = (text) => {
  text = text
    .replace(/\*\*/g, '')
    .replace(/[\*_`>#~]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\\n/g, ' ')
    .trim();

  if (!text) return;
  const lower = text.toLowerCase();
  if (lower.includes("repo")) return "repositori";
  if (lower.includes("ebook") || lower.includes("buku")) return "ebook";
  if (lower.includes("desain") || lower.includes("promo")) return "desain";

  return "general";
}
