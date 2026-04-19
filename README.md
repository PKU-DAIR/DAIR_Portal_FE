# PKU-DAIR Frontend

<div align="center">
    <img src="./docs/assets/logo.png" alt="PKU-DAIR Logo" />
    <br />
    <a href="https://github.com/PKU-DAIR">
        <img alt="Static Badge" src="https://img.shields.io/badge/%C2%A9-PKU--DAIR-%230e529d?labelColor=%23003985">
    </a>
    <a href="https://github.com/PKU-DAIR/DAIR_Portal_FE">
        <img alt="Static Badge" src="https://img.shields.io/badge/DAIR_Portal_FE-black?logo=github">
    </a>
    <a href="https://github.com/PKU-DAIR/DAIR_Portal_FE">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/PKU-DAIR/DAIR_Portal_FE?logo=github&style=flat">
    </a>
</div>

## Project Overview

PKU-DAIR Frontend is the frontend project for the PKU-DAIR Team Portal Website, built with **Vue 3** and **Vite**.

The portal provides presentation, communication, and management tools for academic teams. It supports team profile display, research project and publication management, news publishing, member profile maintenance, and visual content editing.

## Tech Stack

| Category | Technology |
| --- | --- |
| Frontend Framework | Vue 3 |
| Build Tool | Vite 5 |
| Router | Vue Router 4 |
| State Management | Pinia |
| UI Components | [@creatorsn/vfluent3](https://www.npmjs.com/package/@creatorsn/vfluent3) |
| Visual Editor | [@creatorsn/powereditor3](https://www.npmjs.com/package/@creatorsn/powereditor3) |
| HTTP Client | Axios |
| API Generator | axios-swagger-helper |
| Styles | Sass / SCSS |
| Package Manager | Yarn |
| Deployment | Docker + Nginx |

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

If Vetur is installed, disable it for this Vue 3 project.

## Project Setup

### 1. Install NVM

```shell
# GitHub
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Gitee mirror, usually faster in China
curl -so- https://gitee.com/mirrors/nvm/raw/v0.39.7/install.sh | bash
```

### 2. Activate NVM

```shell
# bash
source ~/.bashrc

# zsh
source ~/.zshrc
```

### 3. Install Node.js 20

```shell
nvm install 20
nvm use 20
nvm alias default 20
```

Check the installed versions:

```shell
node -v
npm -v
```

`node -v` should return `v20.x.x`.

### 4. Install Yarn

```shell
corepack enable
corepack prepare yarn@stable --activate
yarn -v
```

### 5. Install Dependencies

```shell
yarn
```

### 6. Configure Backend URL

The frontend reads the backend base URL from `VITE_BACKEND_URL`.

Development environment:

```shell
# .env.development
VITE_BACKEND_URL=http://100.64.0.18:8000/
```

Production environment:

```shell
# .env.production
VITE_BACKEND_URL=/api
```

The Axios instance is configured in `src/api/config.js`, and generated backend API methods are placed under `src/api`.

### 7. Start Development Server

```shell
yarn dev
```

Vite will start a local development server with hot module replacement.

## Available Scripts

```shell
# Start local development server
yarn dev

# Build production assets and generate gzip files
yarn build

# Preview production build locally
yarn preview

# Lint and auto-fix source files
yarn lint

# Regenerate API client from backend OpenAPI schema
yarn api
```

## Build for Production

```shell
yarn build
```

The build output is generated in `dist/`. The current build script runs Vite first and then executes `scripts/gzip-dist.mjs` to generate compressed static assets.

## API Workflow

### Regenerate API Client

The `api` script in `package.json` fetches the backend OpenAPI schema and generates API files into `src/api`:

```json
{
  "scripts": {
    "api": "api-cli get http://100.64.0.18:8000/openapi.json -d ./src/api"
  }
}
```

Run:

```shell
yarn api
```

### Configure Axios

`src/api/config.js` creates the shared Axios instance:

```javascript
import axios from "axios";

const ax = axios.create();

export const apiBaseURL = import.meta.env.VITE_BACKEND_URL;
ax.defaults.baseURL = apiBaseURL;

export default ax;
```

The request interceptor also reads `ApiToken` and `ApiTokenExpiredAt` from `localStorage`, then sends the token through the `Api-key` header when it is valid.

### Use API in Components

Options API:

```javascript
export default {
    mounted() {
        this.$api.some_module.some_method().then((res) => {
            console.log(res);
        });
    },
};
```

Composition API:

```javascript
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

proxy.$api.some_module.some_method().then((res) => {
    console.log(res);
});
```

You can also import the generated API object directly:

```javascript
import { api } from "@/api";

api.some_module.some_method().then((res) => {
    console.log(res);
});
```

## Global Methods

Global properties are registered in `src/main.js`:

| Method | Description |
| --- | --- |
| `$api` | Generated backend API methods |
| `$axios` | Shared Axios instance |
| `$server` | Backend server URL without trailing slash |
| `$Go(path)` | Navigate with Vue Router |
| `$Back()` | Navigate back |
| `$Jump(url)` | Open a URL in a new browser window |
| `local(text)` | Localized text helper from the app store |

## Project Structure

```text
DAIR_Portal_FE/
+-- docs/                    # Documentation assets
+-- nginx/                   # Nginx configuration for deployment
+-- public/                  # Static public assets
+-- scripts/                 # Build helper scripts
+-- src/
|   +-- api/                 # Axios config and generated backend API client
|   |   +-- api.js
|   |   +-- config.js
|   |   +-- index.js
|   |   +-- model.js
|   +-- assets/              # Local static assets
|   +-- components/          # Reusable Vue components
|   +-- fonts/               # Font assets
|   +-- js/                  # Shared JavaScript utilities
|   +-- router/              # Vue Router configuration and route modules
|   +-- stores/              # Pinia stores
|   +-- style/               # Global styles and SCSS variables
|   +-- views/               # Page-level Vue components
|   +-- App.vue              # Root Vue component
|   +-- main.js              # Vue application entry
+-- .env.development         # Development environment variables
+-- .env.production          # Production environment variables
+-- Dockerfile               # Nginx deployment image
+-- docker-compose.yml       # Docker Compose deployment config
+-- index.html               # Vite HTML entry
+-- package.json             # Scripts and dependencies
+-- vite.config.js           # Vite configuration
+-- yarn.lock                # Dependency lock file
```

## Vite Configuration

`vite.config.js` configures Vue, path aliases, relative production assets, and global SCSS injection:

```javascript
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    base: "./",
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/style/global.scss" as *;`,
            },
        },
    },
});
```

If the development environment needs a Vite reverse proxy instead of directly using `VITE_BACKEND_URL`, add a `server.proxy` section:

```javascript
export default defineConfig({
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://100.64.0.18:8000/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
```

## Deployment

### Docker Deployment

Build the frontend first:

```shell
yarn build
```

Then start the Nginx container:

```shell
docker compose up -d --build
```

The default `docker-compose.yml` maps container port `80` to host port `60081`:

```yaml
version: "3"
services:
  web:
    build: .
    ports:
      - "60081:80"
    restart: always
```

### Manual Deployment

```shell
yarn build
```

Deploy the generated `dist/` directory to an Nginx static site. The repository provides a reference Nginx config at `nginx/nginx.conf`.

## Key Features

### WYSIWYG Visual Editor

<p align="left">
    <img src="./docs/assets/power_editor.png" alt="Power Editor" width="75%" />
</p>

### Team Member and Organization Management

<p align="left">
    <img src="./docs/assets/team.png" alt="Team Management" width="300" />
</p>

### Personal CV Management

<p align="left">
    <img src="./docs/assets/cv.png" alt="CV Management" width="300" />
</p>

### News and Project Management

<p align="left">
    <img src="./docs/assets/news.png" alt="News" width="75%" />
</p>

<p align="left">
    <img src="./docs/assets/news_manage.png" alt="News Management" width="75%" />
</p>

### Publication Management with BibTeX Import

<p align="left">
    <img src="./docs/assets/bib.png" alt="BibTeX Import" width="300" />
</p>

## Dependencies

This project uses [@creatorsn/vfluent3](https://www.npmjs.com/package/@creatorsn/vfluent3) and [@creatorsn/powereditor3](https://www.npmjs.com/package/@creatorsn/powereditor3).

<p align="left">
    <img src="https://raw.githubusercontent.com/aleversn/VFluent/refs/heads/master/examples/assert/logo/VFluent.svg" alt="VFluent Logo" width="55" />
</p>

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
