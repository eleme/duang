def((Button, FormItem) => class extends FormItem {
  init() {
    this.title = '';
  }
  createInput() {
    let submit = new Button({ text: '提交', onClick: event => this.submit() });
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
  submit() {
    let { form } = this;
    let { scheme } = depot;
    let { key } = scheme;
    let { params = '{}' } = new UParams();
    params = JSON.parse(params);
    let { id } = params;
    key = key.replace(/:([^/]+)/g, ($0, $1) => params[$1]);
    let value = JSON.stringify(form.value);
    let $result;
    if (id) {
      $result = api(key + '/' + id, { method: 'PUT', body: value });
    } else {
      $result = api(key, { method: 'POST', body: value });
    }
    $result.then(doAction).then(result => {
      this.back();
    }, error => {
      if (error) alert(error.message || error);
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
