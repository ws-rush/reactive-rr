<p align='center'>
  <img src='https://api.iconify.design/carbon:chart-radar.svg?color=%23939598' alt='Reactive-rr - Opinionated Vite Starter Template' width='80'/>
</p>

<p align='center'>
Mocking up web app with <b>Reactive-rr</b><br>
</p>

<br>

<p align='center'>
<a href="https://reactive-template.netlify.app/">Live Demo</a>
</p>

<br>

## Features

- ⚡️ [React 19](https://react.dev/), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂️ [File based routing with layouts support](https://reactrouter.com/dev/how-to/file-route-conventions), with a bundled [skill](.agents/skills/react-router/SKILL.md) to guide router usage

- 🎨 [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework packed with classes

- 😃 [Use icons from any icon sets with components](https://github.com/unplugin/unplugin-icons)

- 🔤 [Self-hosted fonts](https://fontsource.org/fonts/red-hat-text/install).

- 🌍 [I18n ready](https://lingui.dev/) — with a dedicated linter ([eslint-plugin-lingui](https://github.com/lingui/eslint-plugin)) and bundled [skills](.agents/skills/lingui-best-practices/SKILL.md) to keep translations consistent


- 🏷️ [Manage meta tsgs](https://react.dev/blog/2024/04/25/react-19#support-for-metadata-tags)

- 🖼 [Transform and Optmize images](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite)

- 🦾 TypeScript, of course

- 🥊 Git hooks with [lefthook](https://github.com/evilmartians/lefthook)

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest)<!--, E2E Testing with [Cypress](https://cypress.io/)
  on [GitHub Actions](https://github.com/features/actions) # miss ci piplines and e2e test-->

<br>

## Try it now!

> Reactive-rr requires Node >=20.x

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/ws-rush/reactive-rr/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit ws-rush/reactive-rr my-reactive-app
cd my-reactive-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Remove the `.github` folder
- [ ] Clean up the READMEs and remove routes
- [ ] Remove tests and write your own

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:5173

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Container Production Build

First, build the reactive-rr image by opening the terminal in the project's root directory.

```bash
## SPA build
podman build -t reactive-rr-spa -f apps/web/Containerfile.spa apps/web

## MPA build
podman build -t reactive-rr-mpa -f apps/web/Containerfile.mpa apps/web
```

Run the image and specify port mapping with the `-p` flag.

```bash
## SPA run
podman run --rm -p 8080:80 reactive-rr-spa:latest

## MPA run
podman run --rm -env-file apps/web/.env -p 3000:3000 reactive-rr-mpa:latest
```

## Staying up to date

This is a template, not a dependency — it evolves over time. Here's how to spot new releases and see exactly which files differ between your version and a newer one.

### Checking for changes

The template's version lives in the root [`package.json`](package.json) under `"version"` (e.g. `8.2.0-0`). A bump there means a new release — compare it to the version you started from. Releases and version tags also appear on [GitHub](https://github.com/ws-rush/reactive-rr/releases).

> **Tip:** leave that version value untouched (in `package.json` or a `TEMPLATE_VERSION` file) — it *is* your baseline. Overwriting it with your app's own version loses the reference you need to track upstream changes.

### Getting the changes

Compare the two versions **inside the template** (your baseline → the target version) to see which files changed — not against your own project, which has diverged.

Easiest: GitHub's compare view between the two version tags (no clone needed):

> `https://github.com/ws-rush/reactive-rr/compare/<your-version>...<target-version>`

Or, in a clone of the template, list the changed files:

```bash
git diff <your-version>..<target-version> --stat        # changed files
git diff <your-version>..<target-version> --name-only   # file paths only
git diff <your-version>..<target-version> -- <file>     # one file's diff
```

Then port the changes that make sense into your project by hand.

## Why

Configure apps is a headeach, I loved vitesse template for vue, so I decided do one for react.
