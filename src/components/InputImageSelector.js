def((Item, Value) => {

  const CORNER = 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16">
      <path d="M32,0v32h-32Z" fill="#20a0ff" />
      <path d="M15,20l-2,2l7,7l10,-10l-2,-2l-8,8Z" fill="#fff" />
    </svg>
  `);

  class TheImage extends Jinkela {
    init() {
      this.img = new Image();
      this.img.src = this.src;
      this.element.appendChild(this.img);
      this.element.addEventListener('click', event => this.click(event));
    }
    click() {
      if (this.readonly) return;
      this.element.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: this }));
    }
    set readonly(readonly) {
      this.element.classList[readonly ? 'add' : 'remove']('readonly');
    }
    get readonly() {
      return this.element.classList.contains('readonly');
    }
    set checked(checked) {
      this.element.classList[checked ? 'add' : 'remove']('checked');
    }
    get checked() {
      return this.element.classList.contains('checked');
    }
    get styleSheet() {
      return `
        :scope {
          border: 1px solid #bfcbd9;
          padding: 1px;
          display: inline-block;
          margin: .25em .5em .25em 0;
          position: relative;
          > img {
            max-height: 32px;
          }
          &.readonly {
            opacity: .5;
          }
          &:not(.readonly) {
            cursor: pointer;
            &:hover {
              padding: 0;
              border: 2px solid #20a0ff;
            }
          }
          &.checked {
            opacity: 1;
            padding: 0;
            border: 2px solid #20a0ff;
            &::after {
              content: '';
              background: url('${CORNER}');
              width: 16px;
              height: 16px;
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      `;
    }
  }

  return class extends Value {
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          vertical-align: middle;
          > * {
            vertical-align: top;
          }
        }
      `;
    }
    select(event) {
      event.stopPropagation();
      let { detail } = event;
      this.list.forEach(item => (item.checked = false));
      detail.checked = true;
    }
    init() {
      this.element.addEventListener('select', event => this.select(event));
      let { options, readonly } = this;
      let list = [];
      options.forEach && options.forEach(item => {
        if (typeof item === 'string') {
          list.push({ src: item, value: item });
        } else if (item && typeof item === 'object') {
          list.push(item);
        }
      });
      list = list.map(raw => Object.assign({}, raw, { readonly }));
      this.list = TheImage.from(list).to(this);
      if (!this.$hasValue) this.value = void 0;
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      if (this.list.length === 0) return;
      if (!this.list.some(item => (item.checked = item.value === value))) this.list[0].checked = true;
    }
    get value() {
      let found = this.list.find(item => item.checked);
      return found && found.value;
    }
  };

});
