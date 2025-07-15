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
  if (lower.includes("user") || lower.includes("repo")) return "user";
  if (lower.includes("daffa") || lower.includes("repo")) return "daffadevhosting";

  return "general";
}
