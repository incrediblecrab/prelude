# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and GitHub Copilot CLI when working in this repository.

prelude is CLI Prelude, a small Node.js command that prints a bordered, colored message when a terminal starts. The folder and repository are named `prelude`, but the npm package is `cli-prelude` (installing the `prelude` command), so use `cli-prelude` with `npm view` and on the registry. The repository is public.

## Commands

There are no npm scripts, tests or build step; the only dependency is `chalk`. After `npm install`, run the checked-out copy directly:

```bash
node bin/prelude.js help
node bin/prelude.js set "message"   # also: enable, disable, reset, border <color>, text <color>, config
```

The commands write to the real per-user config at `~/.prelude/config.json`, so trying a change alters your own terminal's startup message; `node bin/prelude.js reset` restores the default.

## Structure

`bin/prelude.js` is a `switch` over the first argument that calls helpers exported from `index.js`. `index.js` loads and saves `~/.prelude/config.json`, picks the message, and renders the border and text with `chalk`; the allowed color names are validated in `setBorderColor` and `setTextColor`. A new command needs a `case` in the bin, a helper exported from `index.js`, and a line in the README's command reference.

## Releasing

`files` in `package.json` is the allowlist (`index.js`, `bin/`, `CHANGELOG.md`; npm always adds `README.md`, `LICENSE` and `package.json`). The README states the published version, so bump it with `package.json` and `CHANGELOG.md`. The release checklist is in `../README.md`.
