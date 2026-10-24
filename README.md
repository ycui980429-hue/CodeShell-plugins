# CodeShell 插件库

CodeShell 的外部插件集合。应用内：设置 → 插件 → 「插件库（git 仓库）」→ 拉取插件库 → 一键安装。

## 目录约定

```
plugins/
  <插件id>/
    plugin.json   必需：{ id, name, version, description?, author?, permissions?, icon?, title?, renderer? }
    renderer.js   必需：ES 模块，export async function activate(host) → { page }
    main.js       可选：主进程模块 module.exports = { register(ctx) }
```

## 添加新插件

1. 在 `plugins/` 下建目录（目录名 = 插件 id）
2. 写 `plugin.json` 与 `renderer.js`
3. 推送到本仓库
4. 应用里「拉取插件库」→ 安装

字段与 host API 的完整说明见 CodeShell 仓库内 `PLUGINS.md`。

## 信任提示

插件不是沙箱：渲染层与内置功能同权，主进程模块有完整 Node 能力。`permissions`
字段用于安装时的知情确认。请只安装你信任来源的插件。
