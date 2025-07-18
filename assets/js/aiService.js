// aiService.js **by MIA**
/**
 * Mengirim pesan pengguna ke Cloudflare Worker (backend AI kamu).
 * Worker akan menangani pemrosesan dengan Groq/Gemma dan GitHub API.
 *
 * @param {string} userMessage - Pesan teks mentah dari pengguna.
 * @returns {Promise<object>} - Objek JSON yang diproses dari Cloudflare Worker
 * (berisi { intent, query, message, results, error }).
 */
export async function sendToAI(userMessage) {
  // PENTING: Ganti dengan URL Cloudflare Worker kamu
  const WORKER_URL = "https://lyra-ai.d-adityadwiputraramadhan.workers.dev/"; 

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // PENTING: Mengirim { message: userMessage } ke Worker, bukan objek prompt mentah Groq.
      body: JSON.stringify({ message: userMessage }) 
    });

    if (!response.ok) {
      // Lebih baik lempar error dengan detail jika respon tidak OK
      const errorData = await response.json().catch(() => ({ message: "Respon bukan JSON atau error parsing" }));
      throw new Error(`Gagal menghubungi AI: ${response.status} - ${errorData.message || response.statusText || 'Unknown error'}`);
    }

    const data = await response.json();
    // Objek ini sudah diproses dan akan memiliki { intent, query, message, results, error }
    return data; 

  } catch (error) {
    console.error("Kesalahan dalam sendToAI:", error);
    // Lemparkan error agar bisa ditangkap di core-ai.js
    throw new Error(`Koneksi AI gagal: ${error.message}`);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const chatWelcomeDiv = document.getElementById('chat-welcome');
  if (chatWelcomeDiv) {
    // Tampilkan pesan loading atau placeholder
    chatWelcomeDiv.innerHTML = `<h2 class="font-bold text-4xl gradient-text">L Y Я A</h2><br><p class="text-gray-300 animate-pulse">Membangunkan Lyra...</p>`;

    try {
      const initialAboutAIResponse = await sendToAI("Kamu siapa?");

      if (initialAboutAIResponse.error) {
        chatWelcomeDiv.innerHTML = `<span class="font-bold text-red-500">Error:</span> ${initialAboutAIResponse.error}`;
        chatWelcomeDiv.classList.add('text-red-500');
      } else {
        // Ambil pesan 'about_ai' dari properti 'message' yang dikembalikan Worker
        const aboutAIText = initialAboutAIResponse.message || "Selamat datang! Ada yang bisa saya bantu?";

        // Aplikasikan efek fading jika diinginkan
        chatWelcomeDiv.classList.remove('opacity-100', 'blur-0');
        chatWelcomeDiv.classList.add('opacity-0', 'blur-sm');

        setTimeout(() => {
            chatWelcomeDiv.innerHTML = `<h2 class="font-bold text-4xl text-blue-400">L Y Я A</h2><br>${aboutAIText}`;
            chatWelcomeDiv.classList.remove('opacity-0', 'blur-sm');
            chatWelcomeDiv.classList.add('opacity-100', 'blur-0');
        }, 700); // Sesuaikan dengan durasi transisi CSS kamu
      }

    } catch (error) {
      console.error("Terjadi kesalahan saat memuat respons AI:", error.message);
      chatWelcomeDiv.innerHTML = `<span class="font-bold text-red-500">Error:</span> Gagal memuat Lyra. ${error.message}`;
      chatWelcomeDiv.classList.add('text-red-500');
    }
  
  }
});