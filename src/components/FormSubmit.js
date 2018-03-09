def((Button, ButtonHollow, ErrorDialog) => {

  return class extends Jinkela {

    beforeParse() {
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
      let task;
      try {
        let value = JSON.stringify(form.value);
        if (id) {
          task = api([ resolvedKey, id ], { method: 'PUT', body: value });
        } else {
          task = api(resolvedKey, { method: 'POST', body: value });
        }
        task = task.then(result => doAction(result, depot)).then(() => {
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
        });
      } catch (error) {
        task = Promise.reject(error);
      }
      task.catch(error => {
        if (error) ErrorDialog.popup({ error });
      }).then(() => {
        this.backComponent.busy = false;
      });
    }

    get styleSheet() {
      return `
        :scope {
          border-top: 1px solid #e0e6ed;
          margin-top: var(--spacing);
          padding-top: var(--spacing);
          :first-child { margin-right: 10px; }
        }
      `;
    }

  };

});
