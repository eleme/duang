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
      let { beforeSubmit, afterSubmit, defaultAfterSubmit } = depot.scheme;
      return Promise.resolve().then(() => doAction(beforeSubmit, depot)).then(value => {
        if (value === false) return Promise.reject(null); // Confirm 拒绝
      }).then(() => {
        // 准备数据，调接口
        let value = JSON.stringify(form.value);
        if (id) {
          return api([ resolvedKey, id ], { method: 'PUT', body: value });
        } else {
          return api(resolvedKey, { method: 'POST', body: value });
        }
      }).then(result => doAction(afterSubmit || result || defaultAfterSubmit, depot)).then(() => {
        // 处理结果
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
      }).catch(error => {
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
