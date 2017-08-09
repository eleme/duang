## Input

Input 用于接受用户的输入的组件，在 Duang 中用于:

- [Schemes::inputs](../config/#Scheme::inputs)
- [Schemes::filters](../config/#Scheme::filters)

所有的 Input 控件都有两个公共参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| defaultValue | 与控件的 value 类型相同 | 不同控件具有不同的默认值 | 控件的默认值   |
| readonly     | `Boolean`               | false                    | 是否只读       |

### Input::String

单行文本

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| placeholder  | `String`                | 空字符串                 | 占位文字       |
| width        | `String`                | 300                      | 宽度           |
| maxlength    | `Number`                | 不限制                   | 最大字符个数   |

示例：

```javascript
{
  "component": "String",
  "args": {
    "width": "180px",
    "placeholder": "请输入名称",
    "maxlength": 32
  }
}
```

### Input::Text

参数描述

多行文本

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| placeholder  | `String`                | 空字符串                 | 占位文字       |
| width        | `String`                | 300                      | 宽度           |
| height       | `String`                | 60                       | 高度           |
| maxlength    | `Number`                | 不限制                   | 最大字符个数   |

示例：

```javascript
{
  "component": "Text",
  "args": {
    "width": "180px",
    "height": "300px",
    "placeholder": "请输入名称",
    "maxlength": 1024
  }
}
```

### Input::Number

数值输入

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| max          | `Number`                | 不限制                   | 最大值         |
| min          | `Number`                | 不限制                   | 最小值         |
| width        | `String`                | 6em                      | 宽度           |
| decimal      | `Number`                | 不限制                   | 保留几位小数   |

示例：

```javascript
{
  "component": "Number",
  "args": {
    "width": "180px",
    "min": 20,
    "max": 100
  }
}
```

### Input::Boolean

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| text         | `Object`                | Input::Boolean::text     | 默认文本       |

Input::Boolean::text

| 名字         | 类型                    | 默认值                   | 描述            |
| ------------ | ----------------------- | ------------------------ | --------------- |
| true         | `String`                | "开"                     | true 状态文本   |
| false        | `String`                | "关"                     | false 状态文本  |

示例：

```javascript
{
  "component": "Boolean",
  "args": {
    "text": {
      "true": "有效",
      "false": "无效"
    }
  }
}
```

### Input::Grouping

组合控件

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| inputs       | `Array<Input>`          | 必选参数                 | 默认文本       |
| mode         | `String`                | "table"                  | 显示模式       |

mode 目前支持两种取值，"line" 和 "table"，分别表示单行显示和表格显示。

示例配置

```javascript
{
  "component": "Grouping",
  "args": {
    "mode": "line",
    "inputs": [
      { "component": "String", "key": "name", "title": "名称" },
      { "component": "String", "key": "title", "title": "标题" }
    ]
  }
}
```

### Input::List

列表控件

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| component    | `String`                | "String"                 | 每项的控件类型 |
| args         | `Object`                | 空对象                   | 每项的控件参数 |
| max          | `Number`                | 不限制                   | 项数量上限     |

示例配置

```javascript
{
  "component": "List",
  "args": {
    "component": "String",
    "args": {},
    "max": 10
  }
}
```

### Input::Checkbox

复选框

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| options      | `Object`                | 必选参数                 | 备选项         |

options 是一个对象，其键名对应复选框的 value，其值对应复选框显示的文本。

示例：

```javascript
{
  "component": "Checkbox",
  "args": {
    "options": {
      "pen": "笔",
      "apple": "苹果",
      "pineapple": "凤梨"
    }
  }
}
```

### Input::Radio

单选框

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| options      | `Object`                | 必选参数                 | 备选项         |

options 是一个对象，其键名对应单选框的 value，其值对应单选框显示的文本。

示例配置

```javascript
{
  "component": "Radio",
  "args": {
    "options": {
      "0": "受",
      "1": "攻"
    }
  }
}
```

### Input::Select

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| options      | `Object`                | 必选参数                 | 备选项         |

示例：

```javascript
{
  "component": "Select",
  "args": {
    "options": {
      "active": "启用",
      "inactive": "禁用"
    }
  }
}
```

### Input::GroupingSelect

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| options      | `Object`                | 必选参数                 | 备选项         |
| subGroupMap  | `Object<Array<Input>>`  | 空对象                   | 匹配组         |
| hideKey      | `Boolean`               | false                    | 是否过滤字段   |
| mode         | `String`                | "normal"                 | 排列模式       |

当选择某个选项时，通过选中的值在 subGroupMap 中找到对应的数组，作为 Grouping 的 inputs 渲染。

mode 目前支持两种取值，"line" 和 "normal"，分别表示单行显示和分行显示。

示例：

```javascript
{
  "component": "GroupingSelect",
  "args": {
    "options": {
      "hongbao": "红包",
      "point": "积分"
    },
    "subGroupMap": {
      "hongbao": [
        { "key": "hongbao_amount", "component": "Number", "title": "红包金额" }
      ],
      "point": [
        { "key": "point", "component": "Number", "title": "积分" }
      ]
    }
  }
}
```

### Input::Date

一个日期选择器，基于 [jinkela-datepicker](https://github.com/jinkelajs/jinkela-datepicker)，`args` 中的参数都会传到 `jinkela-datepicker` 的初始化配置中

值的标准格式为 ISO 8601 字符串，时间部分为 0，设置 offset 参数会影响时间部分。

支持以下特殊的取值：

**today**, **nextDay**, **lastDay**, **nextWeek**, **lastWeek**, **nextMonth**, **lastMonth**, **nextYear**, **lastYear**

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| offset       | `Number`                | 0                        | 日期偏移量        |
| ...          | ...                     | ...                      | 透传              |

示例：

```javascript
{
  "component": "Date",
  "args": {
    "defaultValue": "today"
  }
}
```

### Input::Time

一个时间选择器，基于 [jinkela-timepicker](https://github.com/jinkelajs/jinkela-timepicker)，`args` 中的参数都会传到 `jinkela-timepicker` 的初始化配置中。

值的标准格式为 HH:MM:SS 字符串。

支持以下特殊的取值：

**now**

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| ...          | ...                     | ...                      | 透传              |

示例：

```javascript
{
  "component": "Time",
  "args": {
    "defaultValue": "now"
  }
}
```

### Input::DateTime

值的标准格式为 Date 类型的对象。

示例：

```javascript
{
  "component": "DateTime",
  "args": {
    "defaultValue": "2017/6/26 23:59:59"
  }
}
```

### Input::FileBase64

文件上传（Base64 方式）

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| text         | `String`                | "请选择文件"             | 选择文件按钮文案  |
| downloadText | `String`                | "下载"                   | 下载按钮文案      |

示例配置

```javascript
{
  "component": "FileBase64",
  "args": { "text": "上传文件" }
}
```

### Input::FileToken

文件上传（Token 方式）

参数：

| 名字         | 类型                    | 默认值                   | 描述                 |
| ------------ | ----------------------- | ------------------------ | -------------------- |
| text         | `String`                | "请选择文件"             | 选择文件按钮文案     |
| downloadText | `String`                | "下载"                   | 下载按钮文案         |
| api          | `String`                | 必选参数                 | 图片上传接口相对路径 |

提供的 api 应该支持 `POST api` 上传文件（文件所在的字段名叫 file），以及 `GET api/:token` 下载某个 token（用于预览）。

配置：

```javascript
{
  "component": "FileToken",
  "args": {
    "text": "上传文件",
    "api": "/avatar"
  }
}
```

### Input::FileTokenWithInfo

功能同 (InputFileToken)[/duang/docs/components/#Input%3A%3AFileToken] 上传时额外多发送图片相关信息：`width` 和 `height`。

文件上传（Token 方式）

参数：

| 名字         | 类型                    | 默认值                   | 描述                 |
| ------------ | ----------------------- | ------------------------ | -------------------- |
| text         | `String`                | "请选择文件"             | 选择文件按钮文案     |
| downloadText | `String`                | "下载"                   | 下载按钮文案         |
| api          | `String`                | 必选参数                 | 图片上传接口相对路径 |

提供的 api 应该支持 `POST api` 上传文件（文件所在的字段名叫 file），以及 `GET api/:token` 下载某个 token（用于预览）。

### Input::Suggestion

参数：

| 名字         | 类型                    | 默认值                   | 描述                   |
| ------------ | ----------------------- | ------------------------ | ---------------------- |
| api          | `String`                | 必选参数                 | 获取关键词接口相对路径 |
| placeholder  | `String`                | "请选择"                 | 占位文字               |
| width        | `String`                | 600                      | 宽度                   |
| emptyTip     | `String`                | 无结果时不展开提示框     | 无结果时的提示文字     |

当输入时会使用 GET 方法调用这个 api，并且在 QueryString 中带上一个名为 q 的参数（注意其是经过 json encode 的）。
这个接口应该返回一个对象数组，其中的每一个对象都有一个 value 字段。

下面是这个接口的请求实例：

```text
GET /api?q="xxx" HTTP/1.1
Host: ...


HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: ...

[
  { "value": "搜索建议 1" },
  { "value": "搜索建议 2" }
]
```

示例：

```javascript
{
  "component": "Suggestion",
  "args": {
    "api": "suggestion"
  }
}
```

### Input::City

参数：

| 名字             | 类型                    | 默认值                   | 描述                     |
| ---------------- | ----------------------- | ------------------------ | ------------------------ |
| api              | `String`                | 必选参数                 | 获取城市数据接口相对路径 |
| defaultText      | `String`                | "请选择城市"             | 默认提示文案             |
| defaultGroupName | `String`                | "其它"                   | 未分组元素的默认组名     |

配置：

```javascript
{
  "component": "City",
  "args": {
    "api": "/cities",
    "defaultText": "请选择城市",
    "defaultGroupName": "其他"
  }
}
```

### Input::Cascader

级联选择器

这个控件的数据类型是一个数组，每一项表示对应级联项的值。

参数：

| 名字             | 类型                             | 默认值                   | 描述                     |
| ---------------- | -------------------------------- | ------------------------ | ------------------------ |
| options          | `List<Input::Cascader::Options>` | 必选参数                 | 备选项                   |
| placeholder      | `String`                         | "请选择"                 | 占位文字                 |

Input::Cascader::Options:

| 名字             | 类型                             | 默认值                   | 描述                     |
| ---------------- | -------------------------------- | ------------------------ | ------------------------ |
| options          | `List<Input::Cascader::Options>` | 必选参数                 | 备选项                   |
| text             | `String`                         | 取 value                 | 提示文字                 |
| value            | `Any`                            | 取 text                  | 值                       |

示例：

```javascript
{
  "component": "Cascader",
  "args": {
    "options": [
      {
        "value": 1, "text": "item 1",
        "options": [
          { "value": 2, "text": "item 1.1" }
        ]
      }
    ],
    "defaultText": [ 1, 2 ]
  }
}
```

### Input::Forest

树林选择器

这个控件的数据类型是一个数组（递归表），所有根节点作为第一级选项。

参数：

| 名字             | 类型                             | 默认值                   | 描述                     |
| ---------------- | -------------------------------- | ------------------------ | ------------------------ |
| options          | `List<Input::Forest::Options>`   | 必选参数                 | 备选项                   |
| placeholder      | `String`                         | "请选择"                 | 占位文字                 |
| idAlias          | `String`                         | "id"                     | id 字段别名              |
| parentIdAlias    | `String`                         | "parentId"               | parentId 字段别名        |
| textAlias        | `String`                         | "text"                   | text 字段别名            |

Input::Cascader::Options:

| 名字             | 类型                             | 默认值                   | 描述                     |
| ---------------- | -------------------------------- | ------------------------ | ------------------------ |
| [idAlias]        | `Any`                            | 必选参数                 | 自身的唯一 id            |
| [parentIdAlias]  | `Any`                            | 空，表示根节点           | 父节点 id                |
| [textAlias]      | `String`                         | 必选参数                 | 显示的文字               |

示例：

```javascript
{
  "component": "Forest",
  "args": {
    "options": [
      { "id": 1, "text": "item 1", },
      { "id": 2, "parentId": 1, "text": "item 1.1" }
    ],
    "defaultText": [ 1, 2 ]
  }
}
```

### Input::Code

一个代码输入框，底层使用的是 [CodeMirror](https://codemirror.net/doc/manual.html)，`args` 中的参数都会传到 `CodeMirror` 初始化配置中

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| width        | `String`                | 600                      | 宽度              |
| height       | `String`                | 最小 200，自适应增长     | 高度              |
| ...          | ...                     | ...                      | 透传给 CodeMirror |

示例：

```javascript
{
  "component": "Code",
  "args": {
    "width": 100,
    "height": 100,
    "mode": "yaml",
    "lineNumbers": true
  }
}
```

### Input::Markdown

Markdown 输入控件，提供预览功能

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| width        | `String`                | 600                      | 宽度              |
| height       | `String`                | 最小 200，自适应增长     | 高度              |

### Input::Caption

不提供任何数据，仅作为输入控件分组使用

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| h1           | `String`                | 空字符串                 | 主标题            |
| h2           | `String`                | 空字符串                 | 副标题            |

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
