---

title: "Thicket UI: A Modular Component Framework Built for Jekyll Developers"
img: "https://placehold.co/600x400?text=Thicket+UI"
date: 2026-11-22 00:00:00 +0700
categories: [Web Development]
tags: [Jekyll, Thicket UI, Liquid, SCSS, Frontend, Open Source]
read_time: "6 min read"
excerpt: "Discover Thicket UI, a modular component framework designed to make Jekyll development more efficient with reusable Liquid components, SCSS architecture, design tokens, and modern frontend utilities."

Thicket UI: A Modular Component Framework Built for Jekyll Developers

Jekyll is a powerful static site generator known for its simplicity, performance, and flexibility. However, as projects grow, maintaining consistent UI components, managing stylesheets, and organizing reusable code can become increasingly challenging.

This is where Thicket UI comes in.

Thicket UI is a modular component framework designed specifically for Jekyll developers. It provides a structured approach to building reusable interface components using Liquid, SCSS, and modern frontend technologies without introducing the complexity of a large JavaScript framework.

Whether you are building a personal blog, documentation website, portfolio, or a complete landing page, Thicket UI helps establish a more consistent and maintainable development workflow.

What Is Thicket UI?

Thicket UI is a Jekyll-oriented UI framework that combines reusable Liquid components, modular SCSS, design tokens, and frontend utilities into a single development ecosystem.

Instead of repeatedly writing HTML and CSS for similar interface elements, developers can create reusable components and customize them through Liquid parameters.

For example, a button can be implemented using:

{% include components/button.html
   label="Get Started"
   variant="primary"
   size="lg"
%}

This approach makes components easier to reuse across different pages and layouts.

The goal is simple: reduce repetitive code while keeping the development experience familiar to Jekyll developers.

Why Build Another UI Framework for Jekyll?

Many popular frontend frameworks are designed around JavaScript-based application architectures.

While these frameworks are excellent for interactive applications, they can introduce unnecessary complexity when building traditional static websites.

Jekyll already provides a powerful templating engine through Liquid.

Thicket UI takes advantage of this existing capability instead of replacing it.

Its architecture focuses on three important principles:

- Simplicity: Use technologies already familiar to Jekyll developers.
- Reusability: Build components once and use them across multiple pages.
- Maintainability: Keep component structure, styling, and behavior organized.

This makes Thicket UI particularly useful for developers who want modern interfaces without adopting an entirely new frontend stack.

Core Features of Thicket UI

1. Reusable Liquid Components

Liquid is the foundation of Thicket UI's component architecture.

Developers can organize interface elements into individual files and reuse them through Jekyll's include system.

Common examples include:

- Buttons and badges
- Cards and alerts
- Navigation elements
- Content sections
- Interactive interface elements

Each component can expose parameters for customization, allowing developers to control its appearance and behavior without duplicating markup.

2. Modular SCSS Architecture

Thicket UI uses modular SCSS to separate component styles and make stylesheet management easier.

Rather than maintaining one enormous CSS file, developers can organize styles into smaller, more manageable modules.

A typical structure might look like:

scss/
├── tokens/
├── components/
├── utilities/
└── main.scss

This approach improves code organization and makes customization more predictable.

Developers can modify individual components without unnecessarily affecting unrelated parts of the interface.

3. Design Tokens

Consistent design is important for every website.

Thicket UI uses design tokens to centralize values such as:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Interface dimensions

Using CSS custom properties makes it easier to customize the visual identity of an entire website.

For example:

:root {
  --thicket-primary: #2563eb;
  --thicket-radius: 0.75rem;
  --thicket-spacing: 1rem;
}

Instead of manually changing values across multiple stylesheets, developers can update the underlying design tokens.

4. Utility CSS

Reusable components are useful, but sometimes developers need more flexibility when building custom layouts.

Thicket UI also provides utility classes to simplify common styling tasks.

This allows developers to combine predefined components with custom layouts without creating a new SCSS class for every small adjustment.

The result is a more flexible development experience.

