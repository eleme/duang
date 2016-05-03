def((Button, FormItem) => class extends FormItem {
  init() {
    this.title = '';
  }
  createInput() {
    let submit = new Button({ text: '提交', onClick: event => this.click() });
    let back = new Button({ text: '返回', onClick: event => this.back(), color: '#ccc' });
    return new class extends Jinkela {
      init() {
        submit.renderTo(this);
        back.renderTo(this);
      }
      get styleSheet() {
        return ':scope > * { margin-right: 1em; }'
      }
    };
  }
  back() {
    history.back();
  }
  click() {
    let { id } = new UParams();
    let value = JSON.stringify(this.form.value);
    let $result;
    if (id) {
      $result = api(this.scheme.key + '/' + id, { method: 'PUT', body: value });
    } else {
      $result = api(this.scheme.key, { method: 'POST', body: value });
    }
    $result.then(result => {
      this.back();
    }, error => {
      alert(error.message);
    });
  }
  get styleSheet() {
    return `
      :scope {
        td {
          position: relative;
          padding-top: calc(2em + 5px);
          &::before {
            content: '';
            height: 1px;
            left: 0;
            right: 0;
            background: #e4e4e4;
            top: 1em;
            position: absolute;
          }
        }
      }
    `;
  }
});
