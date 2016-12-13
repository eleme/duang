这篇文档中我们会从零开始，一步一步搭建一个订单管理 CMS 系统，最终效果可以查看 [在线演示](http://codepen.io/shijn/pen/mOoabm?editors=0010#0)。

Duang 的配置文件主要由以下几部分组成：

#### [Schemes](../api/#Duang::schemes)

`Schemes` 对应数据库表，这个集合中的表都会展现在 Duang 中并根据配置对接口发送对目标表增删查改的操作，假设我们的业务现在包含 `Order` 表，对应的配置就可能是下面这样：

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "title", "title": "订单名称" },
        { "key": "price", "title": "价格" },
        {
          "key": "createdAt",
          "title": "创建日期",
          "args": {
            "component": "DateTime"
          }
        }
      ],
      "operations": [
        { "title": "创建", "method": "create", "target": "dialog" }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "再考虑考虑" },
            "yes": { "text": "删除" }
          }
        }
      ],
      "inputs": [
        { "key": "title", "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期",
          "component": "Date"
        }
      ],
      "filters": [
        {
          "key": "created_at_from",
          "title": "创建时间从",
          "component": "Date"
        },
        {
          "key": "created_at_to",
          "title": "创建时间到",
          "component": "Date",
          "args": { "offset": 864E5 }
        }
      ]
    }
  ]
}
```

上面的配置就是我们订单管理 CMS 最终的样子，其中的 `Operations`、`Inputs`、`Actions` 等配置接下来我们会逐一讲解，现在我们只需要关注 schemes 的配置。

我们尝试使用上面的配置作为 `duang.json`，我们会发现，虽然前端可以看到用户和订单的展示界面，但是表格里却没有数据。这是因为 duang 会基于这个配置往 `/users` 和 `/orders` 发送一个 `get` 请求获取数据以展示。API 相对链接基于 `Scheme::key` 的配置，这就是我们前面提到的API 设计规范的一部分。

#### [Scheme::fields](../api/#Scheme:fields)

数据库记录中，通常我们并不想通过接口返回所有的字段，比如 is_delete、updated_at、created_at 等等，通过 配置 `Fields` 选择展现那些字段。**注意**：`Fields` 配置不为空时，Duang 才会请求 `/:scheme_key` 接口获取列表数据。

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "name", "title": "名称" },
        { 
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        { 
          "key": "createdAt", 
          "title": "创建日期",
          "component": "DateTime"
        }
      ]
    }
  ]
}
```

查看 [在线演示](http://codepen.io/shijn/pen/Lbvbog?editors=0010#0)

#### [Scheme::actions](../api/#Scheme::actions)

`Actions` 用来配置记录的操作，如编辑、删除。其中可供编辑的字段会根据 `Inputs` 展示在表格中供用户填写，这意味着接口返回的 `item<List>` 数据中必须有 `id` 字段，这样 Duang 会往 `/:scheme/:id` 发送一个请求获取对应记录的数据。

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "name", "title": "名称" },
        { 
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        { 
          "key": "createdAt", 
          "title": "创建日期",
          "component": "DateTime"
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "取消" },
            "yes": { "text": "删除" }
          }
        }
      ]
    }
  ]
}
```

查看 [在线演示](http://codepen.io/shijn/pen/pNBRvw?editors=0010#0)

现在在我们的订单列表上多了 编辑 和 删除的入口，操作后我们会发现删除功能正常，但是编辑却无法正常显示数据，这是因为我们还没有配置 `Inputs`，Duang 不知道该展现哪些字段以及用什么组件展现每个字段。

#### [Scheme::inputs](../api/#Scheme::inputs)

`Inputs` 用来配置每条记录哪些字段是可以接收输入并提交给后端的，以及用那个组件去展示这个字段，用于对表记录的新建、更新操作时使用。

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "name", "title": "名称" },
        { 
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        { 
          "key": "createdAt", 
          "title": "创建日期",
          "component": "DateTime"
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "取消" },
            "yes": { "text": "删除" }
          }
        }
      ],
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "Date"
          }
        }
      ]
    }
  ]
}
```

查看 [在线演示](http://codepen.io/shijn/pen/aBxpyP?editors=0010#0)

#### [Scheme::operations](../api/#Scheme::operations)

`Operations` 同 `Actions` 类似，区别在于它是用来配置对表的操作，如新增一条记录。

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "name", "title": "名称" },
        { 
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        { 
          "key": "createdAt", 
          "title": "创建日期",
          "component": "DateTime"
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "取消" },
            "yes": { "text": "删除" }
          }
        }
      ],
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "Date"
          }
        }
      ],
      "operations": [
        { "title": "创建", "method": "create", "target": "dialog" }
      ]
    }
  ]
}
```

查看 [在线演示](http://codepen.io/shijn/pen/qqwRPw?editors=0010#0)

#### [Scheme::filters](../api/#Scheme::filters)

最后一个配置项是 `Filters`，顾名思义 `Filters` 是用来对列表数据进行筛选，向 API 发送类似 `/orders/?where={"status":"success"}` 的请求，下面给我们的订单管理系统加一个根据价格范围筛选订单的功能

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "name", "title": "名称" },
        { 
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        { 
          "key": "createdAt", 
          "title": "创建日期",
          "component": "DateTime"
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "取消" },
            "yes": { "text": "删除" }
          }
        }
      ],
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "price",
          "title": "价格",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "Date"
          }
        }
      ],
      "operations": [
        { "title": "创建", "method": "create", "target": "dialog" }
      ],
      "filters": [
        {
          "key": "price_min",
          "title": "价格高于",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        },
        {
          "key": "price_max",
          "title": "价格低于",
          "component": "Number",
          "args": {
            "fixed": 2
          }
        }
      ]
    }
  ]
}
```

查看 [在线演示](http://codepen.io/shijn/pen/bBJgaW?editors=0010#0)

至此，我们的订单管理系统搭建完成，如果你的系统需要更多的输入/输出控件和交互方式，可以继续阅读 [Input](../components/#Input) 和 [Output](../components/#Output) 以及 [Action](../module/#Action)
