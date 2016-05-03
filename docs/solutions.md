## 解决方案

##### 配置文件的示例

```
{
  "schemes": [
    {
      "key": "list1",
      "title": "测试列表 1",
      "pageSize": 15,
      "fields": [
        { "key": "id", "title": "ID" },
        { "key": "name", "title": "Name" },
        { "key": "opts", "title": "Opts" },
        { "key": "level", "title": "Level" },
        { "key": "radio", "title": "Radio" }
      ],
      "actions": [
        { "type": "edit", "title": "编辑" },
        { "type": "delete", "title": "删除" },
        { "type": "custom", "api": "hx", "title": "和谐" }
      ],
      "filters": [
        { "key": "opts", "title": "Opts", "component": "Checkbox", "args": { "options": { "A": "A", "B": "B", "C": "C", "D": "D" } } },
        { "key": "level", "title": "Level", "component": "Select", "args": { "options": { "A": "A", "B": "B", "C": "C", "D": "D" } } },
        { "key": "radio", "title": "Radio", "component": "Radio", "args": { "options": { "A": "A", "B": "B", "C": "C", "D": "D" } } }
      ],
      "inputs": [
        { "key": "name", "title": "Name", "component": "String" },
        { "key": "desc", "title": "Desc", "component": "Text" },
        { "key": "opts", "title": "Opts", "component": "Checkbox", "args": { "options": { "A": "A", "B": "B", "C": "C", "D": "D" } } },
        { "key": "level", "title": "Level", "component": "Select", "args": { "options": { "A": "A", "B": "B", "C": "C", "D": "D" } } },
        { "key": "radio", "title": "Radio", "component": "Radio", "args": { "options": { "A": "A", "B": "B", "C": "C", "D": "D" } } }
      ]
    }
  ]
}
```

##### API 设计规范

列表

```
GET /list?limit=:limit&offset=:offset
```
```
[
  { id, ...fields },
]
```

创建

```
POST /:list
{ ...fields }
```

编辑

```
PUT /:list/:id
{ ...fields }
```

删除

```
DELETE /:list/:id
```

获取

```
GET /:list/:id
```
```
{ ...fields }
```

行级事务

```
POST /:list/:id/:action
{ ...args }
```

表级事务（预留）

```
POST /:list/:action
{ ...args }
```
