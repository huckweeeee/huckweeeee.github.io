# Kewei Hu — GitHub Pages 版本

这是个人主页的独立静态工程。`index.html`、`app.js`、`content.js`、`journey.js`、`styles.css` 和 `assets/` 都位于仓库根目录；不需要安装 npm 包或运行构建命令。

## 先在自己的电脑上预览

Windows：解压 ZIP 后，双击 `preview.bat`。如果已安装 Python，脚本会在本机开启一个临时端口，并用默认浏览器打开网页。关闭命令窗口或按 `Ctrl+C` 即可停止。

也可以在该文件夹打开终端，运行：

```sh
python preview.py
```

如果尚未安装 Python，直接双击 `index.html` 也能查看大部分内容；实时学术数据在 `file://` 模式下可能受浏览器限制，因此建议用本地预览脚本。

## 上传到自己的 GitHub 仓库

以下步骤假设你的 **GitHub 用户名确实是 `huckweeeee`**。如果用户名不同，个人主页仓库必须改为 `<你的用户名>.github.io`，并把 `index.html` 中的 `og:url` 改成对应的新网址。

1. 在 GitHub 新建公开仓库，名称填写 **`huckweeeee.github.io`**。
2. 进入仓库，选择 **Add file → Upload files**。打开解压后的工程文件夹，上传其中的**内容**（特别是根目录的 `index.html`、脚本和样式文件、`assets/` 和 `.nojekyll`）。不要只上传 ZIP，也不要把整个工程放进仓库里的同名子文件夹。
3. 提交到 `main` 分支。
4. 打开仓库 **Settings → Pages**，在 **Build and deployment** 中选 **Deploy from a branch**、`main`、`/(root)`，然后保存。
5. 等待 Pages 发布完成，访问 `https://huckweeeee.github.io/`。首次发布或更新可能需要几分钟。

GitHub 网页上传支持拖入文件夹；单个文件须小于其网页上传限额。本工程中最大的网页文件远小于 25 MiB。也可以用 GitHub Desktop 或 Git 命令上传相同的文件夹内容。

## 改网页内容

- `content.js`：个人信息、论文与生活照的顺序及文字。
- `journey.js`：首页互动轨迹地图、年份切换及武汉的小爱心。
- `app.js`：页面结构、筛选、点云球、照片画廊、放大查看和动态统计。
- `styles.css`：颜色、排版及电脑/手机布局。
- `assets/`：网页实际使用的图片。生活照是去除定位元数据后的网页格式，并非原始 HEIC 照片。

首页的引用数据在访问时由浏览器向 OpenAlex 获取；字体由 Google Fonts 加载，因此这两项需要网络。项目本身不含服务器端代码或私密 API 密钥。公开 GitHub 仓库中的代码和图片也会公开可见，请只上传此工程文件夹中的内容。

GitHub Pages 官方说明：<https://docs.github.com/en/pages/quickstart>
