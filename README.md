# Resource Han Rounded: Variable Font Distribution for _World of Warcraft_<br>Resource Han Rounded《魔兽世界》可变字体包

## How to Use<br>使用方法

### System requirements<br>系统要求

* 8 GiB RAM.<br>8 GiB 内存。
* 64-bit Windows, Linux or macOS.<br>64 位 Windows、Linux 或 macOS 操作系统。
* 64-bit evergreen browser:<br>64 位 “常青” 浏览器：
  * Chrome, Edge and other up-to-date Chromium-based browsers;<br>Chrome、Edge 等及时更新的基于 Chromium 的浏览器；
  * Firefox (both rapid release and ESR).<br>Firefox（快速发布版和 ESR）。

Notes 说明
* Although this project is based on Web technology, the downloaded HTML file is self-contained, network not required.<br>虽然本项目基于 Web 技术构建，但下载的 HTML 文件已经包含了所有需要的资源，使用时不需要连接网络。
* To enable live preview, Firefox must be run on OS that supports variable font, including Windows 10 1809 (LTSC), Windows 10 21H2+, macOS 10.15+, Linux with FreeType 2.8+.<br>要启用实时预览，Firefox 必须运行在支持可变字体的操作系统上，包括 Windows 10 1809 (LTSC)、Windows 10 21H2+、macOS 10.15+、带有 FreeType 2.8+ 的 Linux。
* _(This note applies only to Chinese users.)_<br>国产双核浏览器通常不是 “常青” 浏览器。
  * 360 极速浏览器 X 21.0.1094.0 经测试会崩溃。
  * 大多数双核浏览器至今尚未发布 64 位版本。

### How to Use<br>操作步骤

1. Download `RHR-VF-<version>.zip` and unzip it.<br>下载 `RHR-VF-<version>.zip` 并解压。
1. Open the HTML file with **64-bit** browser.<br>使用 **64 位**浏览器打开这个 HTML 文件。
1. Follow the instruction to generate OTF file.<br>根据界面提示操作以生成 OTF 字体。
1. Download the font and copy it to `World of Warcraft/_retail_/Fonts/` with proper filename.<br>下载字体文件，复制到 `World of Warcraft/_retail_/Fonts/` 并按要求重命名。

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
