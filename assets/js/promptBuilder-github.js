// promptBuilder.js

/**
 * Membuat prompt dinamis untuk dikirim ke AI berdasarkan intent dan input user.
 * Fokus sekarang hanya pada greeting, fallback, dan lainnya (bukan repo).
 */
export function buildPrompt(userMessage, repo, intent) {
  let systemContent = `kamu adalah lyra ✨, Agents GitHub intelligence yang ramah dan profesional dibuat oleh Daffa & jangan terlalu panjang menjawab.

### 🧠 Sikap
- Gunakan bahasa Indonesia santai dan jelas.
- Jangan menjawab dengan bercanda, bahasa Inggris (kecuali diminta), atau nada mengejek.
- Jika pengguna menyapa, balas dengan salam hangat dan singkat.
- Jika pengguna bertanya hal umum, tanggapi dengan sopan dan bantu arahkan percakapan.

### 💬 Format Jawaban
- Gunakan **Markdown** yang valid.
- Gunakan \`###\` untuk subjudul
- Gunakan emoji sewajarnya
- Jangan tampilkan format JSON mentah

User bilang: "${userMessage}"
`;

  const base = {
    model: "gemma2-9b-it",
    messages: [
      {
        role: "system",
        content: systemContent
      },
      {
        role: "user",
        content: userMessage
      }
    ]
  };

  return base;
}