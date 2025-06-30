export function renderGithubCards(repos) {
  if (!repos || !repos.length) return "<p class='text-gray-400'>Tidak ada repositori ditemukan 😕</p>";

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
      ${repos.map(repo => `
        <div class="border border-gray-700 rounded-md p-4 bg-gray-800 shadow flex gap-4">
          <img src="${repo.owner.avatar_url}" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
          <div>
            <a href="${repo.html_url}" target="_blank" class="text-blue-400 font-semibold hover:underline">
              ${repo.full_name}
            </a>
            <p class="text-gray-300 text-sm mt-1">${repo.description || "Tanpa deskripsi."}</p>
            <p class="text-yellow-400 text-xs mt-1">⭐ ${repo.stargazers_count.toLocaleString()} stars</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}