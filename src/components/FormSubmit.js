def((Button, ButtonHollow, FormItem) => {

  class ButtonGroup extends Jinkela {
    get template() { return `<div><meta ref="children"></div>`; }
    get styleSheet() { return ':scope > * { margin-right: 1em; }' }
  }

  return class extends FormItem {
    init() { this.title = ''; }
    createInput() {
      let submit = new Button({ text: '提交', onClick: event => this.submit() });
      let back = this.backComponent = new ButtonHollow({ text: '返回', onClick: event => this.back() });
      return new ButtonGroup({ children: [ submit, back ] });
    }
    back() {
      if (depot.module === 'editor') {
        history.back();
      } else {
        dialog.cancel();
      }
    }
    submit() {
      this.backComponent.busy = true;
      let { form, depot } = this;
      let { id, resolvedKey } = depot;
      let value = JSON.stringify(form.value);
      let $result;
      if (id) {
        $result = api([ resolvedKey, id ], { method: 'PUT', body: value });
      } else {
        $result = api(resolvedKey, { method: 'POST', body: value });
      }
      return $result.then(doAction).then(result => {
        if (window.depot.module === 'editor') {
          history.back();
        } else {
          dialog.cancel();
          window.depot.refresh();
        }
      }, error => {
        if (error) alert(error.message || error);
      }).then(() => {
        // finally
        this.backComponent.busy = false;
      });
    }
    get styleSheet() {
      return `
        :scope {
          td {
            position: relative;
            padding-top: calc(2em + 5px);
          }
        }
      `;
    }
  };

});
