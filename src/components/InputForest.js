def((Forest) => {

  class ForestWithDuang extends Forest {
    beforeParse(params) {
      if (!(params.options instanceof Array)) throw new Error('options 必须是数组');
      let { idAlias = 'id', parentIdAlias = 'parentId', textAlias = 'text' } = params;
      let options = [];
      for (let item of params.options) options.push({ id: item[idAlias], parentId: item[parentIdAlias], text: item[textAlias] });
      params.options = options;
      if (!('placeholder' in params)) params.placeholder = '请选择';
      super.beforeParse(params);
    }
    get styleSheet() {
      return `
        :scope {
          white-space: normal;
          > input { height: 28px; }
        }
      `;
    }
  }

  return function(...args) {
    return new ForestWithDuang(...args);
  };

});
