const refactor = (tmpl, data) => {
  if (typeof tmpl !== 'object') return tmpl;
  return Object.keys(tmpl).reduce((result, key) => {
    let value = tmpl[key];
    if (key[0] === '@') {
      key = key.slice(1);
      value = JSONPath(value, data);
      if (key[0] === '@') {
        key = key.slice(1);
      } else {
        value = value[0];
      }
    } else {
      value = refactor(value, data);
    }
    result[key] = value;
    return result;
  }, {});
};
