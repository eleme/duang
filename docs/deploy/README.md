## 1. API 系统部署

「Duang」的 API 系统部署主要由三部分组成：

- 配置文件
- 接口
- Web 界面

接下来我们会逐一讲解如何配置以及需要注意的点，同时我们提供了一个 [项目模版](https://github.com/shijn/duang-boilerplate) 可以直接使用或参考配置。

**注意**：项目模版基于 node，请确保你的机器上已经安装

### 1.1 配置文件

假设你的 API 运行在 [http://127.0.0.1/api](http://127.0.0.1/api)，那么 API 根目录的请求应当返回一个 json 格式的 Duang 的配置文件。比如：

```
GET http://127.0.0.1/api/duang.json
```

响应

```json
{ "schemes": [] }
```

### 1.2 接口

API 根据 `Scheme::key` 定义，假设我们定义了如下的 `scheme`：

```json
{
  "key": "orders",
  "title": "订单列表",
  "module": "list"
}
```

那么订单列表模块的接口都会基于 `http://127.0.0.1/api/orders`，比如

```
// 获取订单列表
GET /api/orders?limit=30&offset=0

// 创建订单
POST /api/orders

// 更新订单
PUT /api/orders/:id

// 删除订单
DELETE /api/orders/:id
```

### 1.3 Web 界面

在这套 API 上使用「/」根路径作为 Web 界面（可以视为是一个 Content-Type 为 text/html 的接口）

```
GET /
```

响应

```
200 OK
Content-Type: text/html

<script src="//github.elemecdn.com/eleme/duang/master/src/duang.js" config="/api/duang.json"></script>
```

script 标签的 config 属性指定配置文件的路径，比如这里我们的 config 配置到了 `/api/duang.json`，后面 API 的请求都会基于 `http://127.0.0.1/api` 的前缀发送。

### 1.4 访问、测试

最后在浏览器访问 [http://127.0.0.1/](http://127.0.0.1/) 即可。

## 2. API 设计规范

API 要求是基于 [Restful](https://zh.wikipedia.org/wiki/REST) 设计的，比如：

### 2.1 列表

```
GET /list?limit=:limit&offset=:offset
```
```
[
  { id, ...fields },
]
```

**注意**：需要编辑的记录必须返回 id 字段，以供 Duang 通过 `/:scheme_key/:id` 获取编辑记录的数据

### 2.2 创建

```
POST /:list
{ ...fields }
```

### 2.3 编辑

```
PUT /:list/:id
{ ...fields }
```

### 2.4 删除

```
DELETE /:list/:id
```

### 2.5 获取

```
GET /:list/:id
```
```
{ ...fields }
```

### 2.6 行级事务

```
POST /:list/:id/:action
{ ...args }
```

### 2.7 表级事务（预留）

```
POST /:list/:action
{ ...args }
```
