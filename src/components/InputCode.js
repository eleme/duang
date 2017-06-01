def(() => class extends Jinkela {
  init() {
    require.config({
      paths: {
        'codemirror': 'https://github.elemecdn.com/uglifyjs!/codemirror/CodeMirror/5.19.0',
      }
    });
    if (!this.mode) {
      this.mode = 'markdown';
    }
    const modelib = this.modelib ? this.modelib : this.mode;
    this.$editor = null;

    this.editor = new Promise((resolve, reject) => {
      if (this.$editor) {
        return resolve(this.$editor);
      }
      require([
        `codemirror/lib/codemirror`,
        `codemirror/mode/${modelib}/${modelib}`
      ], CodeMirror => {
        this.$editor = CodeMirror(this.element, Object.assign({
          tabSize: 2,
          theme: 'neo',
        }, this));
        this.$editor.on('focus', () => this.element.classList.add('focus'));
        this.$editor.on('blur', () => this.element.classList.remove('focus'));
        this.$editor.setSize(this.width || null, this.height || 70);
        resolve(this.$editor);
      });
    });
  }
  enable() {
    return this.editor.then(editor => {
      editor.setOption('readOnly', false);
      this.element.classList.remove('readonly');
    });
  }
  disable() {
    return this.editor.then(editor => {
      editor.setOption('readOnly', true);
      this.element.classList.add('readony');
    });
  }
  on(...args) {
    return this.editor.then(editor => editor.on(...args));
  }
  execCommand(...args) {
    return this.editor.then(editor => editor.execCommand(...args));
  }
  focus() {
    return this.editor.then(editor => editor.focus());
  }
  refresh() {
    this.editor.then(editor => {
      setTimeout(() => editor.refresh(), 0);
    });
  }
  get value() {
    return this.$editor ? this.$editor.getValue() : '';
  }
  set value(value) {
    if (value == null || value === '') return; // eslint-disable-line
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    return this.editor.then(editor => {
      editor.setValue(value);
      this.refresh();
    });
  }
  get styleSheet() {
    return `
      :scope {
        > .CodeMirror {
          border: 1px solid #c0ccda;
          border-radius: 3px;
          text-align: left;
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

