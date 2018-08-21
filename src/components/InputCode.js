def(() => class extends Jinkela {

  init() {
    if (!this.mode) {
      this.mode = 'markdown';
    }
    const modelib = this.modelib ? this.modelib : this.mode;
    this.$editor = null;

    this.task = new Promise((resolve) => {
      require([
        'codemirror/lib/codemirror',
        `codemirror/mode/${modelib}/${modelib}`
      ], CodeMirror => {
        this.$editor = CodeMirror(this.element, Object.assign({
          theme: 'neo',
          lineNumbers: true,
          tabSize: 2,
          scrollPastEnd: true,
          showMatchesOnScrollbar: true,
          autoRefresh: true
        }, this));
        this.refresh();
        this.$editor.on('focus', () => this.element.classList.add('focus'));
        this.$editor.on('blur', () => this.element.classList.remove('focus'));
        resolve(this.$editor);
      });
    });

    if (this.readonly) {
      this.disable();
    } else {
      this.enable();
    }

    this.element.addEventListener('click', () => this.focus());
    if (!this.$hasValue) this.value = void 0;
  }

  enable() {
    return this.task.then(editor => {
      editor.setOption('readOnly', false);
      this.element.classList.remove('readonly');
    });
  }

  disable() {
    return this.task.then(editor => {
      editor.setOption('readOnly', true);
      this.element.classList.add('readonly');
    });
  }

  on(...args) {
    return this.task.then(editor => editor.on(...args));
  }

  execCommand(...args) {
    return this.task.then(editor => editor.execCommand(...args));
  }

  focus() {
    return this.task.then(editor => editor.focus());
  }

  refresh() {
    if (!document.body.contains(this.element)) return setTimeout(() => this.refresh(), 16);
    return Promise.resolve(this.task).then(obj => obj.refresh());
  }

  get value() {
    return this.$editor ? this.$editor.getValue() : '';
  }

  set value(value = this.defaultValue) {
    if (value == null || value === '') return; // eslint-disable-line eqeqeq
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    return this.task.then(editor => {
      editor.setValue(value);
      this.refresh();
    });
  }

  get styleSheet() {
    return `
      :scope {
        position: relative;
        border: 1px solid #c0ccda;
        border-radius: 5px;
        overflow: hidden;
        &:hover { border-color: #8492a6; }
        &.focus { border-color: #20a0ff; }
        --width: 600px;
        --height: auto;
        --min-height: 200px;
        --monospace: 'Roboto Mono', Monaco, courier, monospace;
        .CodeMirror {
          border-radius: 5px;
          font-family: var(--monospace);
          font-size: 12px;
          width: var(--width);
          height: var(--height);
          min-height: var(--min-height);
        }
        &.readonly {
          .CodeMirror-cursor {
            display: none;
          }
          .CodeMirror-lines {
            cursor: not-allowed;
          }
          .CodeMirror {
            background-color: #eff2f7;
          }
          border-color: #d3dce6;
          color: #bbb;
          cursor: not-allowed;
        }
        .CodeMirror-linenumber {
          padding-left: 10px;
          padding-right: 10px;
        }
        .CodeMirror-cursor {
          border-left: 1px solid black;
          border-right: none;
          width: 0;
        }
        .CodeMirror-search-match {
          background: gold;
          border-top: 1px solid orange;
          border-bottom: 1px solid orange;
          box-sizing: border-box;
          opacity: .5;
        }
        &:empty::before {
          display: block;
          padding: .5em 1em;
          content: '代码渲染中 ···';
        }
      }
    `;
  }

  get minHeight() { return this.$minHeight; }
  set minHeight(value) {
    Object.defineProperty(this, '$minHeight', { configurable: true, value });
    this.element.style.setProperty('--min-height', value);
  }

  get height() { return this.$height; }
  set height(value) {
    Object.defineProperty(this, '$height', { configurable: true, value });
    this.element.style.setProperty('--height', value);
  }

  get width() { return this.$width; }
  set width(value) {
    Object.defineProperty(this, '$width', { configurable: true, value });
    this.element.style.setProperty('--width', value);
  }

});
