# Resource Han Rounded: Variable Font Distribution for _World of Warcraft_<br>Resource Han Rounded《魔兽世界》可变字体包

<!-- ## How to Use<br>使用方法

### System requirements<br>系统要求

* 8 GiB RAM.<br>8 GiB 内存。
* 64-bit Windows, Linux or macOS.<br>64 位 Windows、Linux 或 macOS 操作系统。
* 64-bit modern browser:<br>现代浏览器的 64 位版本：
  * Chrome, Edge and other Chromium-based browsers (recommended);<br>Chrome、Edge 等基于 Chromium 的浏览器（推荐）；
  * Firefox (recommended);<br>Firefox（推荐）；
  * 360 Chrome Browser X, switching to “”;<br>360 极速浏览器 X，切换到 “极速内核”。

Note: although this distribution is based on Web technology, the downloaded HTML file is self-contained, network not required.<br>
说明：虽然本字体包基于 Web 技术构建，但下载的 HTML 文件已经包含了所有需要的资源，使用时不需要连接网络。

### 操作步骤

1. Download `RHR-VF-distribution.html`.<br>下载 `RHR-VF-distribution.html`。
1. Open the HTML file with **64-bit** browser.<br>使用 **64 位**浏览器打开这个 HTML 文件。
1. Follow the instruction.<br>根据界面提示操作。 -->

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
