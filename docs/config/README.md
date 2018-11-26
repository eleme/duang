## Duang

### Duang::logo

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| logo | `String` or `Object` | 显示在页面左上角，默认显示「Duang」|

示例配置

```javascript
{
  logo: {
    component: 'HTML',
    args: {
      html: 'Custom Duang logo'
    }
  },

  // 或者使用字符串
  logo: 'Custom Duang logo'
}
```

### Duang::session

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| authorize | String | 权限接口 |
| signin | String | 鉴权失败后跳转的登陆页面 url |
| method | String | 鉴权接口对应的 HTTP 方法，默认 `GET` |

示例配置

```javascript
{
  authorize: 'token_validate',
  method: 'post',
  signin: 'https://yourwebsite/signin'
}
```

### Duang::schemes

一个 `Scheme` 对象的数组，配置这个系统的所有表

示例配置

```javascript
{
  schemes: [
    {
      key: 'home',
      title: '首页'
    },
    {
      key: 'order',
      title: '订单列表',
      caption: [{
        component: 'Html',
        args: { html: '订单列表' }
      }],
      pageSize: 50,
      where: {
        id: 834934
      },
      require: ['GET_ORDER.MASTER'],
      hidden: false
    }
  ]
}
```

## Scheme

一个 Scheme 可以理解为对一张表的一组操作集合，也可以理解为页面左侧菜单的一个项。

如果 Scheme 是一个字符串，那么会将这个字符串作为 api 的路径，调用这个 api 来获取 Scheme。

