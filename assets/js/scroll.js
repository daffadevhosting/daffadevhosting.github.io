/**
 * Scroll chat container ke bawah (smooth & aman)
 */
export function scrollToBottom() {
  const container = document.getElementById("chat-messages");
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}