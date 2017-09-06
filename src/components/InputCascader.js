def(() => {

  class CascaderWithDuang extends Cascader {
    beforeParse(params) {
      if (!('placeholder' in params)) params.placeholder = '请选择';
      super.beforeParse(params);
    }
  }

  return function(...args) {
    return new CascaderWithDuang(...args);
  };

});
