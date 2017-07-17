def(() => {

  class CascaderWithDuang extends Cascader {
    get styleSheet() {
      return `
        :scope {
          > input { height: 28px; }
        }
      `;
    }
  }

  return function(...args) {
    return new CascaderWithDuang(...args);
  };

});
