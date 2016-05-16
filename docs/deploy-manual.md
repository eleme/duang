## 解决方案

##### 1. 提供一个接口，放置配置文件

假如现在有一套 API，部署在 [http://127.0.0.1/api](http://127.0.0.1/api) 上，那么这个 API 的根目录被请求时应该响应一个 Duang 的配置文件。比如：

```json
{
  "schemes": [
    {
      "key": "mylist",
      "title": "MyList",
      "fields": [
        { "key": "id", "title": "ID" },
        { "key": "name", "title": "Name" }
      ]
    },
    {
      "key": "/hehe",
      "title": "MyList",
      "fields": [
        { "key": "id", "title": "ID" },
        { "key": "name", "title": "Name" }
      ]
    }
  ]
}
```


##### 2. 提供和配置文件描述相符的真实接口

根据配置的描述，提供相应 API 如：`GET /api/mylist`、`GET /hehe`。


注意 schemes 下的 key 默认是相对于配置文件路径的。


##### 3. 提供一个接口（路径）作为 CMS 的 Web 界面

在这套 API 上使用「/」根路径作为 Web 界面（可以视为是一个 Content-Type 为 text/html 的接口）

```
GET /
```

响应

```
200 OK
Content-Type: text/html

<script src="//github.elemecdn.com/eleme/duang/版本号/src/duang.js" config="配置文件"></script>`
```


##### 4. 访问、测试

最后客户端访问 [http://127.0.0.1/](http://127.0.0.1/) 即可。
