// **hallo aku putri** udah bagus kan?

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

export function renderGithubCard(items, type) {
    if (!items || items.length === 0) {
        return '';
    }

    let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">';
    items.slice(0, 6).forEach(item => { // Batasi jumlah kartu yang ditampilkan
        if (type === 'repository') {
            html += `
                <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 rounded-lg shadow-md p-4 block hover:bg-gray-700 transition-colors duration-200" data-repo-owner="${item.owner.login}" data-repo-full-name="${item.full_name}">
                  <img src="${item.owner.avatar_url}" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
                    <h3 class="text-lg font-semibold text-white truncate">${item.full_name}</h3>
                    <p class="text-gray-400 text-sm mb-2">${item.description ? item.description.substring(0, 100) + '...' : 'Tidak ada deskripsi.'}</p>
                    <div class="flex justify-between items-center text-gray-500 text-sm">
                        <span>⭐ ${item.stargazers_count}</span>
                        <span>Forks: ${item.forks_count}</span>
                        <span>Lang: ${item.language || 'N/A'}</span>
                    </div>
                </a>
            `;
        } else if (type === 'user') { // <--- PASTIKAN BAGIAN INI BENAR
            html += `
                <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-4 hover:bg-gray-700 transition-colors duration-200">
                    <img src="${item.avatar_url}" alt="${item.login}" class="w-16 h-16 rounded-full border-2 border-purple-500">
                    <div>
                        <h3 class="text-lg font-semibold text-white">${item.login}</h3>
                        <p class="text-gray-400">${item.type}</p>
                        <span class="text-blue-400 text-sm hover:underline">Lihat Profil &rarr;</span>
                    </div>
                </a>
            `;
        } else if (type === 'code') {
             html += `
                <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 rounded-lg shadow-md p-4 block hover:bg-gray-700 transition-colors duration-200">
                  <img src="${item.owner.avatar_url}" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
                    <h3 class="text-lg font-semibold text-white truncate">${item.name}</h3>
                    <p class="text-gray-400 text-sm">Repo: ${item.repository.full_name}</p>
                    <p class="text-gray-500 text-xs">Path: ${item.path}</p>
                    <span class="text-blue-400 text-sm hover:underline">Lihat Kode &rarr;</span>
                </a>
            `;
        } else if (type === 'issue') {
             html += `
                <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 rounded-lg shadow-md p-4 block hover:bg-gray-700 transition-colors duration-200">
                  <img src="${item.owner.avatar_url}" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
                    <h3 class="text-lg font-semibold text-white truncate">${item.title}</h3>
                    <p class="text-gray-400 text-sm">Repo: ${item.repository_url.split('/').slice(-2).join('/')}</p>
                    <p class="text-gray-500 text-xs">Status: ${item.state}</p>
                    <span class="text-blue-400 text-sm hover:underline">Lihat Isu &rarr;</span>
                </a>
            `;
        }
    });
    html += '</div>';
    return html;
}