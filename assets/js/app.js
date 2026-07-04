  const blogPostModal = document.getElementById('blogPostModal');
  const blogPostModalTitle = document.getElementById('blogPostModalTitle');
  const blogPostModalContent = document.getElementById('blogPostModalContent');

  async function openBlogPost(url, imageFromLink = '') {
    if (!blogPostModal || !blogPostModalContent) return;

    if (blogPostModalTitle) {
      blogPostModalTitle.textContent = 'Memuat artikel...';
    }

    blogPostModalContent.innerHTML = '<div class="loading">Memuat artikel...</div>';

    try {
      if (window.customElements && typeof window.customElements.whenDefined === 'function') {
        await window.customElements.whenDefined('ion-modal');
      }
      if (typeof blogPostModal.componentOnReady === 'function') {
        await blogPostModal.componentOnReady();
      }
      if (typeof blogPostModal.present === 'function') {
        await blogPostModal.present();
      }

      const fetchUrl = new URL(url, window.location.origin).href;
      const response = await fetch(fetchUrl, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const article = doc.querySelector('main') || doc.querySelector('article') || doc.body;
      const title = doc.querySelector('h1')?.textContent?.trim() || 'Artikel';
      const image = imageFromLink || doc.querySelector('meta[property="og:image"]')?.content || doc.querySelector('img')?.getAttribute('src');

      if (blogPostModalTitle) {
        blogPostModalTitle.textContent = title;
      }

      blogPostModalContent.innerHTML = '';

      if (image) {
        const hero = document.createElement('img');
        hero.src = image;
        hero.alt = title;
        hero.className = 'blog-post-hero-image';
        blogPostModalContent.appendChild(hero);
      }

      const contentContainer = document.createElement('div');
      contentContainer.innerHTML = article.innerHTML;
      contentContainer.querySelectorAll('h1').forEach(el => el.remove());
      blogPostModalContent.appendChild(contentContainer);
      blogPostModalContent.querySelectorAll('a').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    } catch (error) {
      try {
        const parts = (url || '').replace(/\/?$/, '').split('/');
        const slug = parts[parts.length - 1] || '';
        if (!slug) throw error;

        const tryBranches = ['master'];
        let md = null;
        for (const branch of tryBranches) {
          const rawUrl = `https://raw.githubusercontent.com/daffadevhosting/daffadevhosting.github.io/${branch}/_blog/${slug}.md`;
          try {
            const rawRes = await fetch(rawUrl);
            if (rawRes.ok) {
              md = await rawRes.text();
              break;
            }
          } catch (e) {}
        }
        if (!md) throw error;

        const contentMarkdown = md.replace(/^---\s*[\s\S]*?---\s*/, '').trim();
        const rendered = marked.parse(contentMarkdown);
        const clean = DOMPurify.sanitize(rendered);

        const titleMatch = contentMarkdown.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].trim() : (slug.replace(/-/g, ' ') || 'Artikel');

        if (blogPostModalTitle) blogPostModalTitle.textContent = title;
        blogPostModalContent.innerHTML = '';

        if (imageFromLink) {
          const hero = document.createElement('img');
          hero.src = imageFromLink;
          hero.alt = title;
          hero.className = 'blog-post-hero-image';
          blogPostModalContent.appendChild(hero);
        }

        const contentContainer = document.createElement('div');
        contentContainer.innerHTML = clean;
        contentContainer.querySelectorAll('h1').forEach(el => el.remove());
        blogPostModalContent.appendChild(contentContainer);
        blogPostModalContent.querySelectorAll('a').forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        });

      } catch (fallbackErr) {
        if (blogPostModalTitle) {
          blogPostModalTitle.textContent = 'Artikel tidak tersedia';
        }
        blogPostModalContent.innerHTML = `<div class="error-msg">Gagal memuat artikel: ${error.message}</div>`;
      }
    }
  }

  window.openBlogPost = openBlogPost;
  window.closeBlogPostModal = function () {
    if (typeof blogPostModal?.dismiss === 'function') {
      blogPostModal.dismiss();
    }
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('.blog-post-link');
    if (!link) return;

    event.preventDefault();
    const url = link.getAttribute('data-post-url');
    const image = link.getAttribute('data-post-image');
    if (url) {
      openBlogPost(url, image);
    }
  });