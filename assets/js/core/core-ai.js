// core-ai.js **by MIA**

// Import yang relevan. Hapus detectIntent, extractEntity, detectIntentVn, buildPrompt, handleGithubSearchIntent
import {
  setupVoiceRecognition,
  speakWithTTS,
  isInputFromVoice,
  resetVoiceFlag,
  setVoiceFlag
} from '../voice-engine.js';

import { renderMarkdown, renderCardsFromAI } from '../render.js';
import { sendToAI } from '../aiService.js'; // sendToAI ini memanggil Worker
import { renderGithubCard } from '../renderGithubCards.js'; // Pastikan ini bisa render repo, user, dll.
import { scrollToBottom } from '../scroll.js';

let isVoiceMode = false;
let repo = {}; // Ini mungkin tidak lagi relevan jika repo langsung dirender dari AI reply

const WORKER_URL = 'https://lyra-ai.d-adityadwiputraramadhan.workers.dev/';
const AI_NAME = "LYRA";

document.addEventListener("DOMContentLoaded", async () => {
  const launcher = document.getElementById("chat-launcher");
  const launcherForm = document.getElementById("chat-launcher-form");
  const launcherInput = document.getElementById("launcher-input");
  const chatWrapper = document.getElementById("chat-box-wrapper");
  const messages = document.getElementById("chat-messages");
  const btnArea = document.getElementById("chat-btn-area");
  const micBtn = document.getElementById("mic-button");
  const welcome = document.getElementById("chat-welcome");
  const notice = document.getElementById("ai-notice");
  // removed default github search

  setupVoiceRecognition(micBtn, async (transcript) => {
    if (!transcript?.trim()) return;

    setVoiceFlag();
    renderVoiceMessage("user", null, "voice note dikirim"); // Pesan dikirim

    addTyping(); // Tampilkan indikator mengetik
    try {
      const reply = await sendToAI(transcript); // sendToAI harus memanggil WORKER_URL
      removeTyping();
      handleAIReply(reply); // Panggil handler baru untuk respons dari Worker
    } catch (err) {
      removeTyping();
      addMessage("bot", "❌ Error: " + err.message);
    }
  });

  // Logika modal untuk GitHub repo stats (tetap sama)
document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-repo-owner]');
  if (card) {
    const owner = card.dataset.repoOwner;
    const fullName = card.dataset.repoFullName;

    console.log("Card clicked:", card);
    console.log("Owner:", owner);
    console.log("Full Name from dataset:", fullName);

    const modal = document.getElementById('repoModal');
    const content = document.getElementById('repoModalContent');

    // ... sisanya kode kamu
    content.innerHTML = `
      <p class="mb-2">Stats untuk <strong>${fullName}</strong></p>
      <img
        src="https://github-readme-stats.vercel.app/api?username=${owner}&show_icons=true&theme=radical"
        alt="${owner} GitHub Stats"
        class="w-full rounded-md"
      />
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
});

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('repoModal').classList.add('hidden');
  });

  // Logika UI (launcher, form, welcome message, dblclick) tetap sama
  const resetLauncher = () => {
    launcher.classList.remove("bottom-0", "left-0", "right-0", "items-end", "justify-center");
    launcher.classList.add("inset-0", "items-center", "justify-center");
    launcherForm.classList.remove("static", "bottom-0", "rounded-t-lg", "w-full", "max-w-xl");
    launcherForm.classList.add("rounded-full", "w-60");
    chatWrapper.classList.add("hidden", "scale-100", "opacity-100");
    welcome.classList.remove("opacity-0", "blur-md");
    btnArea.classList.add("hidden");
    notice.classList.remove("hidden");
  };

  launcherInput.addEventListener("focus", () => {
    launcher.classList.remove("inset-0", "items-center", "justify-center");
    launcher.classList.add("bottom-0", "left-0", "right-0", "items-end", "justify-center");
    launcherForm.classList.remove("rounded-full", "w-60");
    launcherForm.classList.add("static", "bottom-0", "rounded-t-lg", "w-full", "max-w-xl");
    chatWrapper.classList.remove("hidden", "scale-0", "opacity-0");
    welcome.classList.add("opacity-0", "blur-md");
    btnArea.classList.remove("hidden");
    notice.classList.add("hidden");
    launcherInput.focus();
  });

  launcherInput.addEventListener("blur", () => {
    setTimeout(() => {
      const isActive = document.activeElement;
      const allowed = ["launcher-input", "send-button", "mic-button", "chat-launcher-form", "grid", "href", "chat-messages", "chat-box-wrapper"];

      if (!allowed.includes(isActive?.id)) {
        resetLauncher();
      }
    }, 200);
  });

  if (messages) {
    messages.addEventListener("dblclick", () => {
      resetLauncher();
    });
  }

  if (chatWrapper) {
    chatWrapper.addEventListener("dblclick", () => {
      resetLauncher();
    });
  }

  function hideWelcomeMessage() {
    const welcome = document.getElementById("chat-welcome");
    if (!welcome) return;
    welcome.classList.add("opacity-0", "blur-sm");
    setTimeout(() => welcome.classList.remove("opacity-0", "blur-sm"), 800);
  }

  launcherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = launcherInput.value.trim();
    if (!message) return;

    isVoiceMode = false; // Input dari teks, bukan suara

    addMessage("user", message); // Tampilkan pesan pengguna
    launcherInput.value = "";
    launcherInput.focus();
    hideWelcomeMessage();

    // PENTING: Kirim pesan mentah ke AI Service (yang akan memanggil Worker)
    addTyping();
    try {
      const reply = await sendToAI(message); // sendToAI harus memanggil WORKER_URL
      removeTyping();
      handleAIReply(reply); // Panggil handler baru untuk respons dari Worker
    } catch (err) {
      removeTyping();
      addMessage("bot", "❌ Error: " + err.message);
    }
  });

  // PENTING: Fungsi ini akan menerima respons JSON dari Worker
  async function handleAIReply(data) {
    // data adalah objek JSON dari Worker: { intent, query, message, results, error }

    if (data.error) {
      addMessage("bot", `Maaf, terjadi kesalahan: ${data.error}`);
      setTimeout(() => scrollToBottom(), 50);
      return;
    }

    const { intent, query, message, results } = data; // Destrukturisasi respons

    if (intent && intent.startsWith("github_search_")) {
      // Jika ini adalah pencarian GitHub, tampilkan kartu
      if (!results || results.total_count === 0) {
        addMessage("bot", `Tidak ada hasil ditemukan untuk <strong>${query}</strong>.`);
      } else {
        let cardHTML = '';
        let headerText = '';

        switch (intent) {
          case 'github_search_repository':
          case 'github_search_topic':
            headerText = `Menampilkan repositori terkait "<strong>${query}</strong>":`;
            // Asumsi renderGithubCard bisa render array 'items' dan namanya tunggal
            // atau kamu punya renderGithubCards (plural)
            cardHTML = renderGithubCard(results.items, 'repository'); // Sesuaikan parameter renderGithubCard
            break;
          case 'github_search_user':
          case 'github_search_organization':
            headerText = `Menampilkan ${intent === 'github_search_user' ? 'pengguna' : 'organisasi'} terkait "<strong>${query}</strong>":`;
            cardHTML = renderGithubCard(results.items, 'user'); // Sesuaikan parameter renderGithubCard
            break;
          case 'github_search_code':
            headerText = `Menampilkan potongan kode terkait "<strong>${query}</strong>":`;
            cardHTML = renderGithubCard(results.items, 'code'); // Sesuaikan parameter renderGithubCard
            break;
          case 'github_search_issue':
            headerText = `Menampilkan isu/pull request terkait "<strong>${query}</strong>":`;
            cardHTML = renderGithubCard(results.items, 'issue'); // Sesuaikan parameter renderGithubCard
            break;
          default:
            headerText = `Menerima hasil dari GitHub untuk intent ${intent}, tetapi tidak tahu cara menampilkannya.`;
            addMessage("bot", headerText);
            break;
        }

        if (headerText && cardHTML) { // Hanya tampilkan header jika ada kartu
          const headerBubble = document.createElement("div");
          headerBubble.className = "text-left text-gray-300 my-2 text-md";
          headerBubble.innerHTML = renderMarkdown(headerText);
          messages.appendChild(headerBubble);
        }

        if (cardHTML) {
          const cardBlock = document.createElement("div");
          cardBlock.innerHTML = cardHTML;
          messages.appendChild(cardBlock);
        }
      }
      setTimeout(() => scrollToBottom(), 50);

    } else {
      let botResponseText = message; // Ambil pesan dari Worker

      if (isInputFromVoice()) { // Jika input dari suara, juga respons dengan suara
        speakWithTTS(botResponseText);
        renderVoiceMessage("bot", null, `${AI_NAME} mengirim voice note`); // Menggunakan AI_NAME
        resetVoiceFlag();
      } else {
        addMessage("bot", botResponseText); // Tampilkan pesan teks
      }
      setTimeout(() => scrollToBottom(), 50);
    }
  }

  function addMessage(sender, text) {
    const bubble = document.createElement("div");
    bubble.className = sender === "user"
      ? "text-right text-blue-400 my-2 text-sm"
      : "text-left text-gray-300 my-2 text-md";
    bubble.innerHTML = sender === "bot" ? renderMarkdown(text) : `<strong>Kamu:</strong><br/> ${text}`;
    messages.appendChild(bubble);
    setTimeout(() => scrollToBottom(), 50);
  }

  function renderVoiceMessage(sender, url = null, label = "voice note") {
    const wrapper = document.createElement("div");
    wrapper.className = `flex ${sender === "user" ? "justify-end" : "justify-start"} mb-3`;

    const bubble = document.createElement("div");
    bubble.className = "bg-blue-100 dark:bg-gray-800 text-gray-800 mt-4 dark:text-gray-200 px-4 py-2 rounded-xl flex items-center gap-2 shadow";

    const playBtn = document.createElement("button");
    playBtn.innerHTML = `<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`;
    playBtn.className = "text-lg";
    playBtn.onclick = () => speakWithTTS(label); // Sekarang label langsung berisi teks yang akan diucapkan

    const desc = document.createElement("span");
    desc.innerHTML = `<em>${label}</em>`; // Label di sini bisa berupa "Daffabot mengirim voice note"
    desc.className = "text-sm text-gray-500";

    bubble.appendChild(playBtn);
    bubble.appendChild(desc);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    setTimeout(() => scrollToBottom(), 50);
  }

  function addTyping() {
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.className = "text-sm text-gray-500 italic";
    typing.innerText = `${AI_NAME} sedang mengetik...`; // Menggunakan AI_NAME
    messages.appendChild(typing);
    setTimeout(() => scrollToBottom(), 50);
  }

  function removeTyping() {
    document.getElementById("typing")?.remove();
    setTimeout(() => scrollToBottom(), 50);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("launcher-input");
  const form = document.getElementById("chat-launcher-form");

  if (!input || !form) {
    console.warn("Launcher input/form tidak ditemukan!");
    return;
  }

  document.querySelectorAll("#suggestions button").forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value = btn.dataset.suggest;
      form.dispatchEvent(new Event("submit"));
    });
  });
});

const noticeTexts = [
  "📝 Silakan ketik nama repository untuk melihat hasilnya...",
  "🔍 Kamu juga bisa ketik username GitHub (misal: daffadevhosting)",
  "✨ Contoh: \"repo tailwind animasi\" atau \"chatbot ai\""
];

function simulateTyping(texts, targetId, delay = 40, pause = 800) {
  const target = document.getElementById(targetId);
  if (!target) return;

  let index = 0;

  function typeLine(line) {
    target.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < line.length) {
        target.innerHTML += line[i++];
      } else {
        clearInterval(interval);
        setTimeout(() => {
          index = (index + 1) % texts.length;
          typeLine(texts[index]);
        }, pause);
      }
    }, delay);
  }

  typeLine(texts[index]);
}

document.addEventListener("DOMContentLoaded", () => {
  simulateTyping(noticeTexts, "ai-notice");
});

  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const matrix = katakana + latin + nums;
  
  const matrixArray = matrix.split("");

  const fontSize = 12;
  const columns = canvas.width / fontSize;
  const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ffff';
  ctx.shadowColor = '#08b4e9ff';
  ctx.shadowBlur = 5; // Kekuatan efek cahaya
  ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
  const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
  ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
    drops[i] = 0;
  }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);
