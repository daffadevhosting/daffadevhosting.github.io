import { searchGithubRepos } from './githubService.js';
import { renderGithubCards } from './renderGithubCards.js';

export async function handleGithubSearchIntent(userMessage, chatBox) {
  const match = userMessage.match(/repo(?:sitori)?(?:\s+apa|)\s+(.*)/i);
  const keyword = match ? match[1] : userMessage.replace(/^cari\s+/i, "").trim();

  if (!keyword) {
    chatBox.innerHTML += "<p class='text-gray-400'>Kata kunci pencarian tidak ditemukan 😕</p>";
    return;
  }

  const repos = await searchGithubRepos(keyword);
  if (repos.length === 0) {
    chatBox.innerHTML += "<p class='text-gray-400'>Tidak ada repositori ditemukan untuk <strong>" + keyword + "</strong></p>";
    return;
  }

  const cardHTML = renderGithubCards(repos);
  chatBox.innerHTML += cardHTML;
  chatBox.scrollTop = chatBox.scrollHeight;
}