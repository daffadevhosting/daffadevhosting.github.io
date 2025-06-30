export async function searchGithubRepos(query, username = "") {
  const q = username ? `${query} user:${username}` : query;
  const apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github+json',
<<<<<<< HEAD
        'User-Agent': 'daffadevhosting'
=======
        'User-Agent': 'DaffaBot'
>>>>>>> refs/remotes/origin/master
        // Add Authorization here if using a GitHub token
      }
    });

    if (!res.ok) throw new Error("GitHub API error: " + res.statusText);
    const data = await res.json();
    return data.items || [];

  } catch (err) {
    console.error("🔴 GitHub fetch error:", err.message);
    return [];
  }
}