def(() => {

  class ForestWithDuang extends Forest {
    beforeParse(params) {
      if (!('placeholder' in params)) params.placeholder = '请选择';
      super.beforeParse(params);
    }
    get styleSheet() {
      return `
        :scope {
          > input { height: 28px; }
        }
      `;
    }
  }

  return function(...args) {
    return new ForestWithDuang(...args);
  };

});
