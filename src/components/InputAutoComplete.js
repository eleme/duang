def((InputString, Item) => {
  class ListItem extends Item {
    init() {
      this.element.addEventListener('mousedown', e => this.onMousedown(e));
      this.element.addEventListener('mouseup', e => this.onMouseup(e));
    }
    onMousedown(e) { e.preventDefault(); }
    onMouseup() {
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
    init() {
      this.noResult = false;
      this.element.addEventListener('item:select', e => {
        this.input.value = e.detail.value;
        this.value = e.detail.key;
        this.onBlur();
      });
      this.onInput = debounce(() => {
        this.list.innerHTML = '';
        this.noResult = false;
        let { resolvedKey } = depot;
        api([resolvedKey, this.api], { query: { q: this.input.value } }).then(raw => {
          if (!(raw instanceof Array)) throw new Error(`返回必须是数组：${raw}`);
          if (!raw.length) {
            this.noResult = true;
          } else {
            raw.forEach(item => new ListItem(item).to(this.list));
          }
          this.element.setAttribute('popup', '');
        });
      }, 1000, true);
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
    onKeydown(e) {
      switch (e.keyCode) {
        case 40: return this.move(1);
        case 38: return this.move(-1);
        case 13: return this.enter(e);
      }
    }
    onFocus() { this.onInput(); }
    onBlur() {
      let $current = this.list.querySelector('active');
      if ($current) $current.classList.remove('active');
      this.onInput.cancel();
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
        <div>
          <jkl-input-string
            ref="input"
            on-keydown="{onKeydown}"
            on-input="{onInput}"
            on-focus="{onFocus}"
            on-blur="{onBlur}"
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
            border-radius: 5px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            margin: 0;
            padding: 0;
            list-style: none;
            transition: border-color ease-in-out .15s, opacity .15s ease, visibility .15s ease;
            max-height: 200px;
            overflow: scroll;
            > ul li {
              padding: .4em .5em;
              cursor: pointer;
              &:hover {
                background-color: rgba(25,137,250,.08);
              }
              &.active {
                background-color: rgba(25,137,250,.08);
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

