import { renderVoiceMessage } from './voice.js';
import { speakWithTTS } from './tts.js';

let isVoiceMode = false;
let lastReply = "";

/**
 * Dipanggil saat user kirim text (via Enter atau tombol Send)
 */
export function handleTextInput(text) {
  isVoiceMode = false;
  addUserMessage(text);
  return buildPrompt(text); // kamu bisa hubungkan ke AI
}

/**
 * Dipanggil saat user klik tombol mic (tanpa rekaman)
 */
export function handleVoiceInput() {
  isVoiceMode = true;
  renderVoiceMessage("user", null, "voice note terkirim");
  const dummyText = "user mengirim voice note";
  return buildPrompt(dummyText);
}

/**
 * Respons dari AI ditangani sesuai mode
 */
export function handleAIReply(replyText) {
  lastReply = replyText;
  if (isVoiceMode) {
    speakWithTTS(replyText);
    renderVoiceMessage("bot", null, "Daffa mengirim voice note");
  } else {
    addBotMessage(replyText);
  }
}

/**
 * Tampilkan pesan user sebagai bubble teks
 */
function addUserMessage(text) {
  const box = document.getElementById("chat-messages");
  const bubble = document.createElement("div");
  bubble.className = "text-right text-blue-400 my-2 text-sm";
  bubble.innerHTML = `<strong>Kamu:</strong><br>${text}`;
  box.appendChild(bubble);
  box.scrollTop = box.scrollHeight;
}

/**
 * Tampilkan pesan bot sebagai teks (Markdown jika perlu)
 */
function addBotMessage(text) {
  const box = document.getElementById("chat-messages");
  const bubble = document.createElement("div");
  bubble.className = "text-left text-gray-300 my-2 text-sm";
  bubble.innerHTML = `<strong>LYRA:</strong><br>${text}`; // bisa diparse dengan marked
  box.appendChild(bubble);
  box.scrollTop = box.scrollHeight;
}

/**
 * Ubah text user jadi prompt (placeholder)
 */
function buildPrompt(userText) {
  return userText; // bisa modifikasi sesuai skenario AI kamu
}