def((Button) => {

  class SpanButton extends Button {
    get tag() { return 'span'; }
  }

  return class extends Jinkela {
    get value() { return this.$value; }
    set value(value) { this.$value = value; }
    get template() { return `<label><input type="file" /></label>`; }
    init() {
      this.element.firstChild.addEventListener('change', event => this.change(event));
      this.button = new SpanButton({ text: '选择文件' }).renderTo(this);
    }
    change(event) {
      let { target } = event;
      let [ file ] = target.files;
      if (!file) return;
      let fr = new FileReader();
      this.button.element.classList.add('busy');
      fr.addEventListener('load', event => {
        let { result } = fr;
        let base64 = result.slice(result.indexOf(',') + 1);
        this.$value = base64;
        this.button.element.classList.remove('busy');
      });
      fr.readAsDataURL(file);
    }
    get styleSheet() {
      return `
        :scope {
          input { display: none; }
        }
      `;
    }
  }

});
