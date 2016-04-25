const config = [
  {
    key: 'user_gifts',
    api: '//sakura.test.ele.me/sakura/pointmall/user_gifts',
    title: '礼品兑换记录',
    pageSize: 30,
    fields: [
      { key: 'gift_id', 'title': 'ID', 'type': 'int' },
      { key: 'price', 'title': '价格', 'type': 'price' },
      { key: 'exchange_code', 'title': '兑换码', 'type': 'string' },
      { key: 'created_at', 'title': '兑换时间', 'type': 'datetime'}
    ]
  },
  {
    key: 'gifts',
    api: 'http://sakura.test.ele.me/sakura/pointmall/gifts',
    title: '礼品兑换记录',
    title: '礼品管理',
    pageSize: 30,
    fields: [
      { key: 'id', 'title': 'ID', 'type': 'int' },
      { key: 'thumb_url', 'title': '缩略图', 'type': 'thumb' },
      { key: 'name', 'title': '名称', 'type': 'string' },
      { key: 'price', 'title': '价格', 'type': 'price' },
      { key: 'amount', 'title': '库存', 'type': 'int' },
    ]
  }
];
