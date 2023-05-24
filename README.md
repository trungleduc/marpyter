# marpyter - Marp for JupyterLab

[![Github Actions Status](https://github.com/trungleduc/marpyter/workflows/Build/badge.svg)](https://github.com/trungleduc/marpyter/actions/workflows/build.yml)

`marpyter` is a JupyterLab extension allowing you to create interactive slide decks using Marp directly within JupyterLab. This extension provides a convenient way for previewing Markdown-based slides in real time.

![marpyter](marpyter.png)

## How to use

To render a markdown file with `marpyter`, from the file browser panel of JupyterLab, users can right-click on the markdown file -> `Open With` -> `Marp Preview`.
A new panel will be opened with the rendered content of the Marp slides.

## Requirements

- JupyterLab >= 4.0.0

## Install

You can install `marpyter` using mamba, pip or conda:

```bash
#Using mamba
mamba install marpyter
#Using conda
conda install marpyter
#Using pip
pip install marpyter
```

## Uninstall

To remove the extension, execute:

```bash
#Using mamba
mamba uninstall marpyter
#Using conda
conda uninstall marpyter
#Using pip
pip uninstall marpyter
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the marpyter directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall marpyter
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `marpyter` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
