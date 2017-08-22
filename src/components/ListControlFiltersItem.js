def((Input, Output, Item) => {

  class Title extends Jinkela {
    set title(title) {
      this.element.innerHTML = '';
      if (typeof title === 'string') {
        new Output({ component: 'HTML', value: title }).to(this);
      } else if (typeof title === 'object') {
        new Output(title).to(this.lablel);
      }
    }
    get styleSheet() {
      return `
        :scope { margin-right: 2em; }
      `;
    }
  }

  return class extends Item {

    init() {
      this.input = new Input(this, { onReady: () => this.ready() }).prependTo(this.wrapper);
      this.input.element.style.display = 'inline-block';
      this.input.element.style.marginRight = '2em';
      let { key, depot, optional } = this;
      let { where } = depot;
      this.checked = (optional && key in where) || !optional;
    }

    get Title() { return Title; }

    get template() {
      return `
        <div>
          <jkl-title title="{title}"></jkl-title>
          <div class="tip" if="{optional}">
            <a href="javascript:" class="install" on-click="{install}">设置</a>
          </div>
          <div ref="wrapper" class="wrapper" on-transitionend="{updateWrapperState}">
            <a href="javascript:" class="uninstall" on-click="{uninstall}" if="{optional}">取消</a>
          </div>
        </div>
      `;
    }

    updateWrapperState() {
      // TODO
    }

    get $promise() { return this.input.$promise; }

    ready() {
      let { key, squash, depot } = this;
      let { where } = depot;
      if (squash === 'direct') {
        this.value = Object.assign({ '': where[key] }, where);
      } else {
        this.value = where[key];
      }
      this.defaultValue = this.value;
    }

    install() { this.checked = true; }
    uninstall() { this.checked = false; }

    set checked(value = false) {
      value = !!value;
      this.$checked = value;
      this.element.dataset.checked = value;
    }
    get checked() { return this.$checked; }

    get value() { return this.input.value; }
    set value(value) { this.input.value = value; }

    get styleSheet() {
      return `
        :scope {
          &:first-child { margin-top: 0; }
          display: flex;
          margin-top: 1em;
          line-height: 28px;
          > .tip {
            opacity: 1;
            visibility: visible;
            > .install {
              position: absolute;
            }
          }
          > .wrapper {
            flex: 1;
            transition: opacity 200ms ease, visibility 200ms ease;
            opacity: 1;
            visibility: visible;
          }
          &[data-checked=true] {
            > .tip {
              opacity: 0;
              visibility: hidden;
            }
          }
          &[data-checked=false] {
            > .wrapper {
              opacity: 0;
              visibility: hidden;
            }
          }
        }
      `;
    }

  };

});
