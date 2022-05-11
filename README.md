**English** [简体中文](README-zhCN.md)

# Resource Han Rounded: Variable Font Distribution for _World of Warcraft_

## User Guide

### System requirements

* 64-bit Windows, Linux or macOS.
* 64-bit evergreen browser:
  * Firefox (both rapid release and ESR);
  * Up-to-date Chromium-based browsers, such as Chrome, Edge, Opera, Vivaldi, Brave, etc.
* 8 GiB system RAM for Firefox; 16 GiB system RAM for Chromium-based browsers.
  * It is possible to run the app in Chromium-based browsers with ≥ 8 GiB RAM. Follow the instruction given in the app.

Notes:
* Although this project is based on Web technology, the downloaded HTML file is self-contained, network not required.
* To enable live preview, Firefox must be run on OS that supports variable font, including Windows 10 1809 (LTSC), Windows 10 21H2+, macOS 10.15+, Linux with FreeType 2.8+.

### How to Use

1. Download `RHR-VF-<version>.zip` and unzip it.
1. Open the HTML file with **64-bit** browser.
1. Follow the instruction to generate OTF file.
1. Download the font and copy it to `World of Warcraft/_retail_/Fonts/` with proper filename.

## How to Build

Dependencies:
* Node.js
* Python
* fontTools (`pip install fonttools`)

```bash
# install dependencies
npm install

# prepare font
cp /path/to/ResourceHanRoundedSC-VF.otf rhr/
./snippet/prepare-font.sh

# build the HTML bundle
npx webpack
```
