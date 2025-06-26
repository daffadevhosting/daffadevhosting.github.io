/**
 * Record voice note using MediaRecorder API
 */
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

export async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Browser tidak mendukung perekaman suara.");
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  audioChunks = [];
  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    renderVoiceMessage("user", url, "voice note terkirim");
    // TODO: Upload blob to server or worker if needed
  };

  mediaRecorder.start();
  isRecording = true;
  console.log("🎙️ Rekaman dimulai...");
}

export function stopRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    console.log("🛑 Rekaman dihentikan.");
  }
}

/**
 * Put a voice message bubble in chat (user or bot)
 */
export function renderVoiceMessage(sender, url, label = "voice note") {
  const container = document.getElementById("chat-messages");
  const wrapper = document.createElement("div");
  wrapper.className = `flex ${sender === "user" ? "justify-end" : "justify-start"} items-center gap-2 mb-3`;

  const button = document.createElement("button");
  button.className = "w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center";
  button.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`;
  button.onclick = () => playAudio(url);

  const text = document.createElement("em");
  text.className = "text-sm text-gray-300";
  text.textContent = label;

  wrapper.appendChild(button);
  wrapper.appendChild(text);
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

/**
 * Play voice note audio
 */
export function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}