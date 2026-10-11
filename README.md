# DaffaDev Jekyll

Jekyll site for [daffadevhosting.github.io](https://daffadevhosting.github.io), combining an Indonesian-language blog with a chat interface, repository browser, and PWA support.

## Development

Install the Ruby dependencies and start the local server:

```sh
bundle install
bundle exec jekyll serve
```

Build the site without starting the server:

```sh
bundle exec jekyll build
```

## Project structure

- `_includes/` contains reusable Liquid fragments for the page shell and tabs.
- `_layouts/` contains the default, blog listing, and article layouts.
- `_blogpost/` and `_posts/` contain published content.
- `assets/css/` contains site and component styles.
- `assets/js/` contains the chat and repository application module.
- `assets/images/` and `assets/favicon/` contain static media.
- `sw.js` and `manifest.json` provide PWA support.

The GitHub Actions workflow builds the site and publishes `_site/` to GitHub Pages.
