# Aaron，Z作品 · milestone1

## 在线预览

[打开音乐作品主页](https://aaronzhao84.github.io/music-portfolio/)

GitHub README 不适合直接嵌入可交互的完整 HTML 页面：GitHub 会对 `iframe` 等嵌入内容进行安全过滤。这里使用在线预览链接，点击后进入完整的 GitHub Pages 页面；如果需要在 README 中展示静态效果，可以另外加入截图并链接到上面的页面。

这是音乐创作主页当前版本的完整快照，后续上传 GitHub Pages 时可将本目录内容作为网站根目录。

## 目录

```text
milestone1/
├─ index.html                 # GitHub Pages 默认入口
├─ 主页预览_v1.css             # 基础布局与视觉样式
├─ 主页预览_v2.css             # 当前版本的动画、指针、背景和细节样式
├─ 主页预览_v2.js              # 作品数据、播放、暂停、歌词、下载与导航交互
└─ preview_assets/
   ├─ *.mp3                    # 10 首作品音频
   ├─ *.txt                    # 10 首作品歌词
   ├─ *.png                    # 10 首作品封面
   ├─ cover_background_v1.png  # 页面背景
   └─ 神念2.png                # 关于创作区域背景
```

## 当前功能

- 10 首作品按 Portfolio 顺序展示；
- 作品卡片点击切换当前歌曲；
- 点击唱片 A 播放或暂停；
- 播放时唱片旋转，唱针落下，暂停时唱针抬起；
- 详情区域显示封面、歌曲说明和歌词；
- 支持歌词展开与播放同步；
- 支持 MP3 播放与下载；
- 支持作品档案、当前作品、关于创作页面锚点导航；
- 页面使用相对路径，适合直接部署到 GitHub Pages。

## GitHub Pages 上传提示

上传时将 `milestone1` 文件夹内的全部内容放在仓库根目录，确保 `index.html` 与 `preview_assets` 位于同一级目录。不要只上传 HTML、CSS、JS，否则图片、歌词和 MP3 无法加载。
