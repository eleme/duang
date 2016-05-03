## 解决方案

##### 1. 提供一个接口，放置配置文件

假如现在有一套 API，部署在 [http://127.0.0.1](http://127.0.0.1)，那么这个 API 的根目录被请求时应该响应一个 Duang 的配置文件。比如：

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
    }
  ]
}
```


##### 2. 提供和配置文件描述相符的真实接口

根据配置的描述，提供相应 API 如：`GET /mylist`


##### 3. 提供一个接口（路径）作为 CMS 的 Web 界面

在这套 API 上开一个 /web 路径作为 Web 界面，这个路由去抓取[入口文件](https://raw.githubusercontent.com/eleme/duang/0.0.1/src/index.html)，并将里面的 `{{API}}` 替换成 API 服务的访问路径，然后加上响应头 Content-Type: text/html，并把替换后的内容放入响应实体中。
以 koa 为例：

```js
const KoaRouter = require('koa-router');
const fetch = require('node-fetch');
const router = new KoaRouter();
const ENTRY = 'http://raw.githubusercontent.com/eleme/duang/0.0.1/src/index.html';
const $index = fetch(ENTRY).then(response => response.text());
router.get('/web', (ctx, next) => {
  return $index.then(result => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = result.replace(/\{\{API\}\}/g, '//127.0.0.1');
  }).catch(error => {
    ctx.status = 500;
    ctx.body = error.stack;
  });
});

module.exports = router.routes();                                 
```


##### 4. 访问、测试

最后客户端访问 http://127.0.0.1/web 即可。
