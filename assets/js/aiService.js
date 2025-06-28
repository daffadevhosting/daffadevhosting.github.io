// aiService.js

/**
 * Mengirim prompt ke Groq API melalui Cloudflare Worker kamu.
 * 
 * @param {object} prompt - Object prompt yang berisi model dan messages
 * @returns {Promise<string>} - Hasil jawaban AI dalam bentuk teks
 */
export async function sendToAI(prompt) {
  const response = await fetch("https://api-ai.d-adityadwiputraramadhan.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(prompt)
  });

  if (!response.ok) throw new Error("Gagal menghubungi AI");

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Maaf, tidak ada jawaban.";
}

// Pastikan DOM sudah dimuat sebelum memanggil sendToAI
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const result = await sendToAI("Halo, ini adalah pesan percobaan.");
    console.log("Respon dari AI:", result);
    // Di sini kamu bisa melakukan sesuatu dengan 'result', misalnya menampilkannya di UI
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
});
