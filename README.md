# duang

一键 CMS 生成工具


### 1. 介绍

目前各个部门都有 CMS 的需求，而大家各自开发 CMS 的成本将会非常高。比如外卖平台的 sakura 项目，仅前端就需要投入 3 个人力在持续维护。所以我们需要解决这样的人力资源浪费问题。

考虑到每个组都有自己的后端，前后端对接是基于 API 文档的。通过固定 API 的设计规范，从 API 文档和一些配置文件直接生成一个前端的 CMS 在理论上是可行的。

duang 是一个命令行工具（也许以后会服务化），可以将一个配置文件转换成一个可以直接跑起来的前端项目。


### 2. 概览

##### 2.1. 配置文件

配置文件使用 JSON 数据来设计以便于前端项目使用

配置文件最外层是一个数组，对应到 CMS 的主菜单栏。

每个配置项对应一个数据视图（一张虚拟的表）和前端的一个列表页和编辑页

配置项描述列表页显示的字段、筛选器、分页参数，以及其它一些全局按钮行为。

配置项中可以描述记录级的按钮行为。

所有的按钮行为对应到一个后端接口上。


##### 2.2. 前端框架

提供一个通用的前端框架，它根据配置文件来生成对应的页面。

根据配置文件调用对应的后端 API（跨域调用以降低耦合）。

根据配置文件生成对应的表单以编辑数据。


##### 2.3. API 规范

提供一套 API 设计规范，对于数据视图可以采用 RESTful 风格的 API

对列表接口定义通用的分页参数格式

对按钮行为全部使用 POST 方法，表示事务处理


### 3. 解决方案（持续更新）

##### 配置文件的示例

```
[
  hongbao: {
    title: '红包组列表',
    creatable: true,
    editable: true,
    pageSize: 30,
    fields: [
      { key: 'id', title: 'id', type: 'date' },
      { key: 'group_id', title: '红包组 id' },
      { key: 'enable', title: '有效', type: 'checkbox' },
      { key: 'type', title: '红包组类型', type: 'select', args: [
        { 1: '专享', 2: '普通' }
      ] }
    ],
    filters: [
      { for: 'id' },
      { for: 'group_id' }
    ],
    actions: [
      { text: '下载', action: 'download' },
      { text: '删除', action: 'delete' }
    ],
    inputs: [
      { for: 'group_id' },
      { for: 'enable' },
      { for: 'type' }
    ]
  }
]
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

表级事务

```
POST /:list/:action
{ ...args }
```

行级事务

```
POST /:list/:id/:action
{ ...args }
```
