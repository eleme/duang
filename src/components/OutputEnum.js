def((Output) => class extends Jinkela {
  init() {
    let { value, map, otherwise } = this;
    // 强转 map
    map = Object(map);
    if (map instanceof Array) {
      let temp = {};
      map.forEach(({ value, text }) => {
        temp[value] = text;
      });
      map = temp;
    }
    // 处理所有 value（支持数组）
    [].concat(value).forEach(value => {
      if (otherwise === void 0) otherwise = value;
      Output.createAny(value in map ? map[value] : otherwise).to(this);
    });
  }
});
