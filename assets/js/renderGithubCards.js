export function renderGithubCards(repos) {
  if (!repos || !repos.length) return "<p class='text-gray-400'>Tidak ada repositori ditemukan 😕</p>";

  return `
    <div id="grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
      ${repos.map(repo => `
        <div class="border cursor-pointer overflow-hidden border-gray-700 rounded-md p-4 bg-gray-800 shadow flex gap-4 transition-transform hover:scale-[1.02]" data-repo-owner="${repo?.owner?.login}" data-repo-fullname="${repo?.full_name}">
          <img src="${repo.owner.avatar_url}" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
          <div>
            <a href="${repo.html_url}" target="_blank" class="text-blue-400 font-semibold hover:underline">
              ${repo.full_name}
            </a>
            <p class="text-gray-300 text-sm mt-1">${repo.description ? repo.description.slice(0, 150) + (repo.description.length > 180 ? '...' : '') : "Tanpa deskripsi."}</p>
            <div class="flex justify-between items-center">
            <p class="text-yellow-400 text-xs mt-1">⭐ ${repo.stargazers_count.toLocaleString() ?? 'N/A'} stars</p>
            <p class="text-green-400 text-xs mt-1">${repo.language || 'Unknown language'}</p>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

export function renderGithubCard(repo) {
  if (!repo || typeof repo !== "object") return "";

  return `
    <div id="grid" class="border w-fit cursor-pointer overflow-hidden border-gray-700 bg-gray-800 rounded-md p-4 shadow-md flex gap-4 items-start my-4 transition-transform hover:scale-[1.02]" data-repo-owner="${repo?.owner?.login}" data-repo-fullname="${repo?.full_name}">
      <img src="${repo.owner?.avatar_url || "./assets/images/logo.png"}" alt="Avatar" class="w-14 h-14 rounded-full object-cover" />
      <div>
        <div>
          <a href="${repo.html_url}" target="_blank" class="text-blue-400 font-bold text-base hover:underline">
            ${repo.full_name ? repo.full_name.slice(0, 25) + (repo.full_name.length > 15 ? '...' : '') : "L Y Я A"}
          </a>
          <p class="text-gray-300 text-sm mt-1">${repo.description ? repo.description.slice(0, 150) + (repo.description.length > 180 ? '...' : '') : "AI Custom User-Agent "}</p>
          <div class="flex gap-2 justify-between items-center">
            <p class="text-yellow-400 text-xs mt-2">⭐ ${repo.stargazers_count?.toLocaleString() ?? '500'} stars</p>
            <p class="text-green-400 text-xs mt-2">${repo.language || 'Jekyll, Javascript'}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
