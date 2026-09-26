# prelude

![npm version](https://img.shields.io/npm/v/cli-prelude) ![MLoT](https://img.shields.io/badge/MLoT-ai-blue)

prelude is the GitHub repository for CLI Prelude, a Node.js command that prints a configurable message for terminal startup scripts. It is published on npm as [`cli-prelude`](https://www.npmjs.com/package/cli-prelude) version 1.5.1, matching this repository.

![Demo](https://raw.githubusercontent.com/incrediblecrab/mlot-developer-media/main/gifs/prelude.gif)

**Objective:** provide a small terminal message tool with a default prompt, configurable text and configurable border and text colors.

**Inputs:** Node.js, the `prelude` command, and a per-user configuration file at `~/.prelude/config.json`.

**Files:**

- [`bin/`](bin/): the `prelude` executable and command dispatcher
- [`index.js`](index.js): configuration, rendering and command helpers
- [`CHANGELOG.md`](CHANGELOG.md): release notes
- [`package.json`](package.json): npm metadata and the `prelude` bin mapping for the `cli-prelude` package

**Try it:** `npm install -g cli-prelude`, then `prelude help`, or run the checked-out copy with `node bin/prelude.js --help`.

## CLI reference

Commands verified against `bin/prelude.js`:

- `prelude` displays the configured message when `enabled` is true.
- `prelude set "message"` saves a custom message and shows a preview.
- `prelude reset` restores the default configuration.
- `prelude border <color>` sets the border color.
- `prelude text <color>` sets the text color.
- `prelude config` prints the current configuration.
- `prelude enable` and `prelude disable` toggle display without changing the saved message.
- `prelude help`, `prelude --help` and `prelude -h` print usage.

Border colors are `cyan`, `green`, `yellow`, `magenta`, `blue`, `red`, `white`, `random`, `default` or a hex color such as `#ff0000`. Text colors are `cyan`, `green`, `yellow`, `magenta`, `blue`, `red`, `white`, `gray`, `default` or a hex color.

## Examples

```bash
prelude set "Code with purpose"
prelude border default
prelude text default
prelude border cyan
prelude text white
prelude border "#ff6b6b"
prelude text "#4ecdc4"
prelude reset
```

## Configuration

The command stores configuration in `~/.prelude/config.json` and creates `~/.prelude/` when the package is loaded. The default message is `Live where your feet are`, with terminal-default border and text colors.

```json
{
  "enabled": true,
  "colorful": true,
  "border": true,
  "customMessage": "",
  "borderColor": "default",
  "textColor": "default"
}
```

## Startup setup

Add `prelude` to a shell startup file when you want it to appear automatically. The repository documents simple startup use for Zsh, Bash and PowerShell by adding the command to the appropriate profile file; the code itself does not edit shell profiles.

## Development

```bash
npm install
node bin/prelude.js help
```

This package has no configured npm scripts.

## Links

- [npm package](https://www.npmjs.com/package/cli-prelude)
- [Demo video](https://youtu.be/BH22EUGs9qg)
- [MLoT product page](https://mlot.ai/cli-prelude/)
- [Privacy policy](https://mlot.ai/privacy)
- [Issues](https://github.com/incrediblecrab/prelude/issues)
- Publisher: [Max's Lab of Things](https://mlot.ai/)

## License

MIT. See [`LICENSE`](LICENSE).
