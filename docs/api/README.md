## API document

### Duang::logo

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| logo | `String` or `dict` | 显示在页面左上角，默认显示「Duang」|

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

参数描述

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| key | String | 表对应的接口 |
| title | String | 表显示的名称 |
| where | dict | 进入这张表的默认查询条件 |
| caption | list | 一个 `Output` 类型的数组，配置列表页的表头 |
| pageSize | number | 配置列表页每页显示的条数，默认显示所有 |
| require | Array | scheme 出现在首页需要的权限 |
| hidden | Boolean | scheme 是否在首页展示 |

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

### Scheme::operations

一个 `Action` 类型的数组，配置表级别的操作，比如新增，清空

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| title | String | 操作显示名称 |
| method | String | 操作类型 |
| target | String | 交互方式 |

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

示例配置

```javascript
{
  fields: [
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
      component: 'DateTime',
      args: {
        format: '$Y-$M-$D'
      }
    }
  ]
}
```

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
| title | String | 字段展示名称 |
| component | String | 指定 `Input` 组件 |

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
