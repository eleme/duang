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

| 名字         | 类型                    | 默认值                   | 描述             |
| ------------ | ----------------------- | ------------------------ | ---------------- |
| placeholder  | `String`                | 空字符串                 | 占位文字         |
| width        | `String`                | 300                      | 宽度             |
| maxLength    | `Number`                | 不限制                   | 最大字符个数     |
| minLength    | `Number`                | 不限制                   | 最少字符个数     |
| notEmpty     | `Boolean`               | 不限制                   | 限制必须非空     |
| autoTrim     | `Boolean`               | 不限制                   | 自动清除空格     |

示例：

```javascript
{
  "component": "String",
  "args": {
    "width": "180px",
    "placeholder": "请输入名称",
    "maxLength": 32
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::String)

### Input::Password

单行文本

参数：

| 名字         | 类型                    | 默认值                   | 描述             |
| ------------ | ----------------------- | ------------------------ | ---------------- |
| placeholder  | `String`                | 空字符串                 | 占位文字         |
| width        | `String`                | 300                      | 宽度             |
| maxLength    | `Number`                | 不限制                   | 最大字符个数     |
| minLength    | `Number`                | 不限制                   | 最少字符个数     |
| notEmpty     | `Boolean`               | 不限制                   | 限制必须非空     |
| autoTrim     | `Boolean`               | 不限制                   | 自动清除空格     |

示例：

```javascript
{
  "component": "Password",
  "args": {
    "width": "180px",
    "placeholder": "请输入密码",
    "maxLength": 32
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::Password)

### Input::Text

参数描述

多行文本

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| placeholder  | `String`                | 空字符串                 | 占位文字       |
| width        | `String`                | 300                      | 宽度           |
| height       | `String`                | 60                       | 高度           |
| maxLength    | `Number`                | 不限制                   | 最大字符个数   |
| minLength    | `Number`                | 不限制                   | 最少字符个数   |
| notEmpty     | `Boolean`               | 不限制                   | 限制必须非空   |
| autoTrim     | `Boolean`               | 不限制                   | 自动清除空格   |

示例：

```javascript
{
  "component": "Text",
  "args": {
    "width": "180px",
    "height": "300px",
    "placeholder": "请输入名称",
    "maxLength": 1024
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::Text)

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

[试一试](../../demo/#!module=editor&key=Input::Number)

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

[试一试](../../demo/#!module=editor&key=Input::Boolean)

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

* `defaultValue` 设置成 `{ "all": true }` 可以默认全选

[试一试](../../demo/#!module=editor&key=Input::Checkbox)

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

[试一试](../../demo/#!module=editor&key=Input::Radio)


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

[试一试](../../demo/#!module=editor&key=Input::Select)

### Input::ImageSelector

从 0.0.117 开始支持

图片选择控件（类似 Radio，只不过选项是一张张图片而不是文字）

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| options      | `Array<Object>`         | 必选参数                 | 备选项         |

options 是一个对象数组，其中的对象结构为：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| src          | `String`                | 必选参数                 | 图片 URL       |
| value        | `Any`                   | 必选参数                 | 选中时的值     |

示例配置

```javascript
{
  "component": "ImageSelector",
  "args": {
    "options": [
      { "src": "https://fuss10.elemecdn.com/1/89/56d597e004abf8d30365009c4492bjpeg.jpeg", "value": "麦当劳" },
      { "src": "https://fuss10.elemecdn.com/7/d3/48a777a6b444dc317cc24d101220cjpeg.jpeg", "value": "肯德基" },
      { "src": "https://fuss10.elemecdn.com/4/ff/bde8cd29387027b84824a95e0058bjpeg.jpeg", "value": "德克士" }
    ]
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::ImageSelector)

### Input::Date

一个日期选择器，基于 [jinkela-datepicker](https://github.com/jinkelajs/jinkela-datepicker)，`args` 中的参数都会传到 `jinkela-datepicker` 的初始化配置中

值的标准格式为 ISO 8601 字符串，时间部分为 0，设置 offset 参数会影响时间部分。

支持以下特殊的取值：

**today**, **nextDay**, **lastDay**, **nextWeek**, **lastWeek**, **nextMonth**, **lastMonth**, **nextYear**, **lastYear**

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| mode         | `String`                | 使用 ISO 8601 字符串     | 取值 "UNIX_TIMESTAMP"，表示这个控件的输入输出值变成标准的 Unix 时间戳 |
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

[试一试](../../demo/#!module=editor&key=Input::Date)

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

[试一试](../../demo/#!module=editor&key=Input::Time)

### Input::DateTime

值的标准格式为 Date 类型的对象。

参数：

| 名字         | 类型                    | 默认值                   | 描述                                                                  |
| ------------ | ----------------------- | ------------------------ | --------------------------------------------------------------------- |
| mode         | `String`                | 使用 ISO 8601 字符串     | 取值 "UNIX_TIMESTAMP"，表示这个控件的输入输出值变成标准的 Unix 时间戳 |

示例：

```javascript
{
  "component": "DateTime",
  "args": {
    "defaultValue": "2017/6/26 23:59:59"
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::DateTime)

### Input::FileBase64

文件上传（Base64 方式）

参数：

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| text         | `String`                | "请选择文件"             | 选择文件按钮文案  |
| downloadText | `String`                | "下载"                   | 下载按钮文案      |
| notEmpty     | `Boolean`               | 不限制                   | 限制必须非空     |

示例配置

```javascript
{
  "component": "FileBase64",
  "args": { "text": "上传文件" }
}
```

[试一试](../../demo/#!module=editor&key=Input::FileBase64)

### Input::FileToken

文件上传（Token 方式）

参数：

| 名字                  | 类型                     | 默认值                       | 描述                      |
| --------------------- | ------------------------ | ---------------------------- | ------------------------- |
| text                  | `String`                 | "请选择文件"                 | 选择文件按钮文案          |
| downloadText          | `String`                 | "下载"                       | 下载按钮文案              |
| api                   | `String`                 | 必选参数                     | 图片上传接口相对路径      |
| limit                 | `Object`                 | 不限制                       | 对选择的文件做一些限制    |
| mineIconMap           | `Object<stirng, string>` | 对一些常用文件类型有默认图标 | Mime 到图标 URL 的字典    |
| defaultIcon           | `String`                 | 默认图标                     | 未知类型文件的默认图标    |
| disableEncode         | `Boolean`                | false                        | 禁止请求 token 时 encode  |
| disableCredentialsForDownload | `Boolean`        | false                        | 禁止请求预览文件带 Cookie |
| notEmpty              | `Boolean`                | 不限制                       | 限制必须非空              |

limit：

| 名字         | 类型                    | 默认值                   | 描述                   |
| ------------ | ----------------------- | ------------------------ | ---------------------- |
| type         | `String`                | 不限制                   | 文件类型               |
| width        | `Number`                | 不限制                   | 图片宽度               |
| height       | `Number`                | 不限制                   | 图片高度               |
| maxWidth     | `Number`                | 不限制                   | 图片最大宽度           |
| maxHeight    | `Number`                | 不限制                   | 图片最大高度           |
| minWidth     | `Number`                | 不限制                   | 图片最小宽度           |
| minHeight    | `Number`                | 不限制                   | 图片最小高度           |


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

[试一试](../../demo/#!module=editor&key=Input::FileToken)

### Input::FileTokenWithInfo

功能同 (InputFileToken)[/duang/docs/components/#Input%3A%3AFileToken] 上传时额外多发送图片相关信息：`width` 和 `height`。

文件上传（Token 方式）

参数：

| 名字         | 类型                    | 默认值                   | 描述                 |
| ------------ | ----------------------- | ------------------------ | -------------------- |
| text         | `String`                | "请选择文件"             | 选择文件按钮文案     |
| downloadText | `String`                | "下载"                   | 下载按钮文案         |
| api          | `String`                | 必选参数                 | 图片上传接口相对路径 |
| notEmpty     | `Boolean`               | 不限制                   | 限制必须非空         |

提供的 api 应该支持 `POST api` 上传文件（文件所在的字段名叫 file），以及 `GET api/:token` 下载某个 token（用于预览）。

[试一试](../../demo/#!module=editor&key=Input::FileTokenWithInfo)

### Input::TextAround

数值输入

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| before       | `String`                | 无                       | 前描述         |
| after        | `String`                | 无                       | 后描述         |
| component    | `String`                | 必须                     | 组件           |
| args         | `Object`                |                          | 组件参数       |

示例：

```javascript
{
  "component": "TextAround",
  "args": {
    "before": "人民币",
    "after": "元",
    "component": "String"
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::TextAround)


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

[试一试](../../demo/#!module=editor&key=Input::Suggestion)

### Input::TagCollector

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
  "component": "TagCollector",
  "args": {
    "api": "suggestion"
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::TagCollector)

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

[试一试](../../demo/#!module=editor&key=Input::Cascader)

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

[试一试](../../demo/#!module=editor&key=Input::Forest)

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

[试一试](../../demo/#!module=editor&key=Input::Code)

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

[试一试](../../demo/#!module=editor&key=Input::Markdown)

### Input::Grouping

组合控件

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| inputs       | `Array<Input>`          | 必选参数                 | 默认文本       |
| mode         | `String`                | "table"                  | 显示模式       |
| style        | `Object<String>`        | 空                       | 附加 CSS 样式  |

mode 目前支持两种取值，"line" 和 "table"，分别表示单行显示和表格显示。

示例配置

```javascript
{
  "component": "Grouping",
  "args": {
    "mode": "line",
    "style": { "color": "red" },
    "inputs": [
      { "component": "String", "key": "name", "title": "名称" },
      { "component": "String", "key": "title", "title": "标题" }
    ]
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::Grouping)


### Input::GroupingSelect

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| options      | `Object`                | 必选参数                 | 备选项         |
| subGroupMap  | `Object<Array<Input>>`  | 空对象                   | 匹配组         |
| hideKey      | `Boolean`               | false                    | 是否过滤字段   |
| aliasKey     | `String`                | undefined                | 字段别名       |
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

[试一试](../../demo/#!module=editor&key=Input::GroupingSelect)

### Input::GroupingCheckbox

参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| subGroup     | `<Array<Input>>`        | 空数组                   | 子控件         |
| aliasKey     | `String`                | undefined                | 字段别名       |

当勾选时，subGroup 中的控件将生效。

示例：

```javascript
{
  "component": "GroupingCheckbox",
  "args": {
    "subGroup": [
        { "key": "hongbao_amount", "component": "Number", "title": "红包金额" }
      ]
    }
  }
}
```

[试一试](../../demo/#!module=editor&key=Input::GroupingCheckbox)

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

[试一试](../../demo/#!module=editor&key=Input::List)


## Output

`Output` 是用来输出展示数据的一类组件

所有的 Input 控件都有一个公共参数：

| 名字         | 类型                    | 默认值                   | 描述           |
| ------------ | ----------------------- | ------------------------ | -------------- |
| defaultValue | 与控件的 value 类型相同 | 不同控件具有不同的默认值 | 控件的默认值   |

### Output::HTML

参数描述

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| html         | `String`                | 空字符串                 | html 内容         |

```javascript
{
  "component": "HTML",
  "args": {
    "html": "<strong>hehe</strong>"
  }
}
```

### Output::Number

参数描述

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| fixed        | `Number`                | 保持全部小数位           | 保留指定小数位数  |

```javascript
{
  "component": "Number",
  "args": {
    "fixed": 2
  }
}
```

### Output::Boolean

参数描述

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| text         | `Object`                | 未设置                   | 文案字典          |

示例配置

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

### Output::DateTime

参数描述

| 名字         | 类型                    | 默认值                   | 描述                        |
| ------------ | ----------------------- | ------------------------ | --------------------------- |
| format       | `string`                |                          | 日期显示格式                |
| offset       | `number`                | 0                        | 日期偏移量（支持负数）      |
| mode         | `String`                | 以毫秒数为单位的时间戳作为输入 | 取值 "UNIX_TIMESTAMP"，表示以标准的 Unix 时间戳作为输入 |

示例配置

```javascript
{
  "component": "DateTime",
  "args": {
    "format": "$Y-$M-$D",
    "offset": -864E5
  }
}
```

### Output::Enum

参数描述

| 名字         | 类型                    | 默认值                   | 描述                        |
| ------------ | ----------------------- | ------------------------ | --------------------------- |
| map          | `Object`                |                          | 字典                        |

示例配置

```javascript
{
  "component": "Enum",
  "args": {
    "map": {
      "PENDDING": "等待中",
      "ACTIVE": "生效中",
      "EXPIRED": "已过期"
    }
  }
}
```

### Output::Image

值为图片的 URL，会渲染一张小图，并且点击可以查看大图。

### Output::Link2

跳转到某个连接，配置方式类似 Action（原 Link 控件已废弃）

参数描述（参考 Scheme）

| 名字         | 类型                    |
| ------------ | ----------------------- |
| module       | `String`                |
| key          | `String`                |
| target       | `String`                |
| params       | `Object`                |
| where        | `Object`                |
| href         | `String`                |
| title        | `Object`                |

示例配置

```javascript
{
  "component": "Link2",
  "args": {
    "module": "editor"
  }
}
```

[试一试](../../demo/#!module=list&key=link-list)

### Output::Clipboard

可复制内容

参数描述

| 名字         | 类型                    | 默认值                   | 描述              |
| ------------ | ----------------------- | ------------------------ | ----------------- |
| maxWidth     | `String`                | 420px                    | 最大宽度          |

示例配置

示例：

```javascript
{
  "component": "Clipboard",
  "args": {
    "maxWidth": 500
  }
}
```

### Output::QRCode

输出一个图标，点击后以对话框形式显示一个二维码，这个二维码由控件的值来生成。

### Output::TextTip

自身是一段文字，鼠标悬停后会出现提示信息

值的类型是一个对象：

| 名字         | 类型                    | 默认值                   | 描述                          |
| ------------ | ----------------------- | ------------------------ | ----------------------------- |
| text         | `String`                | 空字符串                 | 需要展示的内容                |
| tip          | `String`                | 无提示                   | 鼠标悬停时的提示内容          |

### Output::IconTip

自身是一个图标，鼠标悬停后会出现提示信息

值的类型是一个对象：

| 名字         | 类型                    | 默认值                   | 描述                          |
| ------------ | ----------------------- | ------------------------ | ----------------------------- |
| icon         | `String`                | 显示一个问号             | 图标 URL                      |
| tip          | `String`                | 无提示                   | 鼠标悬停时的提示内容          |

### Output::Table

参数描述

| 名字         | 类型                    | 默认值                   | 描述                          |
| ------------ | ----------------------- | ------------------------ | ----------------------------- |
| fields       | `List<Output>`          |                          | 展示字段                      |

示例配置

```javascript
{
  "component": "Table",
  "args": {
    "fields": [
      {
        "key": "id",
        "title": "id"
      },
      {
        "key": "name",
        "title": "名称"
      }
    ]
  }
}
```


### Output::AutoRefresh

让页面自动刷新（一般在 Duang::schemes::headers 中使用）

参数描述

| 名字         | 类型                    | 默认值                   | 描述                    |
| ------------ | ----------------------- | ------------------------ | ----------------------- |
| interval     | `Number`                | 10000                     | 自动刷新间隔（单位毫秒）|

## 控件开发

控件是一个由 [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) 方式提供的 JavaScript 类。

需要实现 `value` 访问器属性和 `to` 方法，并且正确处理构造参数中包含的 `readonly` 和 `defaultValue`。

```javascript
define(() => class {

  constructor(args) {
    if (args.readonly) {
      // 处理只读状态
    }
    if (args.defaultValue) {
      // 处理默认值（当 value 被赋为 undefined 时的值）
    }
    // 处理其它参数
  }

  // 处理值的读写
  get value() { /* TODO */ }
  set value(value) { /* TODO */ }

  // 渲染到 DOM 元素上
  to(element) { /* TODO */ }

});
```
