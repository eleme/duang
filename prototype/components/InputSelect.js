def((Item) => {

  class InputSelectItem extends Item {
    get template() { return '<option value="{value}">{text}</option>'; }
  }

  return class extends Jinkela {
    init() {
      let list = Object.keys(this.options).map(key => {
        return { value: key, text: this.options[key] };
      });
      InputSelectItem.cast(list).renderTo(this);
    }
    get template() { return `<select></select>`; }
    get styleSheet() {
      return `
        :scope {
          border: 1px solid #ccc;        
          border-radius: 5px;
          padding: .5em;
        }
      `;
    }
  };

});
