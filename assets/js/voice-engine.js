let inputFromVoice = false;
let isSpeaking = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = "id-ID";
  recognition.continuous = false;
  recognition.interimResults = false;
}
const launcherInput = document.getElementById('launcher-input');
const launcherForm = document.getElementById("chat-launcher-form");
/**
 * Setup voice recognition
 */

if (recognition) {
  recognition.lang = "id-ID";
  recognition.continuous = false;
  recognition.interimResults = false;
}

export function setupVoiceRecognition(micBtn, handleSend) {
  if (!recognition || !micBtn || !handleSend) return;

  micBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
  micBtn.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity-icon lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>`;
    recognition.start();
  });

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript?.trim();
    if (transcript?.length > 0) {
      inputFromVoice = true;
      handleSend(transcript);
    }
  };

  recognition.onend = () => {
    micBtn.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic-icon lucide-mic"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg>`;
  };

  recognition.onerror = (e) => {
    console.warn("🎤 Voice Recognition Error:", e.error);
    micBtn.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic-off-icon lucide-mic-off"><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`;
  };
}

/**
 * Web Speech API (TTS)
 */
export function speakWithTTS(rawText) {
  const text = rawText
    .replace(/\*\*/g, '')
    .replace(/[\*_`>#~]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\\n/g, ' ')
    .trim();

  if (!text) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "id-ID";
  utter.pitch = 1;
  utter.rate = 1;

  const voices = speechSynthesis.getVoices();
  const indo = voices.find(v => v.lang === "id-ID" && v.name.toLowerCase().includes("google"));
  if (indo) utter.voice = indo;

  isSpeaking = true;
  utter.onend = () => { isSpeaking = false; };
  speechSynthesis.speak(utter);
}

/**
 * Check voice-triggered
 */
export function isInputFromVoice() {
  return inputFromVoice;
}

/**
 * Reset input
 */
export function resetVoiceFlag() {
  inputFromVoice = false;
}

export function setVoiceFlag() {
  inputFromVoice = true;
}
