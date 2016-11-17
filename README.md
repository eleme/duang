# duang

自动 CMS 生成工具

### 1. 介绍

目前各个部门都有 CMS 的需求，而大家各自开发 CMS 的成本将会非常高。比如外卖平台的 sakura 项目，仅前端就需要投入 3 个人力在持续维护。所以我们需要解决这样的人力资源浪费问题。

考虑到每个组都有自己的后端，前后端对接是基于 API 文档的。通过固定 API 的设计规范，从 API 文档和一些配置文件直接生成一个前端的 CMS 在理论上是可行的。

duang 这个工具就是提供一套方案，把配置文件转换成一个可以直接跑起来的前端项目。


### 2. 概览

##### 2.1. 配置文件

配置文件使用 JSON 数据来设计以便于前端项目使用

配置文件最外层是一个数组，对应到 CMS 的主菜单栏。

每个配置项对应一个数据视图（一张虚拟的表）和前端的一个列表页和编辑页

配置项描述列表页显示的字段、筛选器、分页参数，以及其它一些全局按钮行为。

配置项中可以描述记录级的按钮行为。

所有的按钮行为对应到一个后端接口上。


##### 2.2. 前端框架

提供一个通用的前端框架，它根据配置文件来生成对应的页面。

根据配置文件调用对应的后端 API（跨域调用以降低耦合）。

根据配置文件生成对应的表单以编辑数据。


##### 2.3. API 规范

提供一套 API 设计规范，对于数据视图可以采用 RESTful 风格的 API

对列表接口定义通用的分页参数格式

对按钮行为全部使用 POST 方法，表示事务处理


### 3. [解决方案](docs/solutions.md)

### 4. [部署说明](docs/deploy-manual.md)

### 5. 开发方案

项目根路径创建 `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <script src="./src/duang.js" config="http://sakura.alpha.elenet.me/sakura/duang.json"></script>
</body>
</html>
```

设置调试域名的 DNS 解析：

```
127.0.0.1 api.sakura.alpha.elenet.me
```

配置好 Nginx:

```nginx
server {
  listen 80;
  server_name api.sakura.alpha.elenet.me;
  root /Users/chen/repo/eleme-js/duang/; # 改成你自己的路径
  autoindex on;
  index index.html;
}
```

打开域名刷新页面调试.