5. Interactive Components

Modern websites need more than static HTML.

Thicket UI incorporates lightweight JavaScript interactions to enhance the user experience while keeping the underlying architecture relatively simple.

Examples include visual effects and interactive interface behaviors.

Using Vanilla JavaScript avoids requiring a large frontend runtime just to implement common UI interactions.

6. CSS Purge Optimization

Performance is an important consideration for static websites.

Unused CSS can increase stylesheet size and negatively affect loading efficiency.

Thicket UI includes a CSS purge workflow designed to scan project content and generate a reduced stylesheet.

For example:

npx thicket purge \
  --output assets/css/thicket.purged.css

This can help reduce unnecessary CSS in production builds.

Dynamic class names should still be handled carefully through appropriate safelist configuration to prevent required styles from being removed.

Designed for the Jekyll Ecosystem

One of the main advantages of Thicket UI is its focus on the Jekyll ecosystem.

It works with the technologies commonly used in Jekyll projects:

Technology| Purpose
Jekyll| Static site generation
Liquid| Component templating
SCSS| Modular styling
CSS Variables| Design tokens
Vanilla JavaScript| Interactive behavior
Node.js| Development tooling

This makes it possible to create a reusable component system without introducing a separate application framework.

Thicket UI can be considered a practical foundation for developers who prefer lightweight static website architectures.

AI-Assisted Development with Jekyll Component MCP

An interesting direction for modern Jekyll development is the integration of AI coding assistants.

With tools such as Claude Code, Cursor, and GitHub Copilot, developers can increasingly delegate repetitive development tasks to AI.

This is where Jekyll Component MCP becomes relevant.

Jekyll Component MCP is an MCP server designed to help AI assistants understand and work with Jekyll projects.

Its capabilities include project inspection, component management, SCSS operations, validation, and Jekyll build workflows.

When combined with Thicket UI, these tools offer an interesting development workflow:

1. AI inspects the existing Jekyll project.
2. It identifies available components and design conventions.
3. It generates new Liquid components.
4. It creates corresponding SCSS styles.
5. It validates the implementation.
6. It runs the Jekyll build to check the result.

This approach has the potential to make AI-assisted Jekyll development more consistent and structured.

Instead of generating unrelated HTML and CSS snippets, AI can work within an established component architecture.

Who Should Use Thicket UI?

Thicket UI can be useful for different types of developers.

Jekyll Developers

Developers who want a more organized way to build and maintain Jekyll websites.

Freelancers

Freelancers who frequently build websites and want reusable components to accelerate project delivery.

Template Creators

Developers creating and selling Jekyll templates can use a consistent component architecture across multiple products.

AI-Assisted Developers

Developers experimenting with AI-powered workflows can use structured components as a foundation for more predictable code generation.

Getting Started

The easiest way to explore Thicket UI is through its official npm package.

Install it using npm:

npm install thicket-ui

You can also explore the package documentation and source code:

- NPM: https://www.npmjs.com/package/thicket-ui
- GitHub: https://github.com/daffadevhosting/jekyll-component-framework

For AI-assisted Jekyll development, explore Jekyll Component MCP:

- NPM: https://www.npmjs.com/package/jekyll-component-mcp
- GitHub: https://github.com/daffadevhosting/jekyll-component-mcp

Refer to the official documentation for installation instructions, configuration requirements, and available features.

Final Thoughts

Jekyll remains a practical choice for developers who value performance, simplicity, and control over their websites.

However, building larger projects requires more than a static site generator. It also requires a consistent approach to reusable components, styling, and development workflows.

Thicket UI addresses this need by bringing together Liquid components, modular SCSS, design tokens, and frontend utilities in a Jekyll-focused framework.

Combined with AI development tools such as Jekyll Component MCP, it also opens the door to a more structured approach to AI-assisted website development.

The future of Jekyll development does not necessarily require heavier frameworks. Sometimes, a better component architecture is all you need.

Explore Thicket UI and discover a more modular way to build with Jekyll.
