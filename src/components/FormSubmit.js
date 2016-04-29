def((Button) => class extends Jinkela {
  init() {
    new Button({ text: '提交', onClick: event => this.click(event) }).renderTo(this);
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
        margin: 1em;
      }
    `;
  }
});