参数描述

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| key | String | 对应的 api（需要唯一） |
| title | String | 菜单项上的文字（用「-」分隔可以自动聚合成二级菜单） |
| module | String | Scheme 打开时使用的模块（默认是 list） |
| href | String | 如果设置了 href，该选项会忽略其他配置，直接变成超链接，target 也会变成超链接的打开方式 |
| target | String | 当前菜单项的打开方式，如果设置了 href 则表示超链接的打开方式 |
| icon | String | 图标的 URL |
| [where](#Scheme::where) | Object | 进入这张表的默认查询条件 |
| caption | list | 一个 `Output` 类型的数组，配置列表页的表头 |
| pageSize | number | 配置列表页每页显示的条数，默认显示所有 |
| countable | Boolean | 配置为 true 后会调用接口获取结果集总数用于渲染分页导航，接口地址为 `key + "/count"`，需返回一个数字 |
| require | Array | scheme 出现在首页需要的权限 |
| hidden | Boolean | scheme 是否在首页展示 |
| listSelector | Boolean | 列表项是否允许选择，默认不允许 |
| noWhere | String | 进入列表时不发起查询，以这个字符串提示用户 |
| noSubmit | Boolean | 在编辑页隐藏提交按钮 |
| gentleRefreshing | Boolean | 后台加载完毕后再刷新，跳过 Loading 状态 |
| beforeApply | DynamicAction | 筛选按钮前执行一个动作 |
| [filterStyle](#Scheme::filterStyle) | String | 设置筛选器样式 |

### Scheme::module

默认是 `list`，这意味着用户点击菜单项时默认使用列表页的模板来渲染这个 `Scheme`。

某些操作可以修改页面的 `module`，比如一个 `method` 为 `edit` 的 `Action` 被点击时会将当前页面的 `module` 改成 `editor`。
对用户的感受就是点击「编辑」按钮时进入编辑页。

除了 `list` 和 `editor` 外，还自带了 `custom` 模板来嵌入外部页面（因为 Duang 不能满足所有需求，特殊页面需要外嵌）。

`custom` 的行为是将 `params` 里的 `href` 以 iframe 的形式作为页面内容。


### Scheme::operations

一个 `Action` 类型的数组，配置表级别的操作，比如新增，清空

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| title | String | 操作显示名称 |
| method | String | 操作类型，取值为 create 表示进入标准创建页，取值为 open 表示打开一个 url，其它取值表示 http 方法 |
| target | String | 交互方式，取值为 dialog 时以对话框的形式打开页面，其它情况与 html 中 A 标签的 target 属性一致 |
| href | String | 只有 method 为 open 时才有意义，表示打开的目标 URL |
| api | String | 只有 method 为 http 方法时才有意义，表示请求的目标接口 |
| query | Boolean | 调接口时是否带上 QueryString，默认不带 |
| require | Array 或 String | 依赖 [Session::authorize](#Session::authorize) 的权限列表中存在这个字符串时才可启用该动作 |

示例配置

```javascript
{
  operations: [
    {
      title: '创建',
      method: 'create',
      target: 'dialog'
    }
  ]
}
```

### Scheme::fields

一个 `Output` 类型的数组，配置列表需要展示的字段（注：若配置了此字段 `Duang` 会根据 `key` 值作为地址发送 API 请求）

参数描述

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| key | String | 字段名 |
| title | String | 字段展示名称 |
| component | String | 指定 `Output` 组件（默认为 `html`）|
| sortable | Boolean | 是否可以根据此字段排序（前端）|
| aggregate | String | groupBy 时的聚合函数，目前取值只支持 `sum` |
| labelText | String | groupBy 时的自定义文本（默认为 `多个值`）|

#### 最简单的列表

```json
{
  "key": "normal-list",
  "title": "配置 - 列表 - 标准",
  "fields": [
    { "key": "id", "title": "ID" },
    { "key": "type", "title": "类型" },
    { "key": "title", "title": "名称" },
    { "key": "description", "title": "描述" }
  ]
}
```

[试一试](../../demo/#!module=list&key=normal-list)

#### 列表中使用组件

```json
{
  "key": "components-list",
  "title": "配置 - 列表 - 列表中使用组件",
  "fields": [
    { "key": "id", "title": "ID" },
    { "key": "title", "title": "<font color=red>加特技</font>" },
    { "key": "value", "title": "排序", "sortable": true },
    {
      "key": "description", "title": "悬停提示控件", "component": "TextTip",
      "args": { "tip": "无提示文字", "text": "悬停显示描述" }
    },
    { "key": "img", "title": "图片控件", "component": "Image" }
  ]
}
```

[试一试](../../demo/#!module=list&key=components-list)

### Scheme::filters

一个 Input 类型的数组，配置列表的可用筛选条件

参数描述

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| key | String | 字段名 |
| title | String | 字段展示名称 |
| component | String | 指定 `Input` 组件 |

示例配置

```javascript
{
  filters: [
    {
      key: 'name',
      title: '名称'
    },
    {
      key: 'createdAt',
      title: '创建时间',
      component: 'Date'
    }
  ]
}
```

### Scheme::inputs

一个 `Input` 类型的数组，配置记录添加和编辑时需要的字段

参数描述

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| key | String | 字段名 |
| title | String | 字段展示名称（支持 HTML) |
| component | String | 指定 `Input` 组件 |
| args | Object | 组件的参数 |
| description | String | 描述（支持 HTML） |
| require | Array 或 String | 依赖 [Session::authorize](#Session::authorize) 的权限列表中存在这个字符串时才可启用该动作 |

示例配置

```javascript
{
  inputs: [
    {
      key: 'title',
      title: '名称'
    },
    {
      key: 'price',
      title: '价格',
      component: 'Number'
    },
    {
      key: 'createdAt',
      title: '创建日期',
      componnet: 'Date'
    },
    {
      key: 'download',
      title: '下载',
      component: 'Custom',
      args: {
        html: '<a href=\'/config/download\' download>点击下载</a>'
      }
    }
  ]
}
```

### Scheme::actions

一个 `Action` 类型的数组，配置行级别的操作，比如编辑、删除

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| title | String | 操作显示名称 |
| method | String | 操作类型 |
| target | String | 交互方式 |

示例配置

```javascript
{
  actions: [
    {
      title: '编辑',
      target: 'dialog',
      method: 'edit'
    },

    {
      title: '删除',
      method: 'delete',
      confirm: {
        title: '确认删除？',
        text: '记录删除后不可恢复',
        cancel: {
          text: '(っ °Д °;)っ 再考虑考虑！'
        },
        yes: {
          text: '(╬▔皿▔) 是的！'
        }
      }
    }
  ]
}
```

### Scheme::groupBy

一个字符串数组，描述 fields 中哪些字段是需要聚合的

```json
{
  "key": "mergable-list",
  "title": "配置 - 列表 - 合并单元格",
  "module": "list",
  "groupBy": [ "type" ],
  "actions": [
    { "method": "post", "title": "处理" }
  ],
  "fields": [
    { "key": "type", "title": "Type" },
    { "key": "name", "title": "Name" },
    { "key": "tag", "title": "Tag" },
    { "key": "value", "title": "Value", "aggregate": "sum" }
  ]
}
```

[试一试](../../demo/#!module=list&key=mergable-list)

### Scheme::filterStyle

修改筛选器样式，目前支持 `normal` 和 `floating` 两个取值

```yaml
- key: "the-filter?_=style"
  title: "配置 - 筛选器 - 浮动样式"
  filterStyle: floating
  filters:
    - title: 名称
      key: f1
      args: { width: 80 }
    - title: 描述
      key: f2
      args: { width: 100 }
    - title: 没卵用的字段
      key: x1
      component: DateTime
    - title: 没卵用的字段
      key: x2
      component: Select
      args: { '@options': the-options }
    - title: 没卵用的字段
      key: x3
      component: Radio
      args: { '@options': the-options }
    - title: 没卵用的字段
      key: x4
      component: Checkbox
      args: { '@options': the-options }
  fields:
    - key: id
      title: ID
      sortable: true
    - key: title
      title: 名称
    - key: description
      title: 描述
```

[试一试](../../demo/#!module=list&key=the-filter%3F_%3Dstyle)

### Scheme::params

一个对象，从列表进入 Scheme 时候默认带到 URL 上的 params

params 有一些特殊用途：

| 名称 | 类型 | 用途 | 示例 |
| ---- | ---- | ---- | ---- |
| id | Any | 从列表页进入编辑页时带上的 ID | - |
| readonly | Boolean | 页面进入只读模式 | - |
| filterState | "folded", <br/>"unfolded" | 筛选器的折叠状态<br/>（如果未设置则不可折叠）| [试一试](../../demo/#!module=list&key=the-filter%3F_%3Dfolded&params=%7B"filterState"%3A"folded"%7D) |
| fields | Array&lt;String&gt; | 提供自定义需要展示的字段的能力<br/>（默认不提供） | [试一试](../../demo/#!module=list&key=normal-list%3F_%3Doptional-fields&params=%7B"fields"%3A%5B"title"%2C"description"%5D%7D) |

### Scheme::where

一个对象，用于设置默认筛选条件

```yaml
- key: "the-filter?_=where"
  title: 配置 - 筛选器 - 默认条件
  where:
    f1: 烧
  filters:
    - title: 名称
      key: f1
  fields:
    - key: id
      title: ID
      sortable: true
    - key: title
      title: 名称
    - key: description
      title: 描述
```

[试一试](../../demo/#!module=list&key=the-filter%3F_%3Dwhere&where=%7B"f1"%3A"烧"%7D)

## Action

`Action` 是用来操作 表/行级数据 的配置，比如：编辑/删除，在 `Duang` 中用于：

- [Scheme::operations](#Scheme::operations)
- [Scheme::actions](#Scheme::actions)

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| title | String | 名称 |
| method | String | 方法名 |
| target | String | 交互方式 |
| _blank | Boolean | 是否打开新页面 |
| confirm | Dict | 额外提示确认操作 |
| require | Array 或 String | 依赖 [Session::authorize](#Session::authorize) 的权限列表中存在这个字符串时才可启用该动作 |
| requireField | Array 或 String | 依赖当前行的某个字段值为真才可启用该动作 |

注意：如果同时设置了 require 和 requireField 就必须同时满足这两项条件。

#### Action::method

定义对字段的操作类型

| 名字 | 描述 |
| ---- | ---- |
| go | 页面跳转，新模版由 `module` 定义，默认为 `Page::Default` |
| edit | 页面跳转，新页面为 `Page::Editor` |
| read | 页面跳转，新页面为 `Page::Editor`，所有控件置为 readonly 状态 |
| copy | 页面跳转，新页面为 `Page::Editor`，加载当前记录除 id 外的的完整数据作为初始数据，提交时创建新记录 |
| default | 点击后根据 method 发送请求 |

#### Action::target

仅当 `method=go` 时有效，定义新页面的交互形式。

| 名字 | 描述 |
| ---- | ---- |
| _blank | 打开新页面 |
| dialog | 打开对话框 |

#### Action::confirm

`confirm` 用于操作前额外多一次确认交互，比如 `删除` 操作。

| 名字 | 描述 |
| ---- | ---- |
| title | 标题 |
| text | 内容 |
| yes | 对话框确认按钮配置 |
| cancel | 对话框取消按钮配置 |

Action 示例配置

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

## Session

`Session` 用于配置 Duang 系统的授权与跳转登录链接

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| authorize | String | 权限接口 |
| signin | String | 鉴权失败后跳转的登陆页面 url |
| method | String | 鉴权接口对应的 HTTP 方法，默认 `GET` |

#### Session::authorize

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

#### Session::permission

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

#### Session::signin

配置用户登录的 url，支持 Javascript 表达式，例如：

```javascript
{
  signin: "${location.origin.replace(/eleme/, 'yourdomain') + '?from=' + encodeURIComponent(location.href)}"
}
```

当 `authorize` 接口返回满足以下条件时，页面会跳转到配置的登录链接：

- 接口状态码返回 `4xx` or `5xx`
- 接口返回内容包含 `{ name: UNAUTHORIZED }`


### Duang::nav

一个 `Output` 对象的数组，配置导航栏上的项

默认值

```json
[ { "component": "User" } ]
```

因为有个叫 User 的 Output 控件，所以默认会显示用户信息。

当主动配置 nav 时会覆盖掉默认配置，如果同时也需要显示用户信息可以手动在配置中把默认项加进去。

示例配置

```json
{
  "nav": [
    {
      "component": "HTML",
      "args": {
        "html": "文字"
      }
    }
  ]
}
```

## DynamicAction

动态动作

| 字段名 | 类型   |
| ------ | ------ |
| action | String |
| args   | Object |

action 的取值：
`success`, `failure`, `confirm`, `replace`, `assign`,
`open`, `go`, `get`, `put`, `delete`, `post`, `patch`

<br/>
