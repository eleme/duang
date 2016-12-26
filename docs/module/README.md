## Action

#### 介绍

`Action` 是用来操作 表/行级数据 的配置，比如：编辑/删除，在 `Duang` 中用于：

- [Scheme::operations](../api/#Scheme::operations)
- [Scheme::actions](../api/#Scheme::actions)

#### 参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| title | `String` | 名称 |
| method | `String` | 方法名 |
| target | `String` | 交互方式 |
| _blank | `Boolean` | 是否打开新页面 |
| confirm | `Dict` | 额外提示确认操作 |

#### 参数详解

**method**

定义对字段的操作类型

| 名字 | 描述 |
| ---- | ---- |
| go | 页面跳转，新模版由 `module` 定义，默认为 `Page::Default` |
| edit | 页面跳转，新页面为 `Page::Editor` |
| default | 点击后根据 method 发送请求 |

**target**

仅当 `method=go` 时有效，定义新页面的交互形式。

| 名字 | 描述 |
| ---- | ---- |
| _blank | 打开新页面 |
| dialog | 打开对话框 |

**confirm**

`confirm` 用于操作前额外多一次确认交互，比如 `删除` 操作。

| 名字 | 描述 |
| ---- | ---- |
| title | 标题 |
| text | 内容 |
| yes | 对话框确认按钮配置 |
| cancel | 对话框取消按钮配置 |

#### 示例配置

```javascript
{
  title: "删除",
  method: "delete",
  confirm: {
    title: "删除",
    text: "确认删除吗？",
    yes: {
      text: "(╬▔皿▔) 是的！"
    },
    cancel: {
      text: "(っ °Д °;)っ 再考虑考虑！",
      color: "#ccc"
    }
  }
}
```

## 权限控制

#### 介绍

`Session` 用于配置 Duang 系统的授权与跳转登录链接

#### 参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| authorize | String | 权限接口 |
| signin | String | 鉴权失败后跳转的登陆页面 url |
| method | String | 鉴权接口对应的 HTTP 方法，默认 `GET` |

#### 参数详解

**authorize**

授权验证接口 url，Duang 启动时会往这个 url 发送一个根据 `method` 配置的请求（默认是 `post`）。返回的数据结构必须包含 `permission<List>` 字段，示例如下：

```javascript
{
  "user": {
    "name": "shijn",
    "email": "klamtine@gmail.com"
  },
  "permissions": [
    "GET_ORDER.MASTER",
    "EDIT_ORDER.MASTER"
  ]
}
```

**permission**

`permission` 用于配置首页 `scheme` 列表对应 `scheme` 的显示，假设我们有一个 `scheme` 配置如下：

```javascript
{
  "scheme": {
    "key": "order",
    "require": [
      "GET_ORDER.MASTER"
    ]
  }
}
```

调用 `authorize` 配置返回的数据如下：

```javascript
{
  "user": {},
  "permissions": [
    "GET_ORDER.DEV",
    "EDIT_ORDER.DEV"
  ]
}
```

可以看到，`authorize` 接口返回的 `permissions` 中并不包含 `GET_ORDER.MASTER`，因此在首页不会渲染出 key 为 order 的 `scheme`

**signin**

配置用户登录的 url，支持 Javascript 表达式，例如：

```javascript
{
  signin: "${location.origin.replace(/eleme/, 'yourdomain') + '?from=' + encodeURIComponent(location.href)}"
}
```

当 `authorize` 接口返回满足以下条件时，页面会跳转到配置的登录链接：

- 接口状态码返回 `4xx` or `5xx`
- 接口返回内容包含 `{ name: UNAUTHORIZED }`
