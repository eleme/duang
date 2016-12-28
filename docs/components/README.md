## Input

Input 用于接受用户的输入，然后提交给后端 API 的一类组件，在 Duang 中用于:

- [Schemes::inputs](../config/#Scheme::inputs)
- [Schemes::filters](../config/#Scheme::filters)

### Input::String

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| default | `String` | 默认值 |
| placeholder | `String` | 占位符 |
| width | `String` | 宽度（px） |
| readonly | `Boolean` | 是否只读 |

示例配置

```javascript
{
  title: "名称",
  key: "name",
  "default": "eleme",
  component: "String",
  args: {
    width: "180px",
    placeholder: "请输入名称",
    readonly: true
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/MbRpBN?editors=0010#0)

### Input::Text

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| default | `String` | 默认值 |
| placeholder | `String` | 占位符 |
| width | `String` | 宽度（px） |
| height | `String` | 高度（px）|
| readonly | `Boolean` | 是否只读 |

示例配置

```javascript
{
  title: "名称",
  key: "name",
  "default": "eleme",
  component: "Text",
  args: {
    width: "180px",
    height: "300px",
    placeholder: "请输入名称",
    readonly: true
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/Pbgprd?editors=0010#0)

### Input::Number

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| default | `Number` or `String` | 默认值 |
| min | `Number` | 值下限 |
| max | `Number` | 值上限 |
| width | `String` | 宽度（px） |
| readonly | `Boolean` | 是否只读 |

示例配置

```javascript
{
  title: "年龄",
  key: "age",
  "default": 50,
  component: "Number",
  args: {
    width: "180px",
    min: 20,
    max: 100,
    readonly: false
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/YpMVze?editors=0010#0)

### Input::Boolean

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `Boolean` | 字段的布尔值 |
| text | `Dict` | 状态文案 |
| readonly | `Boolean` | 是否只读 |
| fontSize | `Number` or `String` | 字体大小 |

示例配置

```javascript
{
  key: "active",
  component: "Boolean",
  value: true,
  args: {
    text: {
      "true": "有效",
      "false": "无效"
    },
    fontSize: 13
    readonly: false
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/ENJmaZ?editors=0010#0)

### Input::Grouping

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| Inputs | `List<Input>` | 输入字段 |

示例配置

```javascript
{
  key: "images",
  component: "Grouping",
  args: {
    inputs: [{
      component: "String",
      key: "name",
      title: "名称"
    }, {
      component: "String",
      key: "title",
      title: "标题"
    }]
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/vyMmNj?editors=0010#0)

### Input::Checkbox

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| Options | `List` | 可选项 |
| readonly | `Boolean` | 是否只读 |

示例配置

```javascript
{
  key: "search",
  title: "搜索",
  component: "Checkbox",
  readonly: false,
  args: {
    options: {
      male: '男',
      female: '女'
    }
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/rWbwRo?editors=0010#0)

### Input::Radio

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| Options | `List` | 可选项 |
| readonly | `Boolean` | 是否只读 |

示例配置

```javascript
{
  key: "search",
  title: "搜索",
  component: "Radio",
  readonly: false,
  args: {
    options: {
      male: '男',
      female: '女'
    }
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/woZeVr?editors=0010)

### Input::Select

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| Options | `List` | 可选项 |
| readonly | `Boolean` | 是否只读 |

示例配置

```javascript
{
  key: "status",
  title: "状态",
  component: "Select",
  readonly: false,
  args: {
    options: {
      active: '启用',
      inactive: '禁用'
    }
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/QGPgem?editors=0010#0)

### Input::GroupingSelect

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| Options | `List` | 可选项 |
| subGroupMap | `Dict` | 子选项 |
| readonly | `Boolean` | 是否只读 |
| hideKey | `Boolean` | 是否过滤字段 |

示例配置

```javascript
{
  key: "type",
  title: "类型",
  component: "GroupingSelect",
  readonly: false,
  args: {
    options: {
      hongbao: "红包",
      point: "积分"
    },
    subGroupMap: {
      hongbao: [{
        key: "hongbao_amount",
        component: "Number",
        title: "红包金额",
        args: { fixed: 2 }
      }],
      point: [{
        key: "point",
        component: "Number",
        title: "积分"
      }]
    }
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/QGPgem?editors=0010#0)

### Input::Code

一个代码输入框，底层使用的是 [CodeMirror](https://codemirror.net/doc/manual.html)，`args` 中的参数都会传到 `CodeMirror` 初始化配置中

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| width | `Number` or `String` | 宽度（px） |
| height | `Number` or `Height` | 高度（px） |

示例配置

```javascript
{
  key: "config",
  title: "配置",
  component: "Code",
  args: {
    width: 100,
    height: 100,
    mode: "yaml",
    lineNumbers: true
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/MbRvKZ?editors=0010)

### Input::Date

一个日期选择器，底层使用的是 [jinkela-datepicker](https://github.com/YanagiEiichi/jinkela-datepicker)，`args` 中的参数都会传到 `jinkela-datepicker` 的初始化配置中

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| offset | `Number` | 日期偏移量（支持负数）|

示例配置

```javascript
{
  key: "config",
  title: "结束日期",
  component: "Date",
  args: { offset: 864E5 }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/bBJPEE?editors=0010)

### Input::FileBase64

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| text | `String` | 选择文件按钮文案 |

示例配置

```javascript
{
  key: "file",
  title: "文件",
  component: "FileBase64",
  args: { text: '上传文件' }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/jVRjry?editors=0010#0)

### Input::FileToken

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `String` | api token |
| text | `String` | 选择文件按钮文案 |
| api | `String` | 图片上传接口相对路径 |

示例配置

```javascript
{
  key: "avatar",
  title: "头像",
  component: "FileToken",
  value: { token: '9038e42' }
  args: {
    text: '上传文件',
    api: '/avatar'
  }
}
```

查看 [在线演示](http://codepen.io/pen/?editors=0010#0)

## Output

`Output` 是用来输出展示数据的一类组件，在 `Duang` 中用于：

- [Duang::logo](../config/#Duang::logo)
- [Scheme::caption](../config/#Duang::schemes)
- [Scheme::fields](../config/Scheme::fields)

### Output::HTML

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `String` | 数据源 |
| html | `String` | html 内容 |

示例配置

```javascript
{
  component: "HTML",
  "@value": "summary",
  args: {
    html: "<div>总价: {total_amount}, 创建日期: {created_at}</div>"
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/MbRMpE?editors=0010#0)

### Output::Number

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `String` | 数据 |
| fixed | `String` or `Number` | 保留小数位数 |

示例配置

```javascript
{
  component: "Number",
  key: "price",
  args: {
    fixed: 2
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/BQEgRK?editors=0010#0)

### Output::Boolean

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `Boolean` | 字段的布尔值 |
| text | `Dict` | 状态文案 |

示例配置

```javascript
{
  component: "Boolean",
  key: "active",
  args: {
    "text": {
      "true": "有效",
      "false": "无效"
    }
  }
}
```

查看 [在线演示](http://codepen.io/pen/?editors=0010#0)

### Output::Datetime

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `Number` or `DateString` | 日期 |
| format | `String` | 日期显示格式 |
| offset | `Number` | 日期偏移量（支持负数）|

示例配置

```javascript
{
  component: "Datetime",
  key: "createdAt",
  title: "创建日期",
  args: {
    format: "$Y-$M-$D",
    offset: -864E5
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/yVrdXz?editors=0010#0)

### Output::Enum

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `String` | 字段名 |
| map | `Dict` | 数据源 |

示例配置

```javascript
{
  component: "Enum",
  key: "type",
  title: "类型",
  args: {
    "@map": "type_map"
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/VmNJWO?editors=0010#0)

### Output::Link

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| value | `String` | 链接名 |

示例配置

```javascript
{
  component: "Link",
  key: "order/:id",
  title: "订单",
  params: {
    "#id": "123"
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/JbVQyw?editors=0010#0)

### Output::Table

参数描述

| 名字 | 类型 | 描述 |
| ---- | ---- | ---- |
| fields | `List<Output>` | 展示字段 |

示例配置

```javascript
{
  component: "Table",
  key: "details",
  title: "详细信息",
  args: {
    fields: [
      {
        key: "id",
        title: "id"
      },
      {
        key: "name",
        title: "名称"
      }
    ]
  }
}
```

查看 [在线演示](http://codepen.io/shijn/pen/ENJBwe?editors=0010)
