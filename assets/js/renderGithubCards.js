// **hallo aku putri** udah bagus kan?

export function renderGithubCards(repos) {
  if (!repos || !repos.length) return "<p class='text-gray-400'>Tidak ada repositori ditemukan 😕</p>";

  return `
    <div id="grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
      ${repos.map(repo => `
        <div class="repo-card neon-border rounded-xl p-6 border cursor-pointer overflow-hidden border-gray-700  shadow transition-transform hover:scale-[1.02]" data-repo-owner="${repo?.owner?.login}" data-repo-fullname="${repo?.full_name}">
            <div class="flex items-center justify-between mb-4"> // Perubahan di sini: items-center untuk vertikal align
                <div class="flex items-center gap-2"> // Tambahkan div untuk avatar dan ikon
                    <img src="${repo.owner.avatar_url}" alt="${repo.owner.login}" class="w-8 h-8 rounded-full object-cover border border-gray-600" /> // Avatar ditambahkan
                    <i class="fas fa-folder-open text-3xl text-cyan-400"></i>
                </div>
                <span class="text-sm text-gray-400">Updated ${new Date(repo.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">${repo.name}</h3>
            <p class="text-gray-400 text-sm mb-4">${repo.description ? repo.description.slice(0, 150) + (repo.description.length > 180 ? '...' : '') : "Tanpa deskripsi."}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm">
                    <span class="text-yellow-400"><i class="fas fa-star"></i> ${repo.stargazers_count.toLocaleString()}</span>
                    <span class="text-green-400"><i class="fas fa-code-branch"></i> ${repo.forks_count.toLocaleString()}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300">
                    <i class="fas fa-external-link-alt"></i>
                </a>
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

    let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
    items.slice(0, 6).forEach(item => { // Batasi jumlah kartu yang ditampilkan
        if (type === 'repository') {
            html += `
                <div class="repo-card neon-border rounded-xl p-6  shadow-md block hover:bg-gray-700 transition-colors duration-200" data-repo-owner="${item.owner.login}" data-repo-full-name="${item.full_name}">
                    <div class="flex items-start justify-between mb-4">
                        <img src="${item.owner.avatar_url}" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
                        <span class="text-sm text-gray-400">Updated ${new Date(item.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-white">${item.name}</h3>
                    <p class="text-gray-400 text-sm mb-4">${item.description ? item.description.substring(0, 100) + '...' : 'Tidak ada deskripsi.'}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4 text-sm">
                            <span class="text-yellow-400"><i class="fas fa-star"></i> ${item.stargazers_count.toLocaleString()}</span>
                            <span class="text-green-400"><i class="fas fa-code-branch"></i> ${item.forks_count.toLocaleString()}</span>
                        </div>
                        <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            `;
        } else if (type === 'user') {
            html += `
                <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card rounded-xl p-2 neon-border shadow-md block hover:bg-gray-700 transition-colors duration-200">
                <div class="flex gap-4 justify-start-safe">
                    <img src="${item.avatar_url}" alt="${item.login}" class="w-40 h-40 rounded-full border-2 border-purple-500">
                    <div>
                        <h3 class="text-lg font-semibold text-white">${item.login}</h3>
                        <p class="text-gray-400">${item.type}</p>
                        <span class="text-blue-400 text-sm hover:underline">Lihat Profil &rarr;</span>
                    </div>
                </div>
                </a>
            `;
        } else if (type === 'code') {
             html += `
                <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card rounded-xl p-6  shadow-md block hover:bg-gray-700 transition-colors duration-200">
                    <img src="${item.owner.avatar_url}" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
                    <h3 class="text-lg font-semibold text-white truncate">${item.name}</h3>
                    <p class="text-gray-400 text-sm">Repo: ${item.repository.full_name}</p>
                    <p class="text-gray-500 text-xs">Path: ${item.path}</p>
                    <span class="text-blue-400 text-sm hover:underline">Lihat Kode &rarr;</span>
                </a>
            `;
        } else if (type === 'issue') {
             html += `
                <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card rounded-xl p-6  shadow-md block hover:bg-gray-700 transition-colors duration-200">
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