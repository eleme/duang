const refactor = (tmpl, data) => {
  if (!tmpl || typeof tmpl !== 'object') return tmpl;
  return Object.keys(tmpl).reduce((result, key) => {
    let value = tmpl[key];
    if (/^(@|#)/.test(key)) { // 废弃，暂时保留兼容
      key = key.slice(1);
      value = JSONPath(value, data);
      if (/^(@|#)/.test(key)) {
        key = key.slice(1);
      } else {
        value = value[0];
      }
    } else if (typeof value === 'string' && value[0] === '$') { // 以「$」开头的作为表达式解析
      try {
        excavate({ $: data }, value, value => { throw value; }); // 只找第一个
      } catch (what) {
        if (what instanceof Error) throw what;
        value = what;
      }
    } else {
      value = refactor(value, data);
    }
    result[key] = value;
    return result;
  }, tmpl instanceof Array ? [] : {});
};
