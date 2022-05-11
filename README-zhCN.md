[English](README.md) **简体中文**

# Resource Han Rounded《魔兽世界》可变字体包

## 用户指南

### 系统要求

* 64 位 Windows、Linux 或 macOS 操作系统。
* 64 位 “常青” 浏览器：
  * Firefox（快速发布版和 ESR）；
  * Edge、Chrome 等及时更新的基于 Chromium 的浏览器。
* Firefox 需要 8 GiB 系统内存；基于 Chromium 的浏览器需要 16 GiB 系统内存。
  * 基于 Chromium 的浏览器在 ≥ 8 GiB 系统内存的情况下可以运行，请按照此应用程序中的指示操作。

说明：
* 虽然本项目基于 Web 技术构建，但下载的 HTML 文件已经包含了所有需要的资源，使用时不需要连接网络。
* 要启用实时预览，Firefox 必须运行在支持可变字体的操作系统上，包括 Windows 10 1809 (LTSC)、Windows 10 21H2+、macOS 10.15+、带有 FreeType 2.8+ 的 Linux。
* 不建议使用国产双核浏览器，它们背负着沉重的历史负担，而本项目重度依赖现代 Web 技术——这注定是难以调和的矛盾。具体问题体现在：
  * 大多数双核浏览器至今尚未发布 64 位版本；
  * 双核浏览器为了优化内核切换，对 Chromium 进行了很多修改，难以及时跟进新版本，对现代 Web 技术的支持参差不齐；
  * 某些浏览器倾向于追求最小内存占用，运行此应用时会频繁启动垃圾回收机制，影响性能。

### 操作步骤

1. Download `RHR-VF-<version>.zip` and unzip it.<br>下载 `RHR-VF-<version>.zip` 并解压。
1. Open the HTML file with **64-bit** browser.<br>使用 **64 位**浏览器打开这个 HTML 文件。
1. Follow the instruction to generate OTF file.<br>根据界面提示操作以生成 OTF 字体。
1. Download the font and copy it to `World of Warcraft/_retail_/Fonts/` with proper filename.<br>下载字体文件，复制到 `World of Warcraft/_retail_/Fonts/` 并按要求重命名。

## 构建此项目

见[英语文档#How to Build](README.md#how-to-build)。
