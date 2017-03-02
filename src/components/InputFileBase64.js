def((Button) => {

  class SpanButton extends Button {
    get tag() { return 'span'; }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
        }
      `;
    }
  }

  class DownloadLink extends Jinkela {
    init() { this.downloadText = this.downloadText || '下载'; }
    set value(value) {
      this.$value = value;
      this.visible = !!value;
      this.link = `data:application/octet-stream,${value}`;
    }
    get value() { return this.$value; }
    get template() { return '<a if="{visible}" href="{link}" download>{downloadText}</a>'; }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          margin-left: 15px;
          text-decoration: underline;
          color: #20A0FF;
        }
      `;
    }
  }

  class FileInfo extends Jinkela {
    get tagName() { return 'span'; }
    get styleSheet() {
      return `
        :scope {
          color: #999;
          vertical-align: middle;
          margin-left: 1em;
        }
      `;
    }
  }

  class CancelButton extends Jinkela {
    init() {
      this.element.addEventListener('click', this.onClick);
    }
    get template() { return '<a href="JavaScript:">&#x274C;</a>'; }
    get styleSheet() {
      return `
        :scope {
          vertical-align: middle;
          margin-left: 1em;
        }
      `;
    }
  }

  return class extends Jinkela {
    get SpanButton() { return SpanButton; }
    get DownloadLink() { return DownloadLink; }
    get value() { return this.$value; }
    set value(value) {
      this.$value = value;
      this.label.setAttribute('notEmpty', !!value);
    }
    get template() {
      return `
        <div>
          <label ref="label">
            <input ref="input" type="file" />
            <jkl-span-button ref="button" text={text}></jkl-span-button>
            <jkl-download-link value={value} downloadText={downloadText}></jkl-download-link>
          </label>
        </div>
      `;
    }
    init() {
      if (!this.text) this.text = 'Select File';
      this.input.addEventListener('change', event => this.change(event));
      this.fileInfo = new FileInfo().to(this);
      this.cancelButton = new CancelButton({ onClick: () => this.value = null }).to(this);
    }
    change(event) {
      let { target } = event;
      let file = target.files[0];
      if (!file) return;
      this.fileInfo.element.textContent = file.size.toLocaleString() + ' Bytes';
      let fr = new FileReader();
      this.button.element.classList.add('busy');
      fr.addEventListener('load', event => {
        let { result } = fr;
        let base64 = result.slice(result.indexOf(',') + 1);
        this.value = base64;
        this.button.element.classList.remove('busy');
      });
      fr.readAsDataURL(file);
    }
    get styleSheet() {
      return `
        :scope {
          label ~ * { display: none; }
          label[notEmpty=true] ~ * { display: inline-block; }
          input { display: none; }
        }
      `;
    }
  };

});
