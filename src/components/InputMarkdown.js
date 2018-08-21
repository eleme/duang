def((ButtonHollow) => {

  class Preview extends ButtonHollow {
    beforeParse() {
      this.text = '预览';
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

  return new Promise(resolve => {
    require([
      'marked',
      'codemirror/lib/codemirror',
      'codemirror/mode/markdown/markdown'
    ], (marked, CodeMirror) => {

      class InputMarkdown extends Jinkela {
        init() {
          this.initEditor();
          this.initPreviewButton();
          if (this.readonly) {
            this.disable();
          } else {
            this.enable();
          }
          this.element.addEventListener('click', () => this.focus());
          if (!this.$hasValue) this.value = void 0;
        }
        initPreviewButton() {
          new Preview({ onClick: () => this.preview() }).to(this);
        }
        preview() {
          let css = 'https://github.elemecdn.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css';
          let md = marked(this.value);
          let html = `
            <meta charset="utf8" />
            <link rel="stylesheet" href="${css}" />
            <body class="markdown-body">${md}</body>
          `;
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
            showMatchesOnScrollbar: true,
            autoRefresh: true
          }, this.config));
          this.refresh();
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
          if (!document.body.contains(this.element)) return setTimeout(() => this.refresh(), 16);
          this.editor.refresh();
        }
        get value() {
          return this.editor.getValue();
        }
        set value(value = this.defaultValue) {
          this.$hasValue = true;
          if (value instanceof Object) value = JSON.stringify(value, 0, 2);
          this.editor.setValue(value === void 0 ? '' : String(value));
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
              --height: auto;
              .CodeMirror {
                border-radius: 5px;
                font-family: var(--monospace);
                font-size: 12px;
                width: var(--width);
                height: var(--height);
                min-height: 200px;
              }
              &.readonly {
                .CodeMirror-cursor {
                  display: none;
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
            }
          `;
        }
      }

      resolve(InputMarkdown);

    });
  });

});

