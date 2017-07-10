def((Button, ButtonHollow) => {

  return class extends Jinkela {
    beforeParse(params) {
      this.submit = this.submit.bind(this);
    }
    get Button() { return Button; }
    get ButtonHollow() { return ButtonHollow; }
    get template() {
      return `
        <div>
          <jkl-button onclick="{submit}" if-not="{nosubmit}">提交</jkl-button>
          <jkl-button-hollow ref="backComponent" onclick="{back}">返回</jkl-button-hollow>
        </div>
      `;
    }
    back() {
      if (dialog.element.contains(this.element)) {
        dialog.cancel();
      } else {
        history.back();
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
      return $result.then(result => doAction(result, depot)).then(() => {
        if (window.depot.module === 'editor') {
          if (history.length > 1) {
            history.back();
          } else {
            if (opener) opener.depot.refresh();
            close();
          }
        } else {
          dialog.cancel();
          window.depot.refresh();
        }
      }, error => {
        if (error) alert(error.message || error);
      }).then(() => {
        this.backComponent.busy = false;
      });
    }
    get styleSheet() {
      return `
        :scope {
          border-top: 1px solid #e0e6ed;
          margin-top: 1em;
          padding-top: 1em;
          :first-child { margin-right: 10px; }
        }
      `;
    }
  };

});
