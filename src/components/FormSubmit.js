def((Button, FormItem) => class extends FormItem {
  init() {
    this.title = '';
  }
  createInput() {
    return new Button({ text: '提交', onClick: event => this.click(event) });
  }
  click() {
    let { id } = new UParams();
    let value = JSON.stringify(this.form.value);
    let $result;
    if (id) {
      $result = api(this.scheme.api + '/' + id, { method: 'PUT', body: value });
    } else {
      $result = api(this.scheme.api, { method: 'POST', body: value });
    }
    $result.then(result => {
      history.back();
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
