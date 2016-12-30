## 1. 背景

所有 CMS 都是千篇一律的增删改查，看起来并没有什么特别的功能却要投入人力去开发。

为了**解决前端开发资源浪费**的问题，就有了「Duang」这个工具。

## 2. Duang

「Duang」是一个通过**配置文件**来创建 CMS 的解决方案。

## 3. 原理

所有 CMS 的页面结构都是基本相同的，不同之处只是列表项、筛选器、表单项等，这些与业务耦合在一起的东西。

「Duang」通过读取一个 json 文件来配置出 CMS 的列表、表单等页面。

## 4. 快速上手

从零开始，手把手教你跑起一个最简单的「Duang」项目。

### 4.1. 创建项目

创建一个名为 `demo` 的目录作为这个示例的**项目根目录**。

### 4.2. 创建入口文件 index.html

在**项目根目录**中创建 `index.html`，在这个文件中使用 SCRIPT 标签引入 `duang.js`，并且在 SCRIPT 标签上添加 `config` 属性来指定配置文件所在的位置。

以下就是这个文件的完整内容：

```html
<!-- index.html -->
<script
  src="https://github.elemecdn.com/eleme/duang/0.0.47/src/duang.js"
  config="/config.json"
></script>
```

### 4.3. 创建配置文件 config.json

上一步中我们在 SCRIPT 标签上指定了配置文件路径，于是我们应该正确地提供这个文件。

以下就是这个文件的完整内容：

```json
{
  "schemes": [
    {
      "key": "/list.json",
      "title": "一个神奇的列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "ID" },
        { "key": "title", "title": "标题" },
        { "key": "price", "title": "价格" }
      ]
    }
  ]
}
```

### 4.4. 创建 mock 数据

由于这个示例项目并没有真正的后端 API 可以调用，我们就直接以 json 文件的形式 mock API 的结果。

上一步中我们在配置文件中指定了一个 `key` 为 `/list.json`，于是我们应该正确地提供这个接口 mock。

以下就是这个文件的完整内容：

```json
[
  { "id": 1, "title": "这是一条神奇的记录", "price": 500 },
  { "id": 2, "title": "这也是一条神奇的记录", "price": 1000 },
  { "id": 3, "title": "这并不是一条神奇的记录", "price": 5000 }
]
```

### 4.5. 跑起来

到目前为止已经万事俱备了，我们可以在**项目根目录**上启动一个 HTTP 服务来把这个示例项目跑起来。

启动 HTTP 服务的方法有很多，如果大家不知道怎启动的话可以先在终端 `cd` 到**项目根目录**下，然后执行以下命令：

```bash
python -m SimpleHTTPServer
```

之后用 Chrome 打开 http://127.0.0.1:8000 即可访问到这个示例项目。

### 4.6. 后记

这个最简单的实例中只是把一个 mock 的列表 API 以表格的形式展示出来了而已。

实际上「Duang」能做到的远不止这些，具体可以参考其它[配置文档](/duang/config/)。
