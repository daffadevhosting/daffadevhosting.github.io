// githubSearchHandler **putridinar**
import { searchGithubRepos } from './githubService.js';
import { renderGithubCards } from './renderGithubCards.js';

export async function handleGithubSearchIntent(userMessage, chatBox) {
  const normalizedMessage = userMessage.toLowerCase().trim();
  let keyword = '';

  // Prioritas 1: Mencari pola "repo [milik/dari/punya/oleh] [kata kunci]"
  // Contoh: "cari repo milik react", "repo punya google", "repositori dari microsoft"
  // Regex ini akan menangkap kata setelah 'milik', 'dari', 'punya', 'oleh'
  const ownershipPatternMatch = normalizedMessage.match(
    /(?:repo(?:sitori)?(?:\s+apa)?\s+)?(?:milik|dari|punya|oleh)\s+(.*)/
  );

  if (ownershipPatternMatch && ownershipPatternMatch[1]) {
    keyword = ownershipPatternMatch[1].trim();
  } else {
    // Prioritas 2: Mencari pola "repo [kata kunci]" atau "cari [kata kunci]"
    // Contoh: "cari repo framework", "repo javascript", "cari tailwind css"
    const directKeywordMatch = normalizedMessage.match(
      /(?:repo(?:sitori)?(?:\s+apa)?|cari)\s+(.*)/
    );

    if (directKeywordMatch && directKeywordMatch[1]) {
      keyword = directKeywordMatch[1].trim();
    } else {
      // Prioritas 3 (Fallback): Anggap seluruh pesan sebagai kata kunci
      // Ini akan digunakan jika tidak ada pola di atas yang cocok
      // Hati-hati dengan fallback ini, pastikan tidak menangkap input yang terlalu ambigu
      if (!['repo', 'repositori', 'cari'].includes(normalizedMessage) &&
          !normalizedMessage.startsWith('repo ') &&
          !normalizedMessage.startsWith('repositori ') &&
          !normalizedMessage.startsWith('cari ')) {
        keyword = normalizedMessage;
      }
    }
  }

  // Pastikan keyword valid dan tidak kosong
  if (!keyword || keyword.length < 2) { // Tambahkan validasi panjang keyword minimal 2 karakter
    chatBox.innerHTML += "<p class='text-gray-400'>Kata kunci pencarian tidak ditemukan atau terlalu pendek 😕</p>";
    return;
  }

  chatBox.innerHTML += `
    <p class="text-gray-300 animate-pulse" id="loadingMessage">🔄 Mencari repositori "<strong>${keyword}</strong>"...</p>
  `;

  const repos = await searchGithubRepos(keyword);
  if (repos.length === 0) {
    chatBox.innerHTML += `<p class='text-gray-400'>Tidak ada repositori ditemukan untuk <strong>${keyword}</strong></p>`;
    return;
  }

  const cardHTML = renderGithubCards(repos);
  chatBox.innerHTML += cardHTML;
  document.getElementById('loadingMessage')?.remove();
  chatBox.scrollTop = chatBox.scrollHeight;
}
