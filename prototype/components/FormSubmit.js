def((Button) => class extends Jinkela {
  init() {
    new Button({ text: '提交', onClick: event => this.click(event) }).renderTo(this);
  }
  click() {
    let { id } = new UParams();
    let value = JSON.stringify(this.form.value);
    let $response;
    if (id) {
      $response = fetch(this.scheme.api + '/' + id, {
        method: 'PUT', body: value, credentials: 'include', headers: { 'Content-Type': 'application/json' }
      });
    } else {
      $response = fetch(this.scheme.api, {
        method: 'POST', body: value, credentials: 'include', headers: { 'Content-Type': 'application/json' }
      });
    }
    $response.then(result => {
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
