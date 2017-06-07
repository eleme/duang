def((Button) => {

  class Preview extends Button {
    beforeParse() {
      this.text = '预览';
    }
    init() {

    }
    get styleSheet() {
      return `
        :scope {
          z-index: 10;
          position: absolute;
          right: 1em;
          top: 1em;
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      this.initEditor();
      this.initPreviewButton();
      if (this.readonly) {
        this.disable();
      } else {
        this.enable();
      }
      this.element.addEventListener('click', () => this.focus());
    }
    initPreviewButton() {
      new Preview({ onClick: () => this.preview() }).to(this);
    }
    preview() {
      let css = 'https://github.elemecdn.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css';
      let md = marked(this.value);
      let html = `<meta charset="utf8" /><link rel="stylesheet" href="${css}" /><body class="markdown-body">${md}</body>`;
      let url = URL.createObjectURL(new Blob([ html ], { type: 'text/html' }));
      open(url);
    }
    initEditor() {
      this.editor = CodeMirror(this.element, Object.assign({
        theme: 'neo',
        lineNumbers: true,
        mode: 'markdown',
        tabSize: 2,
        scrollPastEnd: true,
        showMatchesOnScrollbar: true
      }, this.config));
      this.editor.on('focus', () => this.element.classList.add('focus'));
      this.editor.on('blur', () => this.element.classList.remove('focus'));
    }
    enable() {
      this.editor.setOption('readOnly', false);
      this.element.classList.remove('readonly');
    }
    disable() {
      this.editor.setOption('readOnly', 'nocursor');
      this.element.classList.add('readonly');
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
    get value() {
      return this.editor.getValue();
    }
    set value(value) {
      if (value instanceof Object) value = JSON.stringify(value);
      this.editor.setValue(value || '');
      this.refresh();
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
          --height: auth;
          .CodeMirror {
            font-family: var(--monospace);
            font-size: 12px;
            width: var(--width);
            height: var(--height);
            height: auto;
            min-height: 200px;
            &.readonly {
              .CodeMirror-cursor {
                display: none;
              }
            }
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
        }
      `;
    }
  };

});

