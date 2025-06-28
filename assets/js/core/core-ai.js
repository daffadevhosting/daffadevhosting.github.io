import {
  setupVoiceRecognition,
  speakWithTTS,
  isInputFromVoice,
  resetVoiceFlag,
  setVoiceFlag
} from '../voice-engine.js';
import { detectIntent } from '../intents.js';
import { detectIntentVn } from '../detectIntentVn.js';
import { loadProdukData, getProdukByIntent } from '../produkService.js';
import { renderProdukCards, renderMarkdown, renderCardsFromAI } from '../render.js';
import { buildPrompt } from '../promptBuilder.js';
import { sendToAI } from '../aiService.js';
import { scrollToBottom } from '../scroll.js';

let isVoiceMode = false;

document.addEventListener("DOMContentLoaded", async () => {
  const launcher = document.getElementById("chat-launcher");
  const launcherForm = document.getElementById("chat-launcher-form");
  const launcherInput = document.getElementById("launcher-input");
  const chatWrapper = document.getElementById("chat-box-wrapper");
  const messages = document.getElementById("chat-messages");
  const btnArea = document.getElementById("chat-btn-area");
  const micBtn = document.getElementById("mic-button");
  const welcome = document.getElementById("chat-welcome");

setupVoiceRecognition(micBtn, async (transcript) => {
  if (!transcript?.trim()) return;

  setVoiceFlag();
  renderVoiceMessage("user", null, "voice note dikirim");

  const intent = detectIntent(transcript); // ✅ intent berdasarkan VN
  const intentVn = detectIntentVn(transcript);
  const produk = getProdukByIntent(intent, intentVn);

  if (produk.length > 0) {
    const cardHTML = renderProdukCards(produk);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = cardHTML;
    messages.appendChild(wrapper);
    scrollToBottom();
    return;
  }

  const prompt = buildPrompt(transcript, intent, intentVn); // ✅ arahkan ke prompt AI

  addTyping();
  try {
    const reply = await sendToAI(prompt);
    removeTyping();
    handleAIReply(reply);
  } catch (err) {
    removeTyping();
    addMessage("bot", "❌ Error: " + err.message);
  }
});

  await loadProdukData();

  const resetLauncher = () => {
    launcher.classList.remove("bottom-0", "left-0", "right-0", "items-end", "justify-center");
    launcher.classList.add("inset-0", "items-center", "justify-center");
    launcherForm.classList.remove("rounded-t-lg", "w-full", "max-w-xl");
    launcherForm.classList.add("rounded-full", "w-60");
    chatWrapper.classList.add("hidden", "scale-100", "opacity-100");
    welcome.classList.remove("opacity-0", "blur-md");
    btnArea.classList.add("hidden");
  };

  launcherInput.addEventListener("focus", () => {
    launcher.classList.remove("inset-0", "items-center", "justify-center");
    launcher.classList.add("bottom-0", "left-0", "right-0", "items-end", "justify-center");
    launcherForm.classList.remove("rounded-full", "w-60");
    launcherForm.classList.add("rounded-t-lg", "w-full", "max-w-xl");
    chatWrapper.classList.remove("hidden", "scale-0", "opacity-0");
    welcome.classList.add("opacity-0", "blur-md");
    btnArea.classList.remove("hidden");
    launcherInput.focus();
  });

  launcherInput.addEventListener("blur", () => {
    setTimeout(() => {
      const isActive = document.activeElement;
      const allowed = ["launcher-input", "send-button", "mic-button", "href"];

      if (!allowed.includes(isActive?.id)) {
        resetLauncher();
      }
    }, 100);
  });

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

    isVoiceMode = false;

    addMessage("user", message);
    launcherInput.value = "";
    launcherInput.focus();
    hideWelcomeMessage();

    const intent = detectIntent(message);
    const produk = getProdukByIntent(intent);

    if (produk.length > 0) {
      const cardHTML = renderProdukCards(produk);
      const wrapper = document.createElement("div");
      wrapper.className = "grid grid-cols-1 sm:grid-cols-3 gap-4";
      wrapper.innerHTML = cardHTML;
      messages.appendChild(wrapper);
      setTimeout(() => scrollToBottom(), 50);
      return;
    }

    const prompt = buildPrompt(message, intent);
    addTyping();

    try {
      const reply = await sendToAI(prompt);
      removeTyping();
      const cards = renderCardsFromAI(reply);
      if (cards.length > 0) {
        const cardBlock = document.createElement("div");
        cardBlock.innerHTML = cards;
        messages.appendChild(cardBlock);
      } else {
        handleAIReply(reply);
      }

    } catch (err) {
      removeTyping();
      addMessage("bot", "❌ Error: " + err.message);
    }
  });

  function handleAIReply(text) {
  if (isInputFromVoice()) {
    speakWithTTS(text);
    renderVoiceMessage("bot", null, "Lyra mengirim voice note");
    resetVoiceFlag();
    return;
  }
    if (isVoiceMode) {
      speakWithTTS(text);
      renderVoiceMessage("bot", null, "Lyra mengirim voice note");
    } else {
      addMessage("bot", text);
    }
  }

  function addMessage(sender, text) {
    const bubble = document.createElement("div");
    bubble.className = sender === "user"
      ? "text-right text-blue-400 my-2 text-sm"
      : "text-left text-gray-300 my-2 text-sm";
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
    playBtn.onclick = () => speakWithTTS(label.includes("Daffa") ? text : label);

    const desc = document.createElement("span");
    desc.innerHTML = `<em>${label}</em>`;
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
    typing.innerText = "Lyra sedang mengetik...";
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