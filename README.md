# Todo App

A single-page todo list built with React and Vite. You can add, edit, complete, reorder and delete tasks in the browser, with toast notifications for each action.

## Features

- **Add tasks** with the Add button or the Enter key. Empty input is ignored.
- **Duplicate check**: a task whose text matches an existing one (case-insensitive) is rejected with a warning toast.
- **Edit tasks** in a SweetAlert2 dialog. Empty text is not accepted.
- **Mark tasks complete** with a checkbox. Completed tasks are struck through, moved to the bottom of the list, and their Edit and Move buttons are disabled.
- **Reorder tasks** with the Move Up and Move Down buttons.
- **Delete tasks** after confirming in a toast.
- **Task counts** for total, active and completed tasks.
- **Relative timestamps** on each task (for example "a few seconds ago"), via Day.js.
- **Empty state** message when there are no tasks.

> **Note:** tasks live only in React state. They are not saved anywhere, so refreshing the page clears the list.

## Tech stack

| Area | Library |
| --- | --- |
| UI | React 19 |
| Build tool / dev server | Vite 6 with `@vitejs/plugin-react-swc` |
| Styling | Bootstrap 5, plus custom CSS in `src/styles/global.css` |
| Icons | Font Awesome 6 (loaded from a CDN in `index.html`) |
| Notifications | react-toastify |
| Dialogs | SweetAlert2 |
| Dates | Day.js with the `relativeTime` plugin |
| Linting | ESLint 9 (flat config) with `react-hooks` and `react-refresh` plugins |

The code is plain JavaScript (JSX), not TypeScript.

## Folder structure

```
.
├── index.html                 HTML entry point; loads Font Awesome and Bootstrap from CDNs
├── vite.config.js             Vite config, including the "@" import alias for src/
├── jsconfig.json              Lets editors resolve the "@" alias
├── eslint.config.js           ESLint config
├── public/                    Static files served as-is (vite.svg)
└── src/
    ├── main.jsx               Mounts the app and imports global CSS
    ├── app/
    │   └── App.jsx            Root component: renders TodoApp and the ToastContainer
    ├── features/
    │   └── todos/
    │       ├── index.js       Public exports of the todos feature
    │       ├── components/    TodoApp, TodoForm, TodoStats, TodoList, TodoItem,
    │       │                  EmptyState, DeleteConfirmToast
    │       └── hooks/
    │           └── useTodos.js  Todo state and the add / edit / delete / toggle / reorder logic
    ├── shared/
    │   └── lib/
    │       ├── dayjs.js       Day.js with the relativeTime plugin enabled
    │       └── toast.js       notifySuccess / notifyWarning helpers with shared toast options
    ├── styles/
    │   └── global.css         Custom styles for the checkbox, toasts and buttons
    └── assets/                Images (react.svg)
```

Import from `src/` using the `@` alias, for example `import { TodoApp } from "@/features/todos";`.

## Prerequisites

- **Node.js**: a version supported by Vite 6, which is `^18.0.0 || ^20.0.0 || >=22.0.0`.
- **npm**: the repo includes a `package-lock.json`.

## Setup

```bash
git clone https://github.com/CodeWith-vivek/React-todo.git
cd React-todo
npm install
```

## Environment variables

None. The app does not read any environment variables, and there is no `.env` file.

## Development

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reload (default URL `http://localhost:5173`) |
| `npm run lint` | Runs ESLint on the project |

## Build and run

| Command | What it does |
| --- | --- |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the `dist/` build locally so you can check it |

## Tests

There are no tests and no test runner is configured yet.

## Deployment

There is no deployment config, CI workflow or Dockerfile in this repo. `npm run build` produces a static site in `dist/`, which you can host on any static file host.
