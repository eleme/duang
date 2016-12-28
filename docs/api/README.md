## API 设计规范

API 要求是基于 [Restful](https://zh.wikipedia.org/wiki/REST) 设计的，比如：

### 1. 列表

```
GET /list?limit=:limit&offset=:offset
```
```
[
  { id, ...fields },
]
```

**注意**：需要编辑的记录必须返回 id 字段，以供 Duang 通过 `/:scheme_key/:id` 获取编辑记录的数据

### 2. 创建

```
POST /:list
{ ...fields }
```

### 3. 编辑

```
PUT /:list/:id
{ ...fields }
```

### 4. 删除

```
DELETE /:list/:id
```

### 5. 获取

```
GET /:list/:id
```
```
{ ...fields }
```

### 6. 行级事务

```
POST /:list/:id/:action
{ ...args }
```

### 7. 表级事务（预留）

```
POST /:list/:action
{ ...args }
```