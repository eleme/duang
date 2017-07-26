def((InputString, Item) => {

  class ListItem extends Item {

    onClick() {
      this.element.dispatchEvent(new CustomEvent('item:select', {
        bubbles: true,
        detail: this
      }));
    }

    get template() {
      return '<li>{value}</li>';
    }

  }

  class NoResult extends Jinkela {
    get template() {
      return `
        <p>没有任何搜索结果</p>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          text-align: center;
          padding: .4em .5em;
          margin: 0;
        }
      `;
    }
  }

  return class extends Jinkela {

    get InputString() { return InputString; }

    get NoResult() { return NoResult; }

    selectItem(event) {
      this.value = event.detail.value;
      this.input.element.blur();
    }

    beforeParse(params) {
      this.inputHandler = debounce(this.inputHandler, 1000, true);
      this.width = params.width;
      this.placeholder = params.placeholder;
      this.readonly = params.readonly;
    }

    init() {
      if (this.width !== void 0) this.element.style.width = this.width;
      this.noResult = false;
      this.element.addEventListener('item:select', this.selectItem.bind(this));
      if (!this.$hasValue) this.value = void 0;
    }

    async inputHandler() {
      if (this.readonly) return;
      this.noResult = false;
      let { resolvedKey } = depot;
      let raw = await api([resolvedKey, this.api], { query: { q: this.value } });
      if (!(raw instanceof Array)) throw new Error(`返回必须是数组：${raw}`);
      this.list.innerHTML = '';
      if (!raw.length) {
        this.noResult = true;
      } else {
        raw.forEach(item => new ListItem(item).to(this.list));
      }
      this.element.setAttribute('popup', '');
    }

    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      this.$value = value;
      if (this.input) this.input.value = value;
    }
    
    move(step) {
      if (!step) return;
      let $current = this.list.querySelector('.active');
      if ($current) {
        $current.classList.remove('active');
        if (step > 0) {
          while (step--) {
            $current = $current.nextElementSibling
              ? $current.nextElementSibling
              : this.list.firstElementChild;
          }
        } else {
          while (step++) {
            $current = $current.previousElementSibling
              ? $current.previousElementSibling
              : this.list.lastElementChild;
          }
        }
      }
      if (!$current) $current = this.list.firstElementChild;
      $current.classList.add('active');
      this.ensureVisible();
    }

    enter() {
      let active = this.list.querySelector('.active');
      if (active) active.click();
    }

    onKeydown(e) {
      switch (e.keyCode) {
        case 40: return this.move(1);
        case 38: return this.move(-1);
        case 13: return this.enter();
      }
    }

    blur() {
      let $current = this.list.querySelector('active');
      if ($current) $current.classList.remove('active');
      this.inputHandler.cancel();
      this.element.removeAttribute('popup');
    }

    ensureVisible() {
      let $current = this.list.querySelector('.active');
      if ($current) {
        let viewTop = this.list.scrollTop;
        let viewHeight = this.list.getBoundingClientRect().height;
        let viewBottom = viewHeight + viewTop;
        let itemTop = $current.offsetTop;
        let itemHeight = $current.getBoundingClientRect().height;
        let itemBottom = itemTop + itemHeight;
        if (itemTop < viewTop) this.list.scrollTop = itemTop;
        if (itemBottom > viewBottom) this.list.scrollTop = itemTop - viewHeight + itemHeight;
      }
    }

    get template() {
      return `
        <div on-keydown="{onKeydown}" on-input="{inputHandler}">
          <jkl-input-string ref="input"
            on-focus="{inputHandler}" on-blur="{blur}"
            placeholder="{placeholder}" width="{width}" readonly="{readonly}"
          ></jkl-input-string>
          <div>
            <ul ref="list"></ul>
            <jkl-no-result if="{noResult}"></jkl-no-result>
          </div>
        </div>
      `;
    }

    get styleSheet() {
      return `
        :scope {
          position: relative;
          > div {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            z-index: 99;
            background: #fff;
            border: 1px solid #20a0ff;
            border-top: none;
            border-radius: 0 0 5px 5px;
            transition: border-color ease .15s, opacity .15s ease, visibility .15s ease;
            max-height: 200px;
            overflow: scroll;
            > ul {
              margin: 0;
              padding: 0;
              li {
                padding: .4em .5em;
                cursor: pointer;
                list-style: none;
                &:hover {
                  background-color: rgba(25,137,250,.08);
                }
                &.active {
                  background-color: rgba(25,137,250,.08);
                }
              }
            }
          }
          &[popup] {
            > div {
              visibility: visible;
              opacity: 1;
            }
            > input {
              border-bottom: none;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
        }
      `;
    }
  };

});
