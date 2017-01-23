def(() => class extends Jinkela {
  init() {
    this.editor = CodeMirror(this.element, this.config);
    this.editor.on('focus', () => this.element.classList.add('focus'));
    this.editor.on('blur', () => this.element.classList.remove('focus'));
    this.editor.setSize(this.width || null, this.height || 70);
  }
  enable() {
    this.editor.setOption('readOnly', false);
    this.element.classList.remove('readonly');
  }
  disable() {
    this.editor.setOption('readOnly', true);
    this.element.classList.add('readony');
  }
  on(...args) {
    return this.editor.on(...args);
  }
  execCommand(...args) {
    return this.editor.execCommand(...args);
  }
  focus() {
    return this.editor.focus();
  }
  refresh() {
    setTimeout(() => this.editor.refresh(), 0);
  }
  set config(obj) {
    this.config = Object.assign({ theme: 'neo', tabSize: 2 }, obj);
  }
  get value() {
    return this.editor.getValue();
  }
  set value(value) {
    if (value == null || value === '') return; // eslint-disable-line eqeqeq
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    this.editor.setValue(value);
    this.refresh();
  }
  get styleSheet() {
    return `
      :scope {
        > .CodeMirror {
          border: 1px solid #c0ccda;
          border-radius: 5px;
          text-align: left;
          padding-left: 10px;
          &:hover { border-color: #8492a6; }
          &.readonly {
            .CodeMirror-cursor {
              display: none;
            }
          }
        }

        &.focus {
          .CodeMirror { border-color: #20a0ff;  }
        }
      }
    `;
  }
});

