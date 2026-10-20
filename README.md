<!-- living-code-readme:1 -->
# ⚡ Living Code for Zed

**Calm slate. Living color.** Living Code for Zed. Repository-owned theme files, installation instructions and four color flavors.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

<table data-lc-flavors>
<tr>
<td width="50%" valign="top">
<strong>Night</strong><br><sub>Dark · full palette</sub><br><br>
<a href="images/night.png"><img src="images/night.png" alt="Zed running Living Code Night" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Frost</strong><br><sub>Dark · softer chroma</sub><br><br>
<a href="images/frost.png"><img src="images/frost.png" alt="Zed running Living Code Frost" width="640"></a>
</td>
</tr>
<tr>
<td width="50%" valign="top">
<strong>Paper</strong><br><sub>Light · near-white slate</sub><br><br>
<a href="images/paper.png"><img src="images/paper.png" alt="Zed running Living Code Paper" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Signal</strong><br><sub>Dark · teal accent</sub><br><br>
<a href="images/signal.png"><img src="images/signal.png" alt="Zed running Living Code Signal" width="640"></a>
</td>
</tr>
</table>

Select any preview to view the image at full size.

## Installation

In Zed, open the Extensions panel (`zed: extensions`, or `cmd-shift-x` on macOS and `ctrl-shift-x` on Linux), search for **Living Code**, and click **Install**. Then pick a flavor with `theme selector: toggle` (`cmd-k cmd-t`).

Without the registry: run `zed: install dev extension` and select the repository root of a checkout, or download the theme file into `~/.config/zed/themes/`:

```sh
mkdir -p ~/.config/zed/themes
curl -fsSL https://raw.githubusercontent.com/living-code-theme/zed/main/themes/living-code.json -o ~/.config/zed/themes/living-code.json
```

The theme file holds all four flavors.

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

<p><a href="images/night.png"><img src="images/night.png" alt="Zed running Living Code Night" width="1280"></a></p>

Choose **Living Code Night** with `theme selector: toggle`, or set this in your Zed settings:

```json
"theme": "Living Code Night"
```

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

<p><a href="images/frost.png"><img src="images/frost.png" alt="Zed running Living Code Frost" width="1280"></a></p>

Choose **Living Code Frost** with `theme selector: toggle`, or set this in your Zed settings:

```json
"theme": "Living Code Frost"
```

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

<p><a href="images/paper.png"><img src="images/paper.png" alt="Zed running Living Code Paper" width="1280"></a></p>

Choose **Living Code Paper** with `theme selector: toggle`, or set this in your Zed settings:

```json
"theme": "Living Code Paper"
```

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

<p><a href="images/signal.png"><img src="images/signal.png" alt="Zed running Living Code Signal" width="1280"></a></p>

Choose **Living Code Signal** with `theme selector: toggle`, or set this in your Zed settings:

```json
"theme": "Living Code Signal"
```

</details>

## Configuration

See [Zed's documentation](https://zed.dev) for application settings and reload behavior. The activation instructions above identify each supported flavor; keep your other application configuration.

## Compatibility

This port supplies theme files for Zed, not the application itself. Install the application separately and follow the installation instructions for its supported configuration format.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/zed/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
