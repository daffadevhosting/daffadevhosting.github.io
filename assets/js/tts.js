/**
 * TTS untuk DaffaBot tanpa simbol Markdown/HTML
 */
export function speakWithTTS(rawText) {
  const text = rawText
    .replace(/\*\*/g, '')       // **bold**
    .replace(/[\*_`>#~]/g, '')   // simbol formatting
    .replace(/<[^>]*>/g, '')      // HTML tags
    .replace(/\\n/g, ' ')        // newline jadi spasi

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "id-ID";
  utter.pitch = 1;
  utter.rate = 1;

  const voice = speechSynthesis.getVoices().find(v =>
    v.lang === "id-ID" && v.name.toLowerCase().includes("google")
  );
  if (voice) utter.voice = voice;

  speechSynthesis.speak(utter);
}