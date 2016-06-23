def((Input, InputSelect, FormItem) => {

  class SubGroupMap extends Jinkela {
    get value() {
      return this.inputs.reduce((base, item) => {
        base[item.key] = item.value;
        return base;
      }, {});
    }
    set value(value) {
      this.inputs.forEach(item => {
        item.value = value[item.key];
      });
    }
    init() {
      let { group } = this;
      let { params = '{}' } = new UParams();
      let { id } = JSON.parse(params) || {};
      let action = id ? 'edit' : 'create';
      group = JSON.parse(JSON.stringify(group)).filter(item => item[action] !== 'none');
      group.forEach((item) => {
        if (item[action] === 'readonly') {
          if (!item.args) item.args = {};
          item.args.readonly = true;
        }
      });
      this.inputs = FormItem.cast(group).renderTo(this);
    }
    get tagName() { return 'table'; }
    get styleSheet() {
      return `
        :scope {
          font-size: 14px;
          margin-top: 1em;
          border-collapse: collapse;
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      let { options, readonly } = this;
      const onChange = event => this.selectChange(event);
      this.select = new InputSelect({ options, readonly, onChange }).renderTo(this);
      this.selectChange();
    }
    selectChange() {
      let group = this.subGroupMap[this.select.value] || [];
      if (group.length) { 
        let table = new SubGroupMap({ group });
        this.table = this.table ? table.renderWith(this.table) : table.renderTo(this);
      } else {
        if (this.table) this.element.removeChild(this.table.element);
        this.table = null;
      }
    }
    get value() {
      return Object.assign({ '': this.select.value }, this.table ? this.table.value : {});
    }
    set value(value) {
      this.select.value = value[''];
      this.selectChange();
      if (this.table) this.table.value = value;
    }
  }

});
