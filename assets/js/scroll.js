/**
 * Scroll chat container ke bawah (smooth & aman)
 */
export function scrollToBottom() {
  const messages = document.getElementById("chat-messages");
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
}