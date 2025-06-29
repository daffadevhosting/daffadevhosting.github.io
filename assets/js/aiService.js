// aiService.js by **MIA**
import { buildPrompt } from "./promptBuilder.js";
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
  
  if (!response.ok) {
    // Lebih baik lempar error dengan detail jika respon tidak OK
    const errorData = await response.json().catch(() => ({ message: "Respon bukan JSON" }));
    throw new Error(`Gagal menghubungi AI: ${response.status} - ${errorData.message || response.statusText}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Maaf, tidak ada jawaban.";
}

document.addEventListener('DOMContentLoaded', async () => {
  const messagePrompt = "kamu adalah lyra, marketing toko digital daffa";
  const chatWelcomeDiv = document.getElementById('chat-welcome');
  try {
    // --- PERBAIKAN DI SINI ---
    // Kirim prompt sebagai OBJEK sesuai format yang diharapkan oleh Groq API
    const promptObject = {
      model: "gemma2-9b-it", // Ganti dengan model Groq yang kamu gunakan rekomen gua: gemma2
      messages: [{ role: "user", content: messagePrompt }]
    };

    const result = await sendToAI(promptObject);

    // --- BAGIAN PERUBAHAN UTAMA DI SINI ---
    // Ubah konten HTML dari div dengan hasil dari AI
    if (chatWelcomeDiv) { // Pastikan elemen ditemukan
      // Kamu bisa langsung menampilkan hasilnya:
      // chatWelcomeDiv.innerText = result;

      // Atau, jika Kamu ingin mempertahankan beberapa HTML bawaan dan hanya mengganti sebagian,
      // Kamu bisa manipulasi innerHTML atau membuat elemen baru.
      // Contoh: mengganti teks selamat datang dengan respon AI
      chatWelcomeDiv.innerHTML = `<h2 class="font-bold text-4xl text-blue-400">L Y Я A</h2><br>${result}`;
      
      // Jika Kamu ingin efek fading atau animasinya, Kamu bisa tambahkan class
      chatWelcomeDiv.classList.remove('opacity-100', 'blur-0');
      chatWelcomeDiv.classList.add('opacity-0', 'blur-sm'); // Sembunyikan dulu
      
      setTimeout(() => {
          chatWelcomeDiv.innerHTML = `<h2 class="font-bold text-4xl text-blue-400">L Y Я A</h2><br>${result}`;
          chatWelcomeDiv.classList.remove('opacity-0', 'blur-sm');
          chatWelcomeDiv.classList.add('opacity-100', 'blur-0'); // Munculkan kembali
      }, 700); // Sesuaikan dengan durasi transisi CSS Kamu (700ms)
    }

    console.log("Respon dari AI:", result);
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    if (chatWelcomeDiv) {
      chatWelcomeDiv.innerHTML = `<span class="font-bold text-red-500">Error:</span> ${error.message}`;
      chatWelcomeDiv.classList.add('text-red-500'); // Beri warna merah untuk error
      chatWelcomeDiv.classList.remove('opacity-0', 'blur-sm');
      chatWelcomeDiv.classList.add('opacity-100', 'blur-0');
    }
  }
});